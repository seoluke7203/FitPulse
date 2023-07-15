import React, { useState, useEffect } from 'react';
import Footer from "./partials/Footer";
import Header from "./partials/Header";
import "./main.css";
import CreateArea from './CreateArea';
import Note from './Note';
import axios from 'axios';


function Main(props) {

    // const [fName, setfName] = useState("");
    const { user } = props;


    const query = new URLSearchParams(window.location.search);
    const fName = query.get('fName') || "Guest";
    const lName = query.get('lName') || "";
    const [email, setEmail] = useState(query.get('email'));
    console.log(fName, lName);
    console.log("Main - Email", email);
    const [notes, setNotes] = useState([]);
    const userEmail = query.get("email");



    // function addNote(newNote) {
    //     setNotes(prevNotes => {
    //         return [...prevNotes, newNote];
    //     });
    // }
    // useEffect(() => {
    //     fetchNotes();
    // }, []); 

    // function fetchNotes() {
    //     Note.find({ title: '123' })
    //     .then((notes) => {
    //       console.log('Fetched notes:', notes);
    //     })
    //     .catch((error) => {
    //       console.error('Failed to fetch notes', error);
    //     });
    // }


    //TODO - Fetch data???????

    useEffect(() => {
        // Fetch the data from the server
        axios.get('/api/notes')
            .then(response => {
                // Update the state with the fetched data
                setNotes(response.data);
            })
            .catch(error => {
                // Handle any errors
                console.error('Failed to fetch notes:', error);
            });
    }, []);



    function addNote(newNote) {
        // Send a POST request to the server to save the note
        axios.post('/api/notes', newNote)
            .then(response => {
                console.log("Note saved successfully", response.data);
                // Add the saved note to the local state
                setNotes(prevNotes => [...prevNotes, response.data]);
            })
            .catch(error => {
                console.log("Failed to save note", error);
                // Handle the error appropriately
            });
    }


    function deleteNote(id) {
        // Get the note to be deleted
        const noteToDelete = notes[id];

        // Send a DELETE request to the server to delete the note
        axios.delete(`/api/notes/${noteToDelete.id}`)
            .then(response => {
                console.log("Note deleted successfully", response.data);
                // Remove the deleted note from the local state
                setNotes(prevNotes => prevNotes.filter((note, index) => index !== id));
            })
            .catch(error => {
                console.log("Failed to delete note", error);
                // Handle the error appropriately
            });
    }


    // function deleteNote(id) {
    //     setNotes(prevNotes => {
    //         return prevNotes.filter((noteItem, index) => {
    //             return index !== id;
    //         });
    //     });
    // }

    return (

        <div id="tmp">
            <Header />
            {/* <h1>Welcome, {user.fName} </h1> */}
            <div id="wrapper">
                <div className="content-wrapper">
                    <CreateArea onAdd={addNote} email={email} />
                    {Array.isArray(notes) ? (
                        notes.map((noteItem) => (
                            <Note
                                key={noteItem._id}
                                id={noteItem._id}
                                userId={email}
                                email={email}
                                title={noteItem.title}
                                content={noteItem.content}
                                sets={noteItem.sets}
                                reps={noteItem.reps}
                                weight={noteItem.weight}
                                date={noteItem.date || ""}
                                onDelete={deleteNote}
                            />
                        ))
                    ) : (
                        <p>No notes available</p>
                    )}
                    {/* {notes.map((noteItem, index) => {
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
                                onDelete={deleteNote}
                            />
                        );
                    })} */}


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