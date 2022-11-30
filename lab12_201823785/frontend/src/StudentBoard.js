import Student from "./Student";
import React, {Fragment} from "react";
import axios from "axios";

const StudentBoard = (props) => {
    const students = props.students;
    let studentLists =[];

    //삭제를 하는 event 발생
    const onRemove = (index) =>{
        let studentId;

        students.forEach((student)=>{
            if(student.id === index)
                studentId = student.studentId;
        });
        const deletedStudent = students.filter(student=>
            student.id !== index
        );
        console.log(deletedStudent);
        props.listDelete(deletedStudent, index);

        axios
            .delete("http://localhost:3080/delete", {params:{data: studentId}})
            .then(function(response){
                alert("삭제 완료!");
            });
    }

    if(students){
        studentLists = students.map(student=>
            <div key={student.studentId}>
                <div className = "studentBoard">
                    <div className = "studentIndex">
                        <h1>{student.id}.</h1>
                    </div>
                    <Student student={student}/>
                    <div>
                        <button onClick={()=>onRemove(student.id)}>삭제</button>
                    </div>
                </div>
            </div>
        );
    }
    return(
        <Fragment>
            {studentLists}
        </Fragment>
    );
}


export default StudentBoard;