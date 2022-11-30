import React , {useState} from "react";
import StudentBoard from "./StudentBoard";
import axios from "axios";

const AddStudent = () => {
    const [visible, setVisible] = useState(false);
    const [studentList, setStudentList] = useState([]);

    const [userInput, setUserInput] = useState({
        koreanName: '',
        englishName: '',
        studentId: '',
        subject: '',
        imageUrl: '',
        id: 0,
    });

    const onButtonClicked = () =>{
        setVisible(!visible);
    }

    const listDelete = (deletedStudentList, index) =>{
        //삭제 후 지금 newStudentList의 id조정 필요
        deletedStudentList.forEach((student)=>{
            if(student.id > index)
                student.id--;
        });

        //그 후 현재 userInput의 id속성 1 감소시킴
        setUserInput({
            ...userInput,
            id:userInput.id-1,
        });
        setStudentList(deletedStudentList);
    }

    const submitHandler = (event)=>{
        event.preventDefault();

        if(!userInput.studentId){
            alert("학번을 기입해주세요!");
        }
        else{

            console.log(userInput.id);

            axios
                .get("http://localhost:3080/get", {params :{data: userInput.studentId}})
                //이미 db에 존재하는 학번의 경우
                .then(function(response){
                    alert("이미 존재하는 학번입니다.");
                })
                //db에 존재하지 않는 데이터의 경우
                .catch(function(error){
                    //먼저 출력 후 visible다시 false로 설정
                    setVisible(!visible);
                    //database에 data 저장
                    axios
                        .post("http://localhost:3080/post", {data: userInput})
                        .then(function(response){
                            alert("추가 성공했습니다!");
                            setStudentList([...studentList, userInput]);
                        })
                        .catch(function(error){
                            alert("데이터 저장 실패");
                        });
                });
        }
        setUserInput({
            ...userInput,
            koreanName: '',
            englishName: '',
            studentId: '',
            subject: '',
            imageUrl: '',
        });

        console.log(userInput.id);
    }

    const idCountUp = () =>{
        setUserInput({
            ...userInput,
            id: userInput.id+1,
        });
    }
    const koreanNameChangeHandler = (event)=>{
        setUserInput({
            ...userInput,
            koreanName:event.target.value,
        });
    }

    const englishNameChangeHandler = (event)=>{
        setUserInput({
            ...userInput,
            englishName:event.target.value,
        });
    }

    const subjectChangeHandler = (event)=>{
        setUserInput({
            ...userInput,
            subject:event.target.value,
        });
    }

    const imageUrlChangeHandler = (event)=>{
        setUserInput({
            ...userInput,
            imageUrl:event.target.value,
        });
    }

    const studentIdChangeHandler= (event)=>{
        setUserInput({
            ...userInput,
            studentId:event.target.value,
        });
    }

    return(
        <div>
            <button onClick={onButtonClicked}>학생 추가</button>
            {visible && <form onSubmit={submitHandler}>
                <label>국문이름</label>
                <input type="text" value={userInput.koreanName} onChange={koreanNameChangeHandler}/>

                <label>영문이름</label>
                <input type="text" value={userInput.englishName} onChange={englishNameChangeHandler}/>

                <label>학번</label>
                <input type="text" value={userInput.studentId} onChange={studentIdChangeHandler}/>

                <label>학과</label>
                <input type="text" value={userInput.subject} onChange={subjectChangeHandler}/>

                <label>사진주소</label>
                <input type="text" value={userInput.imageUrl} onChange={imageUrlChangeHandler}/>

                <button type="submit" value={userInput.id} onClick={idCountUp}>추가</button>
            </form>}
            {studentList && <StudentBoard students={studentList} listDelete={listDelete}/>}
        </div>
    );
}

export default AddStudent;