import React, { useContext , useState, useRef } from 'react'
import Nav from '../components/Nav'
import dp from "../assets/dp.webp"
import { FiPlus } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { HiPencil } from "react-icons/hi2";
import { userDataContext } from '../context/UserContext';
import EditProfile from '../components/EditProfile';
import { RxCross1 } from "react-icons/rx";
import { BsImage } from "react-icons/bs";
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import Post from '../components/Post';


function Home() {
  let {userData,setUserData,edit,setEdit,postData,setPostData}=useContext(userDataContext)
  let {serverUrl}=useContext(authDataContext)
  let [frontendImage,setFrontendImage]=useState("")
  let [backendImage,setBackendImage]=useState("")
  let [description,setDescription]=useState("")
  let [uploadPost,setUploadPost]=useState(false)
  let image=useRef()
  let [posting,setPosting]=useState(false)

  //setting frontend and backend image
  function handleImage(e){
    let file=e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  //handle post button
  async function handleUploadPost(){
    setPosting(true)
    try{
      let formdata=new FormData() //special package to send text+file

      formdata.append("description",description)
      if(backendImage){
        formdata.append("image",backendImage)
      }
      let result=await axios.post(serverUrl+"/api/post/create",formdata,{withCredentials:true})
      console.log(result)
      setPosting(false)
      setUploadPost(false)
    }catch(error){
      setPosting(false)
      console.log(error);
    }
  }
  return (
    <div className='w-full min-h-[100vh] bg-[#f0efe7] pt-[100px] flex items-center lg:items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row relative pb-[50px]'>
      {edit && <EditProfile/>} {/* when edit true then only it will call EditProfile */}
      <Nav/>
      {/* right side of home */}
      <div className='w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg rounded-lg p-[10px] relative pb-[50px]'>
        {/* background image */}
        <div className='w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center relative cursor-pointer' onClick={()=>{setEdit(true)}}> {/* here we say relative means now inside anything to this will be relative to it */}
        <img src={userData.coverImage || ""} alt="" className='w-full'/>
          {/* adding camera symbol */}
          <FiCamera className='absolute right-[20px] top-[20px] w-[25px] h-[25px] text-white cursor-pointer'/>
        </div>
        {/* profile image */}
        <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center absolute top-[65px] left-[35px] cursor-pointer' onClick={()=>{setEdit(true)}}>
            <img src={userData.profileImage || dp} alt="" className='h-full'/>
        </div>
        {/* adding plus sign */}
        <div className='w-[20px] h-[20px] bg-[#17c1ff] absolute top-[105px] left-[90px] rounded-full flex justify-center items-center cursor-pointer'> {/* in abs Positioned relative to the nearest positioned parent
                                                                                                                                                            in relative move in relative to its own position */}
            <FiPlus className='text-white'/>
        </div>
        {/* adding data from global variable userdata */}
        <div className='mt-[30px] pl-[20px]  font-semibold text-gray-700'>
          {/* adding name */}
          <div className='text-[22px]'>{`${userData.firstName} ${userData.lastName}`}</div>
          {/* adding headlines */}
          <div className='text-[18px] font-semibold text-gray-600'>{`${userData.headline || ""}`}</div>
          {/* adding location */}
          <div className='text-[16px] text-gray-500'>{`${userData.location}`}</div>
        </div>
        {/* edit button */}
        <button className='w-[100%] h-[40px] my-[20px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center gap-[10px]' onClick={()=>{setEdit(true)}}>Edit Profile <HiPencil /></button>

      </div>


      {/* making div to for pop out comment */}
      {/* make whole skreen gray */}
      {uploadPost && <div className='w-full h-full bg-black fixed top-0 z-[100] left-0 opacity-[0.6]'></div>}
        {/* pop up div */}
      {uploadPost && <div className='w-[90%] max-w-[500px] h-[550px] bg-white shadow-lg rounded-lg absolute z-[200] p-[20px] flex items-start justify-start flex-col gap-[20px] '>
        {/* cross button */}
          <div className='absolute top-[20px] right-[20px] cursor-pointer  ' onClick={()=>setUploadPost(false)}><RxCross1 className='w-[25px] cursor-pointer h-[25px] text-gray-800 font-bold '/></div>
        {/* getting profile photo and name */}
        <div className='flex justify-start items-center gap-[10px]'>
         <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
            <img src={userData.profileImage || dp} alt="" className='h-full'/>
        </div>
        <div className='text-[22px]'>{`${userData.firstName} ${userData.lastName}`}</div>
        </div>
        {/* adding discription */}
        <textarea className={`w-full outline-none border-none p-[10px] resize-none text-[19px]`} placeholder='what do you want to talk about..?' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        {/* giving image input which is hidden and called */}
        <input type='file' ref={image} hidden onChange={handleImage}/>
        {/* div for image */}
        <div className='w-full h-[300px] overflow-hidden flex justify-center items-center rounded-lg' >
            <img src={frontendImage || ""} alt="" className='h-full rounded-lg'/>
        </div>
        {/* adding camera logo and line */}
        <div className='w-full h-[200px] flex flex-col'>
        <div className='p-[20px] flex items-center justify-start border-b-2 border-gray-500'>
        <BsImage className='w-[24px] h-[24px] text-gray-500 cursor-pointer' onClick={()=>image.current.click()}/>
        </div>
        {/* post button */}
        {/* When posting is true → button is disabled 
          When posting is false → button is enabled  */}
        <div className='flex justify-end items-center' >
          <button className='w-[100px] h-[50px] rounded-full bg-[#24b2ff] mt-[40px] text-white' disabled={posting} onClick={handleUploadPost}>{posting?"posting...":"Post"}</button>
        </div>
        </div>
      </div>}


      {/* making center div */}
      <div className='w-full lg:w-[50%] min-h-[200px] bg-bg-[#f0efe7] flex flex-col gap-[20px]'>
          <div className='w-full h-[120px] bg-white shadow-lg rounded-lg flex items-center p-[20px]  justify-center gap-[10px]'>
            {/* adding image */}
            <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center  cursor-pointer' >
            <img src={userData.profileImage || dp} alt="" className='h-full'/>
            </div>
            {/* making comment button */}
            <button className='w-[80%] h-[60px] border-2 rounded-full border-gray-500 flex items-center justify-start px-[20px] hover:bg-gray-200' onClick={()=>setUploadPost(true)}>start a post</button>
          </div>
          {/* loop thorough the post */}
          {postData.map((post,index)=>(
            <Post key={index} id={post._id} description={post.description} author={post.author} image={post.image} like={post.like} comment={post.comment} createdAt={post.createdAt}/>
          ))}
      </div>
      <div className='w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg rounded-lg p-[10px]'>

      </div>
    </div>
  )
}

export default Home