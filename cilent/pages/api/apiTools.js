import axios from "axios";
axios.defaults.withCredentials = true;

/*
export const getDataToApi=async (url )=>{
    
    const res =await axios.get(`api/${url}`, { headers: { 'Content-Type': 'application/json' },
    withCredentials: false}
    )
    console.log(res.headers)
    return res
}*/
export const apiPost = async (url, post) => {
  const res = await fetch(`/api/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    credential: true,
    body: JSON.stringify(post),
  });
  const final = await res.json();
  return final;
};
export const getDataToApi = async (url) => {
  const res = await fetch(`/api/${url}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },

    credential: true,
  });
  const final = await res.json();

  return final;
};

/*

export const apiPost=async (url,post)=>{
    const res =await axios.post(`api/${url}`,post,
    { headers: { 'Content-Type': 'application/json' },
    withCredentials: false}
    );
    return res

}
*/
export const dataToPatchAPI=async(id,url)=>{
  try{
    const res =await axios.patch(`api/${url}`,{id});
  return res
  }catch(error){
    console.log(error)

  }
  

}