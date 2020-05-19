import React from "react";

function AddNote({ addNewNote, onInputChange, inputValue }) {
  return (
    <form onSubmit={addNewNote}>
      <input onChange={onInputChange} value={inputValue} type="text" />
      <button type="submit" value="Submit">
        save
      </button>
    </form>
  );
}

export default AddNote;
