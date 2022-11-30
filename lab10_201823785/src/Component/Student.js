import studentList from "./studentdata";
import React from "react";
import "./studentstyle.css";

function Student(props){
    return(
        <div id="studentContainer">
            <div id = "logoBox">
                <img id="logoImage" src ="https://www.ajou.ac.kr/_res/ajou/kr/img/intro/img-system06.png" alt="ajou logo">
                </img>
            </div>
            <div id="innerContainer">
                <div id="imageContainer">
                    <img id = "studentImage" src={studentList[props.studentId].photoURL} alt = "student1"></img>
                </div>
                <div id="studentInfoContainer">
                    <div className="studentInfo">
                        <h1>{studentList[props.studentId].koreanName}</h1>
                        <h1>{studentList[props.studentId].englishName}</h1>
                        <h1>{studentList[props.studentId].studentId}</h1>
                        <h1>{studentList[props.studentId].department}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;