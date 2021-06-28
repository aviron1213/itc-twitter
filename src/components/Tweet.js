import React, {useContext} from "react";
import AppContext from "./context/AppContext";

const Tweet = ({ content, userName, date, tweet }) => {
  const appContext = useContext(AppContext);
  const deleteHandler = () => {
    console.log(tweet);
    appContext.setTweet(appContext.tweets.filter((el) => el.id !== tweet.id));
  };

  return (
    <div className="tweet">
      <li className="tweet-item">
        <div className="user-info">
          <div>{userName}</div>
          <div>{date}</div>
        </div>
        <div>{content} </div>
      </li>

      {/* <button onClick={deleteHandler} className="delete-btn">
        X
      </button> */}
    </div>
  );
};

export default Tweet;
