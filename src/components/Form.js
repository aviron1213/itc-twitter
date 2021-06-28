import React, { useState, useEffect, useContext } from "react";
import AppContext from "./context/AppContext";
import Loader from "./Loader"

const Form = ({
 
}) => {
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [wordy, setWordy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const appContext = useContext(AppContext);
  

  const handleTweetInputText = (e) => {
    appContext.setTweetInputText(e.target.value);
  };
 
  // enables submit button once atlease on character is in the textbox
  useEffect(() => {
    if (appContext.tweetInputText.length >= 1) {
      setIsDisabled(false);
      setWordy(false);
    } else {
      setIsDisabled(true);
    }
  }, [appContext.tweetInputText]);
  //disables submit button and displays "wordy" warning
  useEffect(() => {
    if (appContext.tweetInputText.length > 140) {
      setIsDisabled(true);
      setWordy(true);
    }
  }, [appContext.tweetInputText]);

  // this sets the counter whenever the handleTweetInputText is triggered it counts the length of the tweet
  useEffect(() => {
    setCount(appContext.tweetInputText.length);
  }, [handleTweetInputText]);

  const onTweetSubmitHandler = (e) => {
    setIsLoading(true);
    console.log(isLoading);
    e.preventDefault();

    const tweetPost = {
      content: appContext.tweetInputText,
      id: Date.now(),
      userName: appContext.userName,
      date: new Date(Date.now()).toISOString(),
    };
    fetch(
      "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tweetPost),
      }
      
    );
    setTimeout(() => {
      appContext.setTweet((prevState) => {
        return [tweetPost, ...prevState];
      });
    }, [2000]);

    setTimeout(() => {
      setIsLoading(false);
    }, [2000]);

    appContext.setTweetInputText("");
  };

  useEffect(() => {
    setIsLoading(false);
  }, [appContext.Tweets]);



  return (
    <form className="tweet-imput-area">
      {/* should change this to have a div so the button is in the same div as the text area then the this will become the parent  */}
      <textarea
        value={appContext.tweetInputText}
        onChange={handleTweetInputText}
        type="textarea"
        className="tweet-imput"
        rows="5"
        cols="10"
        
      ></textarea>
      <div className="button-counter">
        {/*this is how I changed the styles of the submit button and counter*/}
        <div className={`counter counter-${wordy}`}>{count}/140</div>
        <div className={`counter-${wordy}`}>Exceeded Limit</div>
        {isLoading&&<Loader/>
        }
         {!isLoading && (
          <button
            onClick={onTweetSubmitHandler}
            type="submit"
            className={`submit-button submit-button-${isDisabled}`}
            disabled={isDisabled}
          >
            submit
          </button>
        )}
      </div>
    </form>
  );
};
export default Form;
