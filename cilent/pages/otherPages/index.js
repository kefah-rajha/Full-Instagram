import { useState,useEffect } from 'react';
import styles from '../../styles/Home.module.css'
import Header  from "../../component/Header"
import { useDispatch ,useSelector } from "react-redux";
import AddPost from '../../component/AddPost';
import { ReafreshAuth } from "../../redux/action/index";
import ALLPost from "../../component/ALLPost"

export default function Home() {
  const { authReducer} = useSelector(state => state);
console.log(authReducer)
const dispatch=useDispatch()
useEffect(async() => {
  await dispatch(ReafreshAuth());
}, []);
  return (
    <div className={styles.container}>
      <Header/>
      <AddPost user={authReducer.user}/>
      <ALLPost user={authReducer.user}/>
      
  
    </div>
  )
}
