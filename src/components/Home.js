import React, { useContext,useEffect} from "react";
import Form from "./Form";
import TweetList from "./TweetList";
import "../App.css";

import AppContext from "./context/AppContext";

function Home() {  
  const appContext = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem("userName", JSON.stringify(appContext.userName));
  }, [appContext.userName]);

  return (
    <div className="page-wrapper">

      <div className="welcome-user-name">{`Welcome ${appContext.userName}`}</div>

      {appContext.tweets && (
        <Form
        />
      )}
      {appContext.tweets && <TweetList  />}
    </div>
  );
}
export default Home;
