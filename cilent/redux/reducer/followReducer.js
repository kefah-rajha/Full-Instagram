const follow =(state=[],action)=>{
    if(action.type==="FOLLOW_UNFOLLOW"){
        return action.payload
    }
    return state

}
export default follow