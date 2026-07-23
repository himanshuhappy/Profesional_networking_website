import React, { useContext, useState } from 'react'
import logo2 from "../assets/logo2.png"
import { IoSearchSharp } from "react-icons/io5"; //you can get lot of icons in react icons
import { TiHome } from "react-icons/ti";
import { FaUserGroup } from "react-icons/fa6";
import { IoNotificationsSharp } from "react-icons/io5";
import { userDataContext } from '../context/UserContext'
import dp from "../assets/dp.webp"
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
function Nav() {
    let [activeSearch,setActiveSearch]=useState(false)
    let {userData,setUserData}=useContext(userDataContext)
    let {serverUrl}=useContext(authDataContext)
    let [showPopup, setShowPopup]=useState(false)
    let navigate=useNavigate()
    const hadleSignOut=async ()=>{
      try {
        let result=await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true})
        setUserData(null)
        console.log(result)
        Navigate("/login")
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='w-full h-[80px] bg-[white] fixed top-0 shadow-lg flex md:justify-around item-center px-[10px] '>
        <div className='flex justify-center items-center gap-[10px] '>
      <div onClick={()=>{setActiveSearch(false)
        navigate("/")}}>
        <img src={logo2}alt="" className="w-[50px]"/>
      </div>
      {!activeSearch && <div><IoSearchSharp className='w-[23px] h-[23px] text-gray-600 lg:hidden' onClick={()=>{setActiveSearch(true)}} /></div>} {/*clicking the icon active search becomes true and it only shows when active search is false*/}
      <form className={`w-[190px] lg:w-[350px] h-[40px] bg-[#f0efe7] lg:flex items-center gap-[10px] px-[10px] py-[5px] rounded-md ${!activeSearch?"hidden":"flex"}`}> {/*to write js we have to add curly braces and `` in class*/}
        <div><IoSearchSharp className='w-[23px] h-[23px] text-gray-600' /></div>
        <input type="text" className='w-[80%] h-full bg-transparent outline-none  border-0' placeholder='search users...'/>
      </form>
      </div>

      {showPopup && <div className='w-[300px] min-h-[300px] bg-white shadow-lg absolute top-[75px] rounded-lg flex flex-col items-center p-[20px] gap-[20px] right-[20px] lg:right-[100px]'> {/*pop up div */}
        <div className='w-[70px] h-[70px] rounded-full overflow-hidden'>
            <img src={userData.profileImage || dp} alt="" className='w-full h-full'/>
        </div>
        <div className='text-[19px] font-semibold text-gray-700'>{`${userData.firstName} ${userData.lastName}`}</div>
         <button className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]' onClick={()=>navigate("/profile")}>View Profile</button>
         <div className='w-full h-[1px] bg-gray-700 '></div>
         <div className='w-full h-[1px] bg-gray-700 '></div>
        <div className='flex  w-full items-center justify-start text-gray-600 gap-[10px] ' onClick={()=>navigate("/network")}>
          <FaUserGroup className='w-[23px] h-[23px] text-gray-600 '/>
          <div>My Networks</div>
        </div>
        <button className='w-[100%] h-[40px] rounded-full border-2 border-[#ec4545] text-[#ec4545]' onClick={hadleSignOut}>Sign Out</button>
      </div>
      } {/*we will only see this div when show pop is true */}


      <div className='flex justify-center items-center gap-[20px]'>
        <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden'>
            <TiHome className='w-[23px] h-[23px] text-gray-600'/>
            <div>Home</div>
        </div>
        <div className='md:flex flex-col items-center justify-center text-gray-600 hidden' onClick={()=>navigate("/network")}>
            <FaUserGroup className='w-[23px] h-[23px] text-gray-600'/>
            <div>My Network</div>
        </div>
        <div className='sm:flex flex-col items-center justify-center text-gray-600 hidden'>
            <IoNotificationsSharp className='w-[23px] h-[23px] text-gray-600'/>
            <div>Notifications</div>
        </div>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer' onClick={()=>setShowPopup(prev=>!prev)} > {/* it true then false if false then true */}
            <img src={userData.profileImage || dp} alt="" className='w-full h-full'/>
        </div>
      </div>
    </div>

  )
}

export default Nav
