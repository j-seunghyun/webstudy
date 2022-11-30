import {useState, Fragment} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import Book from "./Book";

const BookList = (props) => {

    const bookList = props.list;
    let bookLists;
    const dispatch = useDispatch();
    const bookCount = useSelector((state)=> state.count);
    let yearList =[];
    let newYearList; let newYearLists; let newBookList=[];
    const [itemChecked, setItemChecked] = useState(true);
    newBookList = bookList;

    const onRemove =(bookId) =>{
        const deletedBookList = bookList.filter(book=>
            book.bookId !== bookId
        );

        //axios로 북 delete 필요!!
        axios
            .delete("http://localhost:3030/delete", {params:{data:bookId}})
            .then(function(response){
                alert("삭제 완료");
                props.onDeleteData(deletedBookList);
                dispatch({type: "/minus"});
            })
            .catch(function(error){
                alert("삭제 실패");
            });
    }

    const navigate = useNavigate();

    const buttonClicked = (bookId) =>{
        navigate(`/book/${bookId}`);
    };

    const checkBoxChanged = (event,year) =>{
        setItemChecked(!itemChecked);
        if(itemChecked === false){
            newBookList = bookList.filter(book=>
                book.publishedYear !== year
            );
        }
    }

    if(bookList){

        bookList.forEach(book=>{
            yearList.push(book.bookPublishedYear);
        });

        newYearList = yearList.filter((val, idx)=>{
            return yearList.indexOf(val) === idx;
        });

        newYearLists = newYearList.map(year =>
            <div key={year}>
                <input type="checkbox" checked={itemChecked} onChange={(e)=>checkBoxChanged(e,year)}/>
                <label>{year}</label>
            </div>
        );
    }

    if(bookList){
        bookLists = newBookList.map(book =>
            <div key={book.bookId}>
                <h3>{book.bookName}</h3>
                <p>{book.bookAuthor} 저 ({book.bookPublishedYear}년)</p>
                <p>서지 관리 ID : {book.bookId}</p>
                <div>
                    <button onClick={() =>onRemove(book.bookId)}>삭제</button>
                    <button onClick={() =>buttonClicked(book.bookId)}>자세히</button>
                </div>
            </div>
        );
    }

    return(
        <div>
            <h3>화면 조작 패널</h3>
            <p>현재 등록되어 있는 서지 정보는 {bookCount}개입니다.</p>
            <h3>특정 연도만 확인하기</h3>
            <Fragment>
                {newYearLists}
            </Fragment>
            <Fragment>
                {bookLists}
            </Fragment>
        </div>
    );
}

export default BookList;