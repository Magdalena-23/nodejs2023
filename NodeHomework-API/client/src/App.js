import { useEffect, useState } from "react";
import "./App.css";
import Student from "./components/Student";

function App() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/studenti");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const buttonClick = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ime: name, prosek: grade }),
    };
    fetch("http://localhost:8080/studenti", requestOptions)
      .then((response) => response.json())
      .then((data) => setStudents(data));
  };

  return (
    <div className="App">
      <h1>Student</h1>
      <div className="form">
        <label htmlFor="ime">Ime:</label>
        <input
          type="text"
          id="ime"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label htmlFor="prosek">Prosek:</label>
        <input
          type="number"
          onChange={(event) => {
            setGrade(event.target.value);
          }}
          id="prosek"
        />
        <button onClick={buttonClick}>Add student</button>
      </div>
      <div>
        {students.map((student, index) => {
          return (
            <Student key={index} name={student.ime} grade={student.prosek} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
