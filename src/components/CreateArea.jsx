import React, { useState } from 'react';
import Zoom from '@material-ui/core/Zoom';
import './datepicker.css';
import './note.css';
import "react-datepicker/dist/react-datepicker.css"; // css import 
import "./createarea.css";
import DatePicker from "react-datepicker";
import { format } from 'date-fns';


function CreateArea(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const defaultDate = format(startDate, 'MM-dd-yyyy');

    const email = props.email;

    const [note, setNote] = useState({
        title: "",
        content: "",
        sets: "",
        reps: "",
        weight: "",
        email: email,
        date: defaultDate,
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value,
            };
        });
    };


    function handleDateChange(date) {
        // const { name, value } = event.target;
        console.log(date);
        const formattedDate = format(date, 'MM-dd-yyyy');
        setNote(prevNote => {
            return {
                ...prevNote,
                "date": formattedDate,
            };
        });
    };

    function expand() {
        setExpanded(true);
    }

    function submitNote(event) {
        event.preventDefault();


        const newNote = {
            title: note.title,
            sets: note.sets,
            reps: note.reps,
            weight: note.weight,
            date: note.date,
            email: email
        };

        console.log("New:", newNote);

    
        fetch("/saveNote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        })
        .then(response => {
            if (response.ok) {
                console.log("Note saved successfully", note);
                // Do something after saving the note, like displaying a success message
                props.onAdd(newNote); // Add the note to the 'notes' state in the 'Main' component
            } else {
                console.log("Error saving note:", response.status);
                // Handle the error, like displaying an error message
            }
        })
        .catch(error => {
            console.log("Error saving note:", error);
            // Handle the error, like displaying an error message
        });
    
        // Clear the form fields or perform any other necessary actions
        setNote({
            title: "",
            content: "",
            sets: "",
            reps: "",
            weight: "",
            email: email,
            date: defaultDate
        });
    }

    return (
        <div>
            <form className='create-note' method="POST">
                <input
                    className='Title'
                    name="title"
                    onClick={expand}
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title" />

                {isExpanded && (<div class="input-group">
                    <textarea
                        name="sets"
                        onChange={handleChange}
                        value={note.sets}
                        placeholder="Sets"
                        rows={isExpanded ? 1 : 1}
                    />
                    <div class="input-group-append">
                        <span class="input-group-text"> sets </span>
                    </div>
                </div>
                )}

                {isExpanded && (<div class="input-group">

                    <textarea
                        name="reps"
                        onChange={handleChange}
                        value={note.reps}
                        placeholder="Reps"
                        rows={isExpanded ? 1 : 1}
                    />

                    <div class="input-group-append">
                        <span class="input-group-text"> reps </span>
                    </div>
                </div>
                )}


                {isExpanded && (<div class="input-group">

                    <textarea
                        name="weight"
                        onChange={handleChange}
                        value={note.weight}
                        placeholder="Weight"
                        rows={isExpanded ? 1 : 1}
                    />
                    <div class="input-group-append">
                        <span class="input-group-text"> lb/kg </span>
                    </div>
                </div>
                )}

                <div style={{ marginLeft: "80px", fontSize: "20px" }}>
                    <DatePicker showPopperArrow={false} selected={startDate} dateFormat="MM-dd-yyyy" name="date" value={note.date} onChange={handleDateChange} />
                </div>

                <Zoom in={isExpanded}>
                    <button className="btnSubmit" style={{ width: "400px", textAlign: "center", margin: "10px" }} onClick={submitNote}>Submit</button>
                </Zoom>
            </form>
        </div>
    )
}

export default CreateArea;