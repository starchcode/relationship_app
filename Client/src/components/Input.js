import "./input.css";
import { useState } from "react";

const Input = ({
  insertData,
  tagToEdit,
  selectTag,
  setTagToEdit,
  editData,
  dbQuery
}) => {
  const [newPerson, setNewPerson] = useState("");
  const [newTag, setNewTag] = useState("");

  //Insert Data
  const newItem = (e) => {
    if (e.target.nodeName !== "BUTTON") return; //Do nothing if not a button
    let buttonType = e.target.getAttribute("button-type");

    if (buttonType == "newPerson") {
      console.log(buttonType);
      if (!/\S/.test(newPerson)) return;
      insertData(newPerson.trim(), "people");
      setNewPerson("");
    }

    if (buttonType == "newTag") {
      console.log(buttonType);
      if (!/\S/.test(newTag)) return;
      insertData(newTag.trim(), "tag");
      setNewTag("");
    }

    if (buttonType == "editTag" && selectTag.length) {
      console.log(buttonType);
      if (!/\S/.test(tagToEdit)) return;
      editData(tagToEdit.trim(), "tag");
      // setNewTag('');
    }
  };

  const dbQueryHandler = (e) => {
    if (e.target.nodeName !== "BUTTON") return; //Do nothing if not a button
    let buttonType = e.target.getAttribute("button-type");

    if (buttonType == "submitRel") {
      console.log(buttonType, " clicked!");
    }
    if (buttonType == "search") {
      console.log(buttonType, " clicked!");
    }
    if (buttonType == "reset_db") {
      console.log(buttonType, " clicked!");
      dbQuery(buttonType);
    }
  };

  return (
    <div>
      <div className="flex centralize" onClick={(e) => dbQueryHandler(e)}>
        <button className="btn center" button-type="submitRel">
          Submit a Relationship
        </button>
        <button className="btn center" button-type="search">
          Search
        </button>
        <button className="btn center" button-type="reset_db">
          RESET DATABASE
        </button>
      </div>

      <div className="inputComponent flex" onClick={(e) => newItem(e)}>
        <div className="inputnbtn">
          <input
            type="text "
            className="input"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
          />
          <button className="btn" button-type="newPerson">
            Add Person
          </button>
        </div>

        <div className="tagInputs">
          <div className="inputnbtn">
            <input
              type="text"
              className="input"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button className="btn" button-type="newTag">
              Add Tag
            </button>
          </div>

          <div className="inputnbtn">
            <input
              type="text"
              className="input"
              placeholder="Choose a tag first"
              value={selectTag.length ? tagToEdit : ""}
              onChange={(e) =>
                selectTag.length ? setTagToEdit(e.target.value) : null
              }
            />
            <button className="btn" button-type="editTag">
              Edit Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
