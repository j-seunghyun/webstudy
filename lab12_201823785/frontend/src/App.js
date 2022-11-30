import StudentBoard from "./StudentBoard";
import SearchStudent from "./SearchStudent";
import AddStudent from "./AddStudent";

function App() {
  return (
    <div>
      <h1 id= "homeworkName">Lab12 201823785 장승현</h1>
      <SearchStudent/>
      <AddStudent/>
      <p>누적 서버 요청 횟수 :</p>
      <button>초기화</button>
      <StudentBoard/>
    </div>
  );
}

export default App;
