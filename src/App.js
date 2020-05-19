import React, { useState, useEffect } from "react";

import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import noteService from "./services/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInput] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    async function getNotesFromServer() {
      let returnedNote = await noteService.getAll().catch((error) => {
        console.log("fail");
      });
      setNotes(returnedNote);
    }
    getNotesFromServer();
  }, []);

  const addNewNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: inputValue,
      date: new Date(),
      important: Math.random() > 0.5,
    };

    let returnedNote = await noteService.create(noteObject).catch((error) => {
      alert(`cannot create notes`);
    });
    //console.log(returnedNote);
    setNotes(notes.concat(returnedNote));

    setInput("");
  };
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const toggleImportanceOf = async (id) => {
    id = ++id;

    const note = notes.find((item) => item.id === id);
    console.log(note);

    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) =>
        setNotes(
          notes.map((note) => (note.id !== id ? note : (note = returnedNote)))
        )
      )
      .catch((error) => {
        console.log(
          `the note '${note.content}' was already deleted from server`
        );
        setNotes(notes.filter((n) => n.id !== id));
        // window.location.reload();
      });
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <NoteList
        notes={notes}
        toggleImportance={toggleImportanceOf}
        showAll={showAll}
      />
      <AddNote
        addNewNote={addNewNote}
        onInputChange={onInputChange}
        inputValue={inputValue}
      />
    </div>
  );
}

export default App;
