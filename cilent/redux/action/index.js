import {apiPost,getDataToApi} from "../../pages/api/apiTools"
export const dispatchDataLogin= (data)=>async(dispatsh)=>{
    try{
        const res =await apiPost("login",data);
        dispatsh({
            type:"DATA_AUTH",
            payload: {
                token: res.user,
                user: res.token
            } 
        })
        localStorage.setItem("firstEnter",true)

    }catch(error){

    }

}
export const ReafreshAuth= ()=>async(dispatsh)=>{
    const firstEnter=localStorage.getItem("firstEnter");

    if(firstEnter){
        try{
        const res =await getDataToApi("authorization");
            dispatsh({
                type:"DATA_AUTH",
                payload: {
                    user: res.user,
                    token: res.token
                } 
            })
            
    
        }catch(error){
            console.log(error);

    
        }

    }

   

}
export const dispatchDataResgester= (data)=>async(dispatsh)=>{
    try{
        const res =await apiPost("regester",data);

        dispatsh({
            type:"DATA_AUTH",
            payload: {
                token: res.user,
                user: res.token,
            } 
        })
    }catch(error){

    }

}