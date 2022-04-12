import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getIdtoApi } from "../redux/action/profileAction";
import Myacount from "../component/Myacount";
import Youracount from "../component/Youracount";
import { ReafreshAuth } from "../redux/action/index";
import PostAccount from "../component/PostAccount"

function Userprofile() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { profileReducer } = useSelector((state) => state);
  const { authReducer } = useSelector((state) => state);
  const { follow } = useSelector((state) => state);


  useEffect(async() => {
    await dispatch(getIdtoApi(id));
    await dispatch(ReafreshAuth());
  }, [id]);
  return (
    <div>
      {profileReducer?._id != authReducer?.user?._id ? (
        <Youracount user={profileReducer} auth={authReducer}/>
      ) : (
        <Myacount user={profileReducer} />
      )}
      <div>
        <PostAccount id={id}/>
      </div>
    </div>
  );
}
export default Userprofile;
