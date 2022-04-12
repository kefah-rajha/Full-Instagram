import {dataToPatchAPI}from "../../pages/api/apiTools"
export const followDispatch=(authID,yourID)=>async(dispatch)=>{
    const id ={
        authID,
        yourID,
    }
    const resFollowers=await dataToPatchAPI(id ,`/search/${yourID}/editprofile/follow`)
    dispatch({
        type:"FOLLOW_UNFOLLOW",
        payload:resFollowers
    })

}
export const unfollowDispatch=(authID,yourID)=>async(dispatch)=>{
    const id ={
        authID,
        yourID,
    }
    const resFollowers=await dataToPatchAPI(id ,`/search/${yourID}/editprofile/unfollow`)
    dispatch({
        type:"FOLLOW_UNFOLLOW",
        payload:resFollowers
    })

}