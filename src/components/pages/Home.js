import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";

import logo from "../../img/IMDb_Logo_Square_Gold.png";

const Home = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const [searchData, setSearchData] = useState({});
  const [searchIsDone, setSearchIsDone] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [postContent, setPostContent] = useState("");

  const history = useHistory();
  const postsCollectionRef = collection(db, "posts");
  const apiKey = process.env.REACT_APP_MY_API_KEY;

  const callApi = async (theTitle) => {
    fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&t=${theTitle}&y=${year}&plot=full`,
      {
        method: "POST",
      }
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
        <h3>Search</h3>
        <label>Movie Title</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          placeholder="Title"
        />
        <input
          type="text"
          onChange={(e) => setYear(e.target.value)}
          className="input"
          placeholder="Year"
        />
        <button
          className="pr__btn"
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
            <h4>{searchData.Genre}</h4>
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
              className="pr__btn"
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
