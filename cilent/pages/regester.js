import { useState,useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { dispatchDataResgester } from "../redux/action/index";
import { useRouter } from 'next/router'


function regester() {
  const dispatch = useDispatch();
  // fullname, username, gander, password, email
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gander, setGander] = useState("");
  const [fullname, setFullname] = useState("");
  const { authReducer} = useSelector(state => state);
  console.log(authReducer)

  const router = useRouter()
  useEffect(()=>{
    if(authReducer.token){
      router.push("/otherPages")

    }
  },[authReducer.token])

  const data = {
    fullname,
    username,
    gander,
    password,
    email,
  };

  const sendDataToAction = (e) => {
    e.preventDefault();
    dispatch(dispatchDataResgester(data))
  };
  return (
    <div>
      <from>
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEamil(e.target.value);
          }}
        />
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          value={gander}
          placeholder="gander"
          onChange={(e) => {
            setGander(e.target.value);
          }}
        />
        <input
          type="text"
          value={fullname}
          placeholder="fullname"
          onChange={(e) => {
            setFullname(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
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

export default regester;
