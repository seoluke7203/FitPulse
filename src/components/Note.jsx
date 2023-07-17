import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "./note.css";

function Note(props) {
  // const handleDeleteNote = (noteId) =>{
  //   console.log("Handle", noteId);
  //   fetch(`/deleteNote/${noteId}`, { method: 'DELETE' })
  //   .then(response => {
  //     if (response.ok) {
  //       console.log('Note deleted successfully');
  //       // Update your notes state or perform any necessary actions
  //     } else {
  //       console.error('Failed to delete note');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  // }


  function handleClick() {
    props.onDelete(props.id);
    console.log("Click", props.id);
    // handleDeleteNote(props.id);
  }

  console.log('Note - Email:', props.email);

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
