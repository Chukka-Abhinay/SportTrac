import React from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { username } = useParams();

  return (
    <div className="text-white text-center mt-10">
      <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
      {/* Add user dashboard or profile content here */}
    </div>
  );
};

export default UserPage;
