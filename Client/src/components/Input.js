import "./input.css";
import { useState } from "react";

const Input = ({ insertData, tagToEdit, selectTag, setTagToEdit }) => {

  const [newPerson, setNewPerson] = useState('');
  const [newTag, setNewTag] = useState('');

//Insert Data
const newItem = (e) => {
  if (e.target.nodeName !== "BUTTON") return; //Do nothing if not a button
  let buttonType = e.target.getAttribute('button-type');

  if(buttonType == 'newPerson'){
    console.log(buttonType);
    if(!/\S/.test(newPerson)) return;
    insertData(newPerson.trim(), 'people');
    setNewPerson('');
  }
  
  if(buttonType == 'newTag'){
    console.log(buttonType);
    if(!/\S/.test(newTag)) return;
    insertData(newTag.trim(), 'tag');
    setNewTag('');
  }
  
}

  return (
    <div>

      <div className='flex centralize'>
      <button className="btn center">Submit a Relationship</button>
      <button className="btn center">Search</button>
      <button className="btn center">RESET DATABASE</button>
      </div>

      <div className="inputComponent flex" onClick={e => newItem(e)}>
        <div className="inputnbtn">
          <input type="text " className="input" value={newPerson} onChange={e=> setNewPerson(e.target.value)} />
          <button className="btn" button-type='newPerson'>Add Person</button>
        </div>
        <div className="tagInputs">
          <div className="inputnbtn">
            <input 
            type="text" 
            className="input" 
            value={newTag} 
            onChange={e => setNewTag(e.target.value)}/>
            <button className="btn" button-type='newTag'>Add Tag</button>
          </div>
          <div className="inputnbtn">
            <input
              type="text"
              className="input"
              placeholder="Choose a tag first"
              value={selectTag.length ? tagToEdit: ''}
              onChange={e => selectTag.length? setTagToEdit(e.target.value): null}
            />
            <button className="btn" button-type='editTag' >Edit Tag</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
