import React from "react";
import Link from "next/link";
import Search from "./Search"
function Header() {
  return (
    <div 
    style={{
        background:"#000",
        color:"white"
            }}>
      <ul style={{
          display:"flex",
          justifyContent: "space-between",
          alignItems:"center",   
               width:"50%",
               padding:"20px",
               listStyleType:"none"

          

      }}>
        <Search/>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>Message</a>
          </Link>
        </li>
        <li>
          <Link href="/blog/hello-world">
            <a>Discover</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
