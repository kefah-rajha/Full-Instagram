import { useState,useEffect } from "react";
import { useDispatch ,useSelector } from "react-redux";
import {dispatchDataLogin} from"../redux/action/index"
import { useRouter } from 'next/router'

function login() {
 
  const dispatch = useDispatch();
  const { authReducer} = useSelector(state => state);


  const router = useRouter()
  useEffect(()=>{
    if(authReducer.token){
      router.push("/otherPages")

    }
  },[authReducer.token])
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const data = {
    password,
    email,
  };
  
  const sendDataToAction = (e) => {
    e.preventDefault();
    dispatch(dispatchDataLogin(data,authReducer.token))

  };
  return (
    <div>
      <from>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEamil(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" onClick={sendDataToAction}>
          submit
        </button>
      </from>
    </div>
  );
}


export default login;
