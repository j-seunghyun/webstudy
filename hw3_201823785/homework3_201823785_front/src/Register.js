import React, {useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";

const Register = (props) => {

    const [userInput, setUserInput] = useState({
        bookName: '',
        bookIntro: '',
        bookPublishedYear : '',
        bookAuthor: '',
        bookId: 0,
    });
    const dispatch = useDispatch();

    const submitHandler = (event) =>{
        event.preventDefault();

        if(!userInput.bookName)
            alert("책 이름은 필수사항입니다.");
        else if(!userInput.bookPublishedYear)
            alert("출간년도는 필수사항입니다.");
        else if(!userInput.bookAuthor)
            alert("저자이름은 필수사항입니다.");
        else if(!Number(userInput.bookPublishedYear))
            alert("출간년도는 숫자로 입력해주세요");

        //데이터 저장
        else {
            axios
                .post("http://localhost:3030/post", {data: userInput})
                .then(function (response) {
                    alert("추가 성공!");
                    dispatch({type: "/add"});
                    props.onSaveData(userInput);
                })
                .catch(function(error) {
                    alert("data 저장 실패");
                });
        }


        setUserInput({
            ...userInput,
            bookName: '',
            bookIntro: '',
            bookPublishedYear: '',
            bookAuthor: '',
        });
    }


    const resetHandler = (event) =>{
        setUserInput({
            ...userInput,
            bookName: '',
            bookIntro: '',
            bookPublishedYear: '',
            bookAuthor: '',
        });
    }

    const bookNameChangeHandler = (event) => {
        setUserInput({
            ...userInput,
            bookName:event.target.value,
        });
    }
    const bookIntroChangeHandler = (event) =>{
        setUserInput({
            ...userInput,
            bookIntro: event.target.value,
        });
    }

    const bookPublishYearChangeHandler = (event) =>{
        setUserInput({
            ...userInput,
            bookPublishedYear: event.target.value,
        });
    }

    const bookAuthorChangeHandler = (event)=>{
        setUserInput({
            ...userInput,
            bookAuthor: event.target.value,
        });
    }

    const setRandomBookId = () =>{
        let rand = Math.floor(Math.random()*9000)+1000
        setUserInput({
            ...userInput,
            bookId: rand,
        });
    }
    return(
        <div>
            <h3>새로운 책 등록</h3>
            <form onSubmit={submitHandler}>
                <div>
                    <label>책 이름</label>
                    <input type="text" value={userInput.bookName} onChange={bookNameChangeHandler}/>
                </div>

                <div>
                    <label>책 한줄 소개</label>
                    <input type="text" value={userInput.bookIntro} onChange={bookIntroChangeHandler}/>
                </div>

                <div>
                    <label>출간 연도</label>
                    <input type="text" value={userInput.bookPublishedYear} onChange={bookPublishYearChangeHandler}/>
                </div>
                <div>
                    <label>저자</label>
                    <input type="text" value={userInput.bookAuthor} onChange={bookAuthorChangeHandler}/>
                </div>
                {userInput && <p>{userInput.bookAuthor}, {userInput.bookName}, {userInput.bookPublishedYear}</p>}
                <button type="button" onClick={resetHandler}>초기화</button>
                <button type="submit"  value={userInput.bookId} onClick={setRandomBookId}>등록</button>
            </form>
        </div>
    );
}

export default Register;