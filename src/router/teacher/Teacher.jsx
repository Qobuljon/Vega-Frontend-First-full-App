import React, { useState,useEffect } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { useSelector } from "react-redux";
import axios from "../../api/axios";
import { auth } from "../../auth/auth";
import Loader from "../../components/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import {FaBook} from "react-icons/fa"
import { BsFillPhoneVibrateFill } from "react-icons/bs";
import {MdDescription} from "react-icons/md"
import {VscFileSymlinkDirectory} from "react-icons/vsc"
import AddLesson from "../../components/edit-lesson/AddLesson";
import LessonsWrapper from "../../components/edit-lesson/LessonsWrapper";
import Announcement from "../../components/announcement/Announcement";
import SpecialLessons from "../single-pages/teachers-single-page/SpecialLessons";

import growth from "../../assets/growth-green.png"
import exit from "../../assets/exit-icon-png-2.jpg"
import CreateLesson from "../../components/create-lesson/CreateLesson";
import AddAnnouncement from "../../components/announcement/AddAnnouncement";


const Teacher = () => {
  document.title = "Teacher";
  const teacher = useSelector(j => j.teacher)
  const teacher_id = teacher.id

  const [teacherData,setTeacherData] = useState([])
  const [pathState,setPathState] = useState("elonlar")
  const [growthState,setGrowthState] = useState(false)
  const [modalState,setModalState]  = useState("")
  if(growthState){
    window.document.body.style.overflowY = "hidden"
  }else{
    window.document.body.style.overflowY = "auto"
  }

  useEffect(()=> {
    axios.get(`/teacher/${teacher_id}`)
      .then(res => {
          setTeacherData(res.data)
          console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  },[modalState])
  return (
    teacherData.state  ?
    <div className="w-[100%] ">
    {
        teacherData.data?.map((teacherData,inx) => (
          <div key={inx} className='Teacher relative border' >
   

      <div className={`teacher_profile ${modalState === "" ? "h-auto" :"h-0 overflow-hidden" }`}>
        <div className="img w-[150px] h-[150px] m-3 mx-auto  border  border-inherit border-hidden rounded-[50%] md:rounded-none md:w-[100%] md:h-[350px]  md:m-0 overflow-hidden  ">
          <img className="w-[100%] h-[100%] object-cover " src={teacherData?.urls[0]} alt="" />
        </div>
        <div className=" w-[100%] px-2 ">
        <h1 className=" text-xl text-center md:text-left md:text-2xl  "> {teacherData?.name}</h1>
        <h1 className=" text-xl text-center md:text-left md:text-2xl  "> @<span className="opacity-75">{teacherData?.username}</span></h1>
        <div className="flex w-[100%] items-center justify-center md:justify-start ">
        <FaBook  />
        <h1 className=" text-xl text-center md:text-left md:text-2xl opacity-95 ml-1"> {teacherData?.type}</h1>
        </div>
        
        <div className="desc my-1 flex items-center ">
          <MdDescription />
          <p className="ml-1">
            {
              teacherData?.desc
            }
          </p>
        </div>
        
        <div className="connection flex w-[100%] items-center  ">
        <BsFillPhoneVibrateFill  />
        <h1 className=" text-sm text-center md:text-left md:text-xl opacity-95 ml-1"> { teacherData?.connection }</h1>
        </div>

        <div className=" w-[100%] flex items-center ">  
          <div className="malumotlar flex-1">
          <div className="students flex items-center md:text-2xl ">
              <p className="text-red-800">E'lonlar: </p>
              <h1 className="ml-1 text-green-900"> { teacherData?.news.length}</h1>
            </div>
            <div className="lessons   flex items-center  md:text-2xl">
              <p className="text-red-800">Darsliklar: </p>
              <h1 className="ml-1 text-green-800"> { teacherData?.lessons.length}</h1>
            </div>
            
            <div className="students flex items-center md:text-2xl ">
              <p className="text-red-800">O'quvchilar: </p>
              <h1 className="ml-1 text-green-900"> { teacherData?.students.length}</h1>
            </div>
          </div>
          <div  className="add mr-5 ">
            <img onClick={()=> setGrowthState(true)} width={"50px"} height={"50px"} src={growth} alt="" />
            <div className={` ${growthState ? "h-screen" : "h-0 overflow-hidden"} adding Path fixed  bg-[#0000001f] top-0 left-0 w-[100%]   box_shadow flex items-center justify-center`}>
              <div className="w-[280px] h-[310px] bg-white box_shadow ">
                <img onClick={()=> setGrowthState(false)} className="w-[25px] h-[25px] mt-[-10px] ml-[104%] lg:ml-[105%] " src={exit} alt="" />
                <div className=" w-[85%] block mx-auto ">
                <div onClick={() => {
                  setModalState("add-announcement")
                  setGrowthState(false)
                }} className="News block my-7 m-auto bg-slate-900 py-[14px] px-4  border-none rounded-sm"><span  className={`text-white text-lg borderB `}>E'lon Qo'shish</span></div>
                <div onClick={() => {
                  setModalState("create-lesson")
                  setGrowthState(false)
                }} className="News block my-7 m-auto bg-slate-900 py-[14px] px-4  border-none rounded-sm"><span  className={`text-white text-lg borderB `}>Darslik Qo'shish</span></div>
                {/* <div  className="News block my-7 m-auto bg-slate-900 py-[14px] px-4  border-none rounded-sm"><span  className={`text-white text-lg borderB `}>Darslikga Mavzu Qo'shish</span></div> */}

                </div>
              </div>
            </div>
          </div>
         </div>
      
        </div>

      </div>

        
      

      <div className={`w-[100%] ${modalState === "" ? "h-auto" :"h-0 overflow-hidden" } `}>
        <div className="Path mt-10 flex ">
          <div className="News block m-auto bg-slate-900 py-[4px] px-4  border-none rounded-sm"><span onClick={()=> setPathState("elonlar")} className={`text-white text-sm borderB ${pathState === "elonlar" ? "boderBF" : "borderB"}`}>E'lonlar</span></div>
          <div className="lessons block m-auto bg-slate-900 py-[4px] px-4   border-none rounded-sm"><span onClick={()=> setPathState("darsliklar")} className={`text-white text-sm borderB ${pathState === "darsliklar" ? "boderBF" : "borderB"}`}>Darsliklar</span></div>
          <div className="Students block m-auto bg-slate-900 py-[4px] px-4   border-none rounded-sm"><span onClick={()=> setPathState("o'rganuvchilar")} className={`text-white text-sm borderB ${pathState === "o'rganuvchilar" ? "boderBF" : "borderB"}`}>O'rganuvchilar</span></div>
        </div> 
        <div className="w-[100%] ">
          <Announcement announcements={teacherData?.news}  state={pathState} />
          <SpecialLessons teacherName={teacherData?.username} state={pathState} />
        </div>
      </div>
      {/* <LessonsWrapper /> */}
      <Router>
        <Switch>
          {/* <Route path="/teacher/special-lessons" component={LessonsWrapper} /> */}
        </Switch>
      </Router>
      
      <div className={` ${modalState === "create-lesson"? "top-0" : " top-[-500%]"}   modal w-[100%] bg-white absolute left-0 `}> 
      <img onClick={()=> setModalState("")} className="w-[25px] h-[25px] mt-[20px]  " src={exit} alt="" />
        {
          modalState === "create-lesson" ? <CreateLesson /> : modalState === "add-announcement" ? <AddAnnouncement id={teacherData?._id} /> : <div className="">Lorem</div>
        }
      </div>
      
         </div>
       
       
       ))
    
    }
    </div>
    

    :
    <Loader />
  )
}

export default Teacher