import React, { createContext, useEffect, useState ,useContext} from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
export const userDataContext=createContext() //create global data storage
function UserContext({children}) {
    let [userData,setUserData]=useState(null)
    let {serverUrl}=useContext(authDataContext) //from global variable
    let [edit,setEdit]=useState(false)
    let [postData,setPostData]=useState([])
    let [profileData, setProfileData] = useState(null)

const handleGetProfile = async (userName) => {
    try {
        let result = await axios.get(serverUrl + `/api/user/profile/${userName}`, {withCredentials: true})
        setProfileData(result.data)
    } catch (error) {
        console.log(error)
    }
}
    const getCurrentUser=async ()=>{
        try {
            let result = await axios.get(serverUrl+"/api/user/currentuser",{withCredentials:true})
            console.log(result);
            setUserData(result.data)
             return
        } catch (error) {
            console.log(error);
            setUserData(null)
        }
    }
    //get post from backend
    const getPost=async()=>{
      //get data from specific backend url
      try{
        let result= await axios.get(serverUrl+"/api/post/getpost",{ 
          withCredentials:true //for security
        })
        console.log(result)
        setPostData(result.data)
      }catch(error){
        console.log(error)
      }
    }
    useEffect(()=>{
        getCurrentUser()
        getPost()
    },[])
    const value = {
    userData, setUserData, edit, setEdit, postData, setPostData, getPost,
    profileData, setProfileData, handleGetProfile  // 👈 add these
} //this value will be given to all its childre
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext

// This component:

// Fetches the logged-in user from backend
// Stores it in state
// Shares it globally using Context