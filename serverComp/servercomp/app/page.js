"use client"
import { submitAction } from "@/actions/form";
import {  useRef , useEffect, useState} from "react"
import { studentsDetail } from "@/actions/studentsDetail";

export default function Home() {
 
  let ref = useRef()
  let btnRef = useRef()
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      let data = await studentsDetail();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (

 
     
    <>
      <form ref={ref} action={(e) => {
        submitAction(e);
        ref.current.reset()
      }}>
          <div>
          <label htmlFor="name">Name</label>
          <input name="name" id="name" className="text-black mx-4" type="text" />
        </div>
        <div>
          <label htmlFor="add">Address</label>
          <input name="add" id="add" className="text-black mx-4" type="text" />
        </div>
        <div>

        <button onClick={()=> fetchStudents()} ref={btnRef} className="border border-white px-3">Submit</button>
        </div>
      </form>

      <div>
        {students.map((student, index) => (
          <div key={index}>{student.name}</div>
        ))}
      </div>
    </>
  );
}
