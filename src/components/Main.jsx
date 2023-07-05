import React, { useState, useEffect } from 'react';
import Footer from "./partials/Footer";
import Header from "./partials/Header";
import "./main.css";
import CreateArea from './CreateArea';
import Note from './Note';

function Main() {

    // const [fName, setfName] = useState("");


    const query = new URLSearchParams(window.location.search);
    const fName = query.get('fName') || "Guest";
    const lName = query.get('lName') || "";
    const email = query.get('email');
    console.log(fName, lName);

    const [notes, setNotes] = useState([]);

    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }

    return (

        <div id="tmp">
            {/* Welcome, {fName} {lName}!! */}
            <Header />
            <div id="wrapper">

            <div className="content-wrapper">
                <CreateArea onAdd={addNote} />
                {notes.map((noteItem, index) => {
                    return (
                        <Note
                            key={index}
                            id={index}
                            title={noteItem.title}
                            content={noteItem.content}
                            sets={noteItem.sets}
                            reps={noteItem.reps}
                            weight={noteItem.weight}
                            date={noteItem.date}
                            onDelete={deleteNote}
                        />
                    );
                })}


                    {/* <h2>Welcome, {fName}!</h2> */}
                    {/* <form method="POST">
                    <input type="hidden" name="id" value={email}></input>

                    <div class="d-flex justify-content-center align-items-center card-body">
                        <button type="submit" id="btn-register"
                            class="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-30">Save</button>
                    </div>
                </form> */}



                </div>
                <Footer />
            </div>
        </div>
    )
}
export default Main;