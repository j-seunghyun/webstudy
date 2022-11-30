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
                    <img id = "studentImage" src={props.student.imageUrl} alt = {props.student.studentId}></img>
                </div>
                <div id="studentInfoContainer">
                    <div className="studentInfo">
                        <h1>{props.student.koreanName}</h1>
                        <h1>{props.student.englishName}</h1>
                        <h1>{props.student.studentId}</h1>
                        <h1>{props.student.subject}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;