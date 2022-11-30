import {useParams} from "react-router-dom";

const Book = (props) =>{
    const params = useParams();
    const bookId = params.bookId;

    const bookList = props.data;
    let bookToPrint;
    bookToPrint = bookList.filter((book)=>
        book.bookId === Number(bookId)
    );

    return(
        <div>
            <h3>{bookToPrint[0].bookName}</h3>
            <ul>
                <li>저자: {bookToPrint[0].bookAuthor}</li>
                <li>출간년도: {bookToPrint[0].bookPublishedYear}</li>
            </ul>
            <p>소개글</p>
            <p>{bookToPrint[0].bookIntro}</p>
            <p>{bookToPrint[0].bookAuthor}, {bookToPrint[0].bookName}, {bookToPrint[0].bookPublishedYear}</p>
        </div>
    );
}

export default Book;