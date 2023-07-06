import React, { useState } from 'react';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
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

    const [note, setNote] = useState({
        title: "",
        content: "",
        sets: "",
        reps: "",
        weight: "",
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
        props.onAdd(note);
        setNote({
            title: "",
            content: "",
            sets: "",
            reps: "",
            weight: "",
            date: defaultDate,
        });
        event.preventDefault();
    }

    return (
        <div>
            <form className='create-note'>
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