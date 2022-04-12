import { useState } from "react";
const auth = (state = [], action) => {

  if (action.type == "DATA_AUTH") 
  {

    return action.payload

  }

 return state;
};
export default auth;
