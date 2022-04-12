import { useState } from "react"

import EditProfile from "./EditProfile"
function Myacount({user}) {
    const [openEdit,setOpenEdit]=useState()
    return (

    <div>
        my profile
        <h1>{user.username}</h1>
        <img style={{
            height:"50px",
            width:"50px",
            borderRadius:"50%",
            border:"1px solid black"
            ,backgroundImage:"cover"
        }} src={user.avatar}/>
        <h5> followers {user?.followers?.length}</h5>
        <h5> following {user?.following?.length}</h5>
        <button>edit profile</button>
        <EditProfile user={user}/>
    </div>
  )
}

export default Myacount