import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


function EditProfile({user}) {
    const router=useRouter()
    const { id } = router.query;

  const [email, setEamil] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);
  const [input,setInput]=useState("")
  const [fullname, setFullname] = useState(user.fullname);
  const avatarToUpload=(e)=>{
      const file= e.target.files[0];
      previewFile(file)

  }
  const previewFile =(file)=>{
      console.log(file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setAvatar(reader.result)

      }

  }
  const data = {
    fullname,
    username,
    avatar,
    password,
    email,
    id
  };
  useEffect(()=>{

  },[user])
  

  const EditProfileToAPI=async(e)=>{
      e.preventDefault()
      if(fullname){
          const resposne= await axios.patch(`/api/search/${id}/editprofile`,{
            data
          })
          console.log(resposne);
          if(resposne){
            window.location.reload(false)
          }
      }

  }
  return <div>
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
          type="file"
          value={input}
          placeholder="Your Avatar"
          onChange={avatarToUpload}
        />
        <img src={avatar} style={{height:"200px", width:"200px"}}/>
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
        <button type="submit" onClick={EditProfileToAPI}>
          submit
        </button>
      </from>
  </div>;
}

export default EditProfile;
