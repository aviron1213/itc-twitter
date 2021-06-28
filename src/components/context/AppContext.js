import React from "react";

const AppContext = React.createContext({
    tweets:"",
    setTweet:"",
    userNameInput:"", 
    setUserName:"",
    tweetInputText:"", 
    setTweetInputText:"",
    
});

export default AppContext;