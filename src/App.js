import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import User from "./components/User";
import AppContext from "./components/context/AppContext";

function App() {

const [tweetInputText, setTweetInputText] = useState("");

const [userName, setUserName] = useState(() => {
  const localData = localStorage.getItem("userName");
  return localData ? JSON.parse(localData) : "";});
  
const [tweets, setTweet] = useState(() => {
    fetch(
      "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setTweet(data.tweets);
      });
  });

  useEffect(() => {
    const interval = setInterval(() => { 
      fetch(
      "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setTweet(data.tweets);
      });

    }, 120000);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
    <Router>
      <div className="navbar-wrapper">
        <div className="navbar">
          <Link className="navbar-item" to="/">Home</Link>
          <Link className="navbar-item" to="/profile">Login</Link>
        </div>
      </div>
      <AppContext.Provider
        value={{userName:userName,
          setUserName: setUserName,
          tweetInputText:tweetInputText,
          setTweetInputText:setTweetInputText,
          tweets:tweets,
          setTweet:setTweet,
        }}
      >     
        
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/profile/" component={User} />
    </Switch>
    </AppContext.Provider>
    </Router>
    </>
  );
}

export default App;
