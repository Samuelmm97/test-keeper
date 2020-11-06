import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  //set starting state of expanded as false
  const [isExpanded, setExpanded] = useState(false);

  //set state of note as an object with a title and content
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  //whenever the user changes the text in the input
  function handleChange(event) {
    //deconstructing object into individual components
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value //take the value of the changed input and return it with previous notes
      };
    });
  }

  //when the user submits the note 
  function submitNote(event) {
    //function from App.jsx
    props.onAdd(note);
    //after the user finished adding the note reset the text to empty
    setNote({
      title: "",
      content: ""
    });
    //prevent the form from redirecting
    event.preventDefault();
  }

  //when the user clicks set expand to true.
  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Make a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
