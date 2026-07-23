import React,{useContext , useRef, useState} from 'react'
import { RxCross1 } from "react-icons/rx";
import { userDataContext } from '../context/UserContext';
import { FiPlus } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import dp from "../assets/dp.webp"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext';


function EditProfile() {
   let { edit, setEdit, userData, setUserData} = useContext(userDataContext)
    //defining serverUrl
   let {serverUrl}=useContext(authDataContext)
    //define all input data
    let [firstName, setFirstName]=useState(userData.firstName || "")
    let [lastName, setLasttName]=useState(userData.lastName || "")
  let [userName,setUserName]=useState(userData.userName || "")
  let [headline,setHeadline]=useState(userData.headline || "")
  let [location,setLocation]=useState(userData.location || "")
  let [gender,setGender]=useState(userData.gender || "")
  let [skills,setSkills]=useState(userData.skills || [])
  let [newSkills,setNewSkills]=useState("")
  let [education,setEducation]=useState(userData.education || [])
  let [newEducation,setNewEducation]=useState({
    college:"",
    degree:"",
    fieldOfStudy:""
 })
  let [experience,setExperience]=useState(userData.experience || [])
  let [newExperience,setNewExperience]=useState( {
    title:"",
    company:"",
    description:""
})
let [frontendProfileImage,setFrontendProfileImage]=useState(userData.profileImage || dp)
let [backendProfileImage,setBackendProfileImage]=useState(null)
let [frontendCoverImage,setFrontendCoverImage]=useState(userData.coverImage || null)
let [backendCoverImage,setBackendCoverImage]=useState(null)
let [saving,setSaving]=useState(false)
    
//adding profile and cover image useref->gives object
    const profileImage=useRef()
    const coverImage=useRef()

  //add skills function
  function addSkill(e){
    e.preventDefault() // prevent refreshing window on calling 
    if(newSkills && !skills.includes(newSkills)){ {/* when new skill present and not in skills already */}
        setSkills([...skills,newSkills])
    }
    //make new skill empty
    setNewSkills("")
  }
  //removing skills
  function removeSkill(skill){
    setSkills(skills.filter((s)=>s!==skill)) //skills element should not equal to skill
  }
  //add education
  function addEducation(e){
    e.preventDefault()
    if(newEducation.college && newEducation.degree && newEducation.fieldOfStudy){
        setEducation([...education,newEducation])
    }
    setNewEducation({
        college:"",
        degree:"",
        fieldOfStudy:""
    })
  }
  //remove education
  function removeEducation(edu){

      if(education.includes(edu)){
        setEducation(education.filter((e)=>e!==edu))
      }
      
    }
   //add experience
   function addExperience(e){
    e.preventDefault()
    if(newExperience.title && newExperience.company && newExperience.description ){
    setExperience([...experience,newExperience])
    }
    setNewExperience({
    title:"",
    company:"",
    description:""

    })
    }

    //removing experience
    function removeExperience(exp){

      if(experience.includes(exp)){
        setExperience(experience.filter((e)=>e!==exp))
      }
      
    }
    //handling profile image
    function handleProfileImage(e){
        //file 
        let file=e.target.files[0]
        setBackendProfileImage(file)
        //get url for frontend
        setFrontendProfileImage(URL.createObjectURL(file)) //createObjectURL inbuild js method
    }
    //handling cover image
    function handleCoverImage(e){
      let file=e.target.files[0]
      setBackendCoverImage(file)
      setFrontendCoverImage(URL.createObjectURL(file))
     }

    //sending data to backend->routes
    const handleSaveProfile=async ()=>{
      setSaving(true)
        try {
            //store data in formdata
            let formdata= new FormData()
            formdata.append("firstName",firstName)
            formdata.append("lastName",lastName)
            formdata.append("userName",userName)
            formdata.append("headline",headline)
            formdata.append("location",location)
            formdata.append("skills",JSON.stringify(skills)) //send sills in strigs as it is a array
            formdata.append("education",JSON.stringify(education))
            formdata.append("experience",JSON.stringify(experience))

            //store backendimage in formdata
            if(backendProfileImage){
                formdata.append("profileImage",backendProfileImage)
            }
            if(backendCoverImage){
                formdata.append("coverImage",backendCoverImage)
            }

            //sending formdata to backend with axios
            let result=await axios.put(serverUrl+"/api/user/updateprofile",formdata,{withCredentials:true})
            setUserData(result.data)
            setSaving(false)
            setEdit(false) // edit box dissapears 

        } catch (error) {
            console.log(error);
            setSaving(false)
        }
    }

  return (
    <div className='w-full h-[100vh] fixed top-0  z-[100] flex justify-center items-center '>

      {/* taking image as input */}
      <input type="file" accept='image/*' hidden ref={profileImage} onChange={handleProfileImage}/> {/* it is hidden */}
      <input type="file" accept='image/*' hidden ref={coverImage} onChange={handleCoverImage}/>  
      {/*make everything black with high priority(z factor) */}
      <div className='w-full h-full bg-black opacity-[0.5] absolute top-0 left-0'></div>
      {/* make edit box with highest priority(z factor) 
      w-[90%] 90 percent of parent container*/}
      <div className='w-[90%] max-w-[500px] h-[600px] bg-white relative overflow-auto z-[200] shadow-lg rounded-lg p-[10px]'>{/* overflow-auto->If content fits → no scrollbars */}
        {/* adding cross on edit box */}
        <div className='absolute top-[20px] right-[20px]' onClick={()=>{setEdit(false)}}>
            <RxCross1 className='w-[25px] cursor-pointer h-[25px] text-gray-800 font-bold ' />
        </div>
        {/* adding cover image div */}
        <div className='w-full h-[150px] bg-gray-500 rounded-lg mt-[40px] overflow-hidden cursor-pointer' onClick={()=>coverImage.current.click()}> {/* on clicking cover image we open file */}
            <img src={frontendCoverImage} alt="" className='w-full' />
            {/* adding camera */}
            <FiCamera className='absolute right-[20px] top-[60px] w-[25px] h-[25px] text-white cursor-pointer' />
        </div>
        {/* adding a profile image */}
        <div className='w-[80px] h-[80px] rounded-full overflow-hidden absolute top-[150px] ml-[20px] cursor-pointer' onClick={()=>profileImage.current.click()}>
            <img src={frontendProfileImage} alt="" className='w-full h-full' />
        </div>
        {/* adding plus sighn */}
        <div className='w-[20px] h-[20px] bg-[#17c1ff] absolute top-[200px] left-[90px] rounded-full flex justify-center items-center cursor-pointer'>
            <FiPlus className='text-white' />
        </div>
        {/* making input div */}
        <div className='w-full flex flex-col items-center justify-center gap-[20px] mt-[50px]' >
        {/* with the help of e.target.value what ever will be the input becomes firsName */}
        <input type='text' placeholder='firstName'className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/> 
        <input type='text' placeholder='lastName'className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
        <input type='text' placeholder='userName'className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
        <input type='text' placeholder='headline'className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={headline} onChange={(e)=>{setHeadline(e.target.value)}}/>
        <input type='text' placeholder='location'className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
        <input type='text' placeholder='gender (male/female/others)'className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={gender} onChange={(e)=>{setGender(e.target.value)}}/>
        {/* adding skills */}
        <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
        <h1>Skills</h1>
        {/* traverse on skills */}
        {skills && <div className='flex flex-col gap-[10px]'> {/* when skills have some val then only traverse */}
            {skills.map((skill,index)=>(
                <div key={index} className='w-full h-[40px] border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] flex justify-between items-center'>  {/* justify between->[Left          Right] */}
                    {/* use this ()=> when passing argument along with function */}
                    <span>{skill}</span><RxCross1 className='w-[20px] cursor-pointer h-[25px] text-gray-800 font-bold ' onClick={()=>removeSkill(skill)}/></div>
            ))}
            </div>}
        {/* form to add new skills */}
        <div className='flex flex-col gap-[10px] items-start'>
            <input type='text' placeholder='add new skills' value={newSkills} onChange={(e)=>setNewSkills(e.target.value)} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg'/>
            <button className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]' onClick={addSkill}>Add</button>
        </div>
        </div>
        {/* adding education */}
        <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
      <h1 className='text-[19px] font-semibold'>Education</h1>
      {/* display education by transversing */}
       {education && <div className='flex flex-col gap-[10px]'>
       { education.map((edu,index)=>(
         <div key={index} className='w-full  border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] flex justify-between items-center'><div>
          <div>College: {edu.college}</div>
          <div>Degree: {edu.degree}</div>
          <div>Field Of Study: {edu.fieldOfStudy}</div>
         </div>
         <RxCross1 className='w-[20px] h-[20px] cursor-pointer text-gray-800 font-bold' onClick={()=>removeEducation(edu)}/></div>
        ))}
        </div>}
        <div className='flex flex-col gap-[10px] items-start'>
        <input type="text" placeholder='college' value={newEducation.college} onChange={(e)=>setNewEducation({...newEducation,college:e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg'/>
        <input type="text" placeholder='degree' value={newEducation.degree} onChange={(e)=>setNewEducation({...newEducation,degree:e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg'/>
        <input type="text" placeholder='Field Of Study' value={newEducation.fieldOfStudy} onChange={(e)=>setNewEducation({...newEducation,fieldOfStudy:e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg'/>
        <button className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]' onClick={addEducation}>Add</button>
      </div>
      </div>

      {/* adding experience */}  
      <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
      <h1 className='text-[19px] font-semibold'>Experience</h1>
       {experience && <div className='flex flex-col gap-[10px]'>
       { experience.map((exp,index)=>(
         <div key={index} className='w-full  border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] flex justify-between items-center'><div>
          <div>title: {exp.title}</div>
          <div>company: {exp.company}</div>
          <div>description: {exp.description}</div>
         </div>
         <RxCross1 className='w-[20px] h-[20px] cursor-pointer text-gray-800 font-bold' onClick={()=>removeExperience(exp)} /></div>
        ))}
        </div>}
        {/* input experience */}
      <div className='flex flex-col gap-[10px] items-start'>
        <input type="text" placeholder='title' value={newExperience.title} onChange={(e)=>setNewExperience({...newExperience,title:e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg'/>
        <input type="text" placeholder='company' value={newExperience.company} onChange={(e)=>setNewExperience({...newExperience,company:e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg'/>
        <input type="text" placeholder='description' value={newExperience.description} onChange={(e)=>setNewExperience({...newExperience,description:e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg'/>
        <button className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]' onClick={addExperience}>Add</button>
      </div>
      </div>

      <button className='w-[100%] h-[50px] rounded-full bg-[#24b2ff] mt-[40px] text-white' disabled={saving} onClick={()=>handleSaveProfile()}>{saving?"saving...":"Save Profile"}</button>  

      </div>
      
      </div>

      

    </div>
  )
}

export default EditProfile
