import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

function Search() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const postDataToApi = async (e) => {
    e.preventDefault();
    const userSerach = e.target.value;
    setSearch(userSerach);
    console.log(userSerach);
    const res = await axios.post("api/search", {
      username: userSerach,
    });
    console.log(res.data.users);
    setUser(res.data.users);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={postDataToApi}
      />
      {user.length > 0
        ? user.map((item) => {
            return (
              <div key={item._id}>
                <Link href={`/${item._id}`}>{item.username}</Link>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Search;
