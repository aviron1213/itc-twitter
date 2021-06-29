import React, { useContext, useState, useEffect } from "react";
import AppContext from "./context/AppContext";
import { Redirect } from "react-router-dom";

const User = () => {
  const [userNameInput, setUserNameInput] = useState("");
  const [redirect, setRedirect] = useState(false);
  const appContext = useContext(AppContext);

  const handleUserNameInput = (e) => {
    setUserNameInput(e.target.value);
  };
  const onSubmitUserName = (e) => {
    e.preventDefault();
    appContext.setUserName(userNameInput);
    setRedirect(true);
  };

  useEffect(() => {
    localStorage.setItem("userName", JSON.stringify(appContext.userName));
  }, [appContext.userName]);

  return (
    <div className="login-wrapper">
      <div className="login-items">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <input
          type="text"
          onChange={handleUserNameInput}
          value={userNameInput}
          className="userNameInput"
        />
        <div className="button-wrapper">
          <button
            onClick={onSubmitUserName}
            type="submit"
            className={"username-button"}
          >
            submit
          </button>
        </div>
        {redirect && <Redirect to="/home" />}
      </div>
    </div>
  );
};
export default User;
