import React from "react";
import Avatar from "react-avatar";

const Client = ({username}) => {
  return (
    <div className="clients">
      <Avatar name={username} size={50} round="16px" />
      <span className="userName">{username}</span>
    </div>
  );
};

export default Client;
