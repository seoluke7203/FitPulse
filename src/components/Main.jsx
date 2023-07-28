import React, { useState, useEffect } from 'react';
import Footer from "./partials/Footer";
import Header from "./partials/Header";
import "./main.css";
import CreateArea from './CreateArea';
import Note from './Note';
import axios from "axios"; 
import Swal from 'sweetalert2';

function Main(props) {

    const query = new URLSearchParams(window.location.search);
    const fName = query.get('fName') || "Guest";
    const lName = query.get('lName') || "";
    const email = query.get('email');
    const userE = query.get('email');
    const [notes, setNotes] = useState(props.foundNote || []);
    console.log(fName, lName);


    useEffect(() =>{
        fetch('/savedNote')
        .then(response => response.json())
        .then(data => {
            const emailList = data.map(item => item.email);
            console.log("Email:", emailList);
            console.log("User Email:", userE);
            const filteredNotes = data.filter(item => item.email === userE);
            setNotes(filteredNotes);
        })
        .catch(error =>{
            console.error('Error: ', error );
        });
    }, []);



    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id, db_id) {
        console.log("main: ", id, db_id);
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
        fetch(`/saveNote/${db_id}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            console.log('Note deleted successfully');
            // Update your notes state or perform any necessary actions
          } else {
            console.error('Failed to delete note');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    function handleDelete(noteId){
        console.log("Handle", noteId);
        
    }




    return (
        <div id="tmp">
            <Header />
            <div id="wrapper">
            <div className="content-wrapper">
                <CreateArea onAdd={addNote} email={email}/>
                {notes.map((noteItem, index) => {
                    return (
                        <Note
                            key={index}
                            id={index}
                            email={email}
                            title={noteItem.title}
                            content={noteItem.content}
                            sets={noteItem.sets}
                            reps={noteItem.reps}
                            weight={noteItem.weight}
                            date={noteItem.date || ""}
                            onDelete={() => deleteNote(index, noteItem._id)}
                        />
                    );
                })}
                </div>
                <Footer />
            </div>
        </div>
    )
}
export default Main;