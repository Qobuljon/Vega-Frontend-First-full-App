import React,{useState,useEffect} from 'react'
import { BsBookmarkPlusFill, BsFillBookmarkCheckFill } from 'react-icons/bs'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from '../../../api/axios'
import MainLoader from '../../../components/loader/MainLoader'
import Comments from '../../comment/Comments'
import ThemaSingleP from '../thema-single/ThemaSingleP'
import loading from "../../../assets/Spinner-1s-200px.svg"


const LessonSingleP = (
    {
        match: {
          params: { id },
        },
      }
) => {
  const [singleLesson,setSingleLesson] = useState([])
  const [themes,setThemes] = useState([])
  const [themesState,setThemesState] = useState(false)
  const [commentsState,setCommentsState] = useState(false)
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(()=>{
    axios.get(`/lesson/single-lesson/${id}`)
            .then(res => {
                setSingleLesson(res.data)
                axios.get(`/theme/special/${id}`)
                  .then(res => {
                      setThemesState(true)
                      setThemes(res.data.data)
                  })
                  .catch(err => {
                    console.log(err);
                    setThemes(res.data.data)

                  })
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
  },[createLoading,id ])

  // learn

  const history = useHistory()

  const studentLoc= useSelector(j => j.student)
  const [learnState, setLearnState] = useState(false)
  const [refresh,setRefresh] = useState(false)

  const [Student,setStudent] = useState(null)
  // console.log(Student," failk adla wdoiawkld awk");
    useEffect(()=> {
      if (studentLoc != null) {
        axios.get(`/student/${studentLoc.id}`)
        .then(res => {
          setStudent(res.data.data[0])
          if(res.data.data[0].mainLessons.includes(id)){
            setLearnState(true)
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      }
    },[refresh])
  // console.log(Student ,"student");
  const LearnBtn = () =>{
    if(studentLoc === null){
      return history.push("/login-student")
    }

   if (Student.mainLessons?.includes(id)){
     console.log("noo");
    
   } else{
    console.log("ok");
    axios.patch(`/student/add-mainLesson/${Student._id}`,{mainLesson:id,themes,teacher:singleLesson.data[0]?.owner })
      .then(res => {
        console.log( res);
        // window.location.reload(true)   refresh berish
        setRefresh(j => !j)
        // add overallLessons
      
      })
      .catch(err => {
        console.log( err);
      })
    // axios.patch("/student/add-overall-lesson",{studentsId:[Student._id],themes})
    //       .then(res => {
    //         console.log(res);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       })
    axios.patch(`/lesson/learner/${id}`,{student:Student._id})
      .then(res => {
        console.log(res,"student added"); 
      })
      .catch(err => {
        console.log(err);
      })

      axios.patch(`/teacher/add-student/${singleLesson.data[0]?.owner}`,{student:Student._id})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
     
      
      
   }

  } 
  // console.log( studentLoc );
  return (
    singleLesson.state ?
    
    <div className={`w-[100%]  relative `}>

    <div  className={` overflow-hidden  `}>

      <div className="Cart lg:flex">
        <div className="img lg:w-[50%] lg:h-[350px]  flex items-center justify-center ">
          <div className="h-[100%]">
             <img className=' h-[100%] ' src={singleLesson.data[0]?.urls[0]} alt="Darslik rasmi" />
          </div>

        </div>
        <div className="Info lg:w-[50%] py-3 lg:py-6 mx-1">
          <div className="flex w-[100%] justify-between ">
            <h1 className='max-w-[70%] pr-1'>Nomi: <span className='text-xl'>{singleLesson.data[0]?.title} bo'yicha dars</span></h1>
           
           
            <div onClick={LearnBtn} className={`learn ${learnState? "bg-slate-900" :"bg-red-800"} text-white py-1 flex items-center justify-center hover:cursor-pointer h-[60px] w-[60px] mr-[3%] box_shadow `}>
              {
                learnState ? 
                <h1 className='text-2xl'><BsFillBookmarkCheckFill /></h1>
                :
                <h1 className='text-2xl'> <BsBookmarkPlusFill /></h1>

              }
            </div>
          
          
          </div>
          <div className="">
            <h1>Kurs Turi: {singleLesson.data[0]?.type}</h1>
            <h1>Ustoz: {singleLesson.data[0]?.owner}</h1>
            <h1>O'rganuvchilar: {singleLesson.data[0]?.students.length}</h1>
            <h1 className='opacity-100'>Malumot: <span>{singleLesson.data[0]?.desc}</span></h1>
          </div>
        </div>
      </div>

      <div className="lessons my-10 min-h-[350px] mx-3 ">
        {
          themes?.map((lesson,inx) => (
            <div onClick={()=> {
              history.push(`/theme-single-page/${lesson._id}`)
            }} key={inx} className="lesson border-b-2 border-slate-500 py-3  hover:cursor-pointer flex items-center justify-between my-4 h-[75px] lg:h-[180px] ">
              <div className="lesson_video w-[25%] h-[75px] flex items-center justify-center lg:h-[180px] ">
               <img className='w-[100%] h-[100%] object-contain ' src={lesson?.image} alt="Mavzu rasmi" />
              </div>
              <div className="w-[65%] h-[100%] overflow-hidden  px-2">
                <h1 className='text-center '>
                  {lesson? lesson.theme : ""}
                </h1>
              </div>
              <div className="count w-[40px] h-[40px] flex items-center justify-center  bg-red-800 ">
                <h1 className='text-white text-xl'>
                  {
                    inx + 1
                  }
                </h1>
              </div>
            </div>
          ))
        }
        {
          themes.length ? "" : <div className="">
            {
              themesState? 
              <h1 className='text-xl' >Mavzular topilmadi🤷‍♂️</h1>
              :
              <div className=" flex items-center">
                <h1 className='flex items-center mr-2'>Mavzular Yuklanmoqda... </h1>
                <img className='w-[35px] h-[35px] ' src={loading} alt="" />
              </div>
            }
          </div>
        }
      </div>


        <div onClick={()=>setCommentsState(true)} className="Comments">
          <Comments singleLesson={singleLesson} createLoading={createLoading} setCreateLoading={setCreateLoading}   id={singleLesson.data[0]?._id}  />
     
        </div>


    </div>
    </div>
    
    :
    <MainLoader />
  )
}

export default LessonSingleP