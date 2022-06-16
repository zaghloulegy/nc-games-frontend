import React from 'react'

const User = ({ user, setUser }) => {
  return (
    <div className="user">
      <img src={user.avatar_url} alt="" />
      <p>Username: {user.username}</p>
      <p>Name: {user.name}</p>

      <button onClick={() => setUser(null)}>LOG OUT</button>
    </div>
  );
};

export default User