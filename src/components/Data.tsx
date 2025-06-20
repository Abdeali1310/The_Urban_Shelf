/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const Data = () => {
  const [user, setUser] = useState<any>({});

  const fetchData = () => {
    fetch("https://randomuser.me/api/?results=1")
      .then((res) => res.json())
      .then((data) => setUser(data.results[0]));

      
  };
  console.log(user);

  useEffect(() => {
    fetchData();
  }, []);

  return Object.keys(user).length > 0 ? (
    <div>
      <h1>Customer data</h1>
      <h4>Name : {user.name.title} { user.name.first} {user.name.last}</h4>
      <img src={user.picture.medium} alt="" />
    </div>
  ) : (
    <h1>Data pending...</h1>
  );
};

export default Data;
