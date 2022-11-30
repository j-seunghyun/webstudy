import {Routes, Route, Link} from "react-router-dom";
import MainPage from "./MainPage";
import BookList from "./BookList";
import Register from "./Register";
import {useState} from "react";
import Book from "./Book";

const App =() =>{

  const [bookList, setBookLists] = useState([]);

  const listAdd = (bookInfo) =>{
      setBookLists([...bookList, bookInfo]);
      console.log(bookList);
  }

  const listDelete = (deletedBookList) =>{
      setBookLists(deletedBookList);
  }

  return (
    <div>
        <div>
            <p>서지 정보 관리기</p>
            <Link to={"/"}>메인으로</Link>
        </div>
        <Routes>
            <Route path ={"/"} element={<MainPage/>}/>
            <Route path={"/list"} element = {<BookList list={bookList} onDeleteData={listDelete}/>}/>
            <Route path={"/register"} element={<Register onSaveData={listAdd}/>}/>
            <Route path= {"/book/:bookId"} element={<Book data={bookList}/>}/>
        </Routes>
    </div>
  );
}

export default App;
