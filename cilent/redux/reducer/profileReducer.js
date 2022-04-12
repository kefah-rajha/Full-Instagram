const initialtion=[]
const profileReducer=(state=initialtion,action)=>{
    if(action.type == "PROFILE_DATA"){

        return action.payload

    }
    return state

}
export default profileReducer;