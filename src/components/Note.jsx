import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "./note.css";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title || "Exercise"}</h1>
      <p>{props.sets || 0} sets</p>
      <p>{props.reps || 0} reps</p>
      <p>{props.weight || 0} lb/kg</p>
      <p>{props.date}</p>
      <button onClick={handleClick}><DeleteIcon/></button>
    </div>
  );
}

export default Note;
