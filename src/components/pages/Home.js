import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";

import logo from "../../img/IMDb_Logo_Square_Gold.png";

const Home = () => {
  const [title, setTitle] = useState("");
  const [searchData, setSearchData] = useState({});
  const [searchIsDone, setSearchIsDone] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [postContent, setPostContent] = useState([]);

  const history = useHistory();
  const postsCollectionRef = collection(db, "posts");
  const apiKey = process.env.REACT_APP_MY_API_KEY;

  const callApi = async (theTitle) => {
    try {
      await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${theTitle}&plot=full`
      )
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setSearchData(data);
          if (data.Response === "True") {
            setSearchIsDone(true);
          } else {
            setSearchIsDone(false);
            alert("can't search this ...");
          }
        })
        .catch((ex) => {
          if (ex) setSearchIsDone(false);
          console.log(ex);
        });
    } catch (ex) {
      console.log(`Error: ${ex.Error}`);
    }
  };

  const handleSearch = () => {
    callApi(title.toLocaleLowerCase().replace(/[ ]/gi, "+"));
  };

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      user_id: user.uid,
      made_by: { user_email: user.email, user_name: user.displayName },
      movie_data: searchData,
      post_content: {
        content: postContent,
      },
      timestamp: serverTimestamp(),
    });
    history.push("/posts");
  };

  const imgClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="container">
      <div className="search__container">
        <p>{user?.email}</p>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <button
          className="primary__btn"
          onClick={() => {
            handleSearch();
          }}
        >
          search
        </button>
        {searchIsDone ? (
          <div className="movie__container">
            <h2>{searchData.Title}</h2>
            <img
              src={searchData.Poster}
              alt={searchData.Title}
              onClick={() => imgClick(searchData.Poster)}
            />
            <h3>{searchData.Genre}</h3>
            <div className="imdb__container">
              <img src={logo} alt="" className="imdb_logo" />
              <h2 className="imdbRating"> {searchData.imdbRating}</h2>
            </div>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Post content"
              onChange={(event) => {
                setPostContent(event.target.value);
              }}
            />
            <button
              className="primary__btn"
              onClick={() => {
                createPost();
              }}
            >
              Make Post
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
