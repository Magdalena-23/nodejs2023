import "./student.css";

const Student = (props) => {
  return (
    <div className="student">
      <h1>{props.name}</h1>
      <p>prosek: {props.grade}</p>
    </div>
  );
};

export default Student;
