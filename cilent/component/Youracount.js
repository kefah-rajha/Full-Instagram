import { useState, useEffect } from "react";
import { getIdtoApi } from "../redux/action/profileAction";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { followDispatch, unfollowDispatch } from "../redux/action/FollowAction";
function Youracount({ user, auth }) {
  const [follower, SetFollower] = useState("");
  const [response,setResponse]=useState("")
  const dispatch = useDispatch();
  const { follow } = useSelector((state) => state);
  const router = useRouter();
  const { id } = router.query;
  console.log(auth)
  
  const { profileReducer } = useSelector((state) => state);
  useEffect(async() => {
    console.log(String(auth?.user?.following).includes(id))
   
    if(String(auth?.user?.following).includes(id)){
      SetFollower(true);

    }else{
      SetFollower(false);
 
    }

   
  }, [follow]);
  const switchFollowAndDataToAPI = async () => {
    if (follower === false) {
      try {
        const allid ={
          authID:auth?.user?._id,
          yourID:id,
      }
      console.log(auth?.user?._id)
   const url=`search/${id}/editprofile/follow`
    const res =await axios.patch(`api/${url}`,allid);
    res
    setResponse(res)
    console.log(res)

      
        if (res?.data?.success == "add") {
          SetFollower(true);
          
        }
      } catch (err) {
console.log(err)      }
    } else {
      try {
        const allid ={
          authID:auth?.user?._id,
          yourID:id,
      }
   const url=`search/${id}/editprofile/unfollow`
    const res =await axios.patch(`api/${url}`,allid);
    res
    console.log(res)
      setResponse(res)
        if (res?.data?.success == "delete") {
          SetFollower(false);
     

        }
      } catch (err) {
console.log(err) 
     }
    }
  };

  return (
    <div>
      your profile
      <h1>{user?.username}</h1>
      <img
        style={{
          height: "150px",
          width: "300px",
        }}
        src={user?.avatar}
      />
      <h5> followers {response?.data?.user?.followers?response?.data?.user?.followers?.length:user?.followers?.length}</h5>
      <h5> following {user?.following?.length}</h5>
      <button onClick={switchFollowAndDataToAPI}>
        {follower ? "unfollow" : "follow"}
      </button>
    </div>
  );
}

export default Youracount;
