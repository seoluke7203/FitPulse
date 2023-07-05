import React, { useState } from 'react';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from '@material-ui/core/Zoom';
import './datepicker.css'; 
import './note.css';
import "react-datepicker/dist/react-datepicker.css"; // css import 
import "./createarea.css";
import DatePicker from "react-datepicker";


function CreateArea(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const [note, setNote] = useState({
        title: "",
        content: "",
        sets: "",
        reps: "",
        weight: "",
        date: "",
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
            date: "",
        });
        event.preventDefault();
    }

    return (
        <div>
            <form className='create-note'>
                {isExpanded && (
                    <input
                        className='Title'
                        name="title"
                        onChange={handleChange}
                        value={note.title}
                        placeholder="Title" />
                )}

                <div class="input-group">
                    <textarea
                        name="sets"
                        onClick={expand}
                        onChange={handleChange}
                        value={note.sets}
                        placeholder="Sets"
                        rows={isExpanded ? 1 : 1}
                    />
                    <div class="input-group-append">
                        <span class="input-group-text"> sets </span>
                    </div>
                </div>

                <div class="input-group">

                    <textarea
                        name="reps"
                        onClick={expand}
                        onChange={handleChange}
                        value={note.reps}
                        placeholder="Reps"
                        rows={isExpanded ? 1 : 1}
                    />

                    <div class="input-group-append">
                        <span class="input-group-text"> reps </span>
                    </div>
                </div>


                <div class="input-group">

                    <textarea
                        name="weight"
                        onClick={expand}
                        onChange={handleChange}
                        value={note.weight}
                        placeholder="Weight"
                        rows={isExpanded ? 1 : 1}
                    />
                    <div class="input-group-append">
                        <span class="input-group-text"> lb/kg </span>
                    </div>
                </div>

                <div style={{marginLeft:"100px", fontSize:"20px"}}>
                    <DatePicker showPopperArrow={false} selected={startDate} dateFormat="MM-dd-yyyy"onChange={(date) => setStartDate(date)} />
                </div>
                
                <Zoom in={isExpanded}>
                    <button className="btnSubmit"style={{width:"400px", textAlign: "center", margin:"20px"}}onClick={submitNote}>Submit</button>
                </Zoom>
            </form>
        </div>
    )
}

export default CreateArea;