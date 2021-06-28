import Tweet from "./Tweet";
import React, {useContext} from "react";
import AppContext from "./context/AppContext";
const TweetList = () => {
  const appContext = useContext(AppContext);
  return (
    //added tweets.sort to sort by date.
    <div className="tweet-container">
      <ul className="tweet-list">
        {appContext.tweets
          .sort((a, b) => b.id - a.id)
          // .filter((tweet) => tweet.userName == "steve")
          .map((tweet) => (
            <Tweet
              setTweet={appContext.setTweet}
              tweets={appContext.tweets}
              key={tweet.id}
              content={tweet.content}
              userName={tweet.userName}
              date={tweet.date}
              tweet={tweet}
            />
          ))}
      </ul>
    </div>
  );
};
export default TweetList;
