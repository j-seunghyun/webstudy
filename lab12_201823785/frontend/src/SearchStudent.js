import React, {useState} from 'react';
import axios from "axios";

const SearchStudent = () =>{

    const [studentId, setStudentId] = useState('');

    const submitHandler = (event) =>{
        event.preventDefault();
        setStudentId('');
        if(!studentId){
            alert("학번을 기입해주세요!");
        }
        else{
            axios
                .get("http://localhost:3080/get", {params:{data: studentId}})
                //이미 db에 존재하는 데이터인 경우
                .then(function(response){
                    alert("이미 존재하는 데이터입니다.");
                })
                //db에 존재하지 않는 데이터의 경우
                .catch(function(error){
                    alert("존재하지 않는 데이터입니다.")
            });
        }
    };

    const onTextFieldChange = (event)=>{
        setStudentId(event.target.value);
        event.target.value='';
    };

    return(
        <form onSubmit={submitHandler}>
            <input type="text" value={studentId} onChange={onTextFieldChange}/>
            <button type='submit'>조회</button>
        </form>
    );
}

export default SearchStudent;