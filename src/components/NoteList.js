import React from "react";

function NoteList({ notes, toggleImportance, showAll }) {
  //console.log(notes);

  return (
    <ul>
      {showAll
        ? notes.map((item, index) => (
            <li className="note" key={index}>
              {item.content}{" "}
              <button onClick={() => toggleImportance(index)}>
                {item.important ? "make not important" : "make important"}
              </button>
            </li>
          ))
        : notes
            .filter((item) => item.important === true)
            .map((item, index) => (
              <li className="note" key={index}>
                {item.content}{" "}
                <button onClick={() => toggleImportance(index)}>
                  {item.important ? "make not important" : "make important"}
                </button>
              </li>
            ))}
    </ul>
  );
}

export default NoteList;
