import {getDataToApi} from "../../pages/api/apiTools"
export const getIdtoApi=(id)=>async(dispatch)=>{

 if(id !=undefined){
    const res=await getDataToApi (`search/${id}`)

    dispatch({
        type:"PROFILE_DATA",
        payload:res.user
    }
    )

 }
   
    

}