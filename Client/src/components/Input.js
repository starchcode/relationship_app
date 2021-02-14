import "./input.css";

const Input = ({ insertData }) => {


//Insert Data
const newItem = (e) => {
  if (e.target.nodeName !== "BUTTON") return; //Do nothing if not a button
  console.log(e.target.getAttribute('button-type'));
  insertData('Hamed', 'people');
  
}

  return (
    <div>

      <button className="btn center">Submit a Relationship</button>
      <button className="btn center">Search</button>

      <div className="inputComponent flex" onClick={e => newItem(e)}>
        <div className="inputnbtn">
          <input type="text " className="input" />
          <button className="btn" button-type='newPerson'>Add Person</button>
        </div>
        <div className="tagInputs">
          <div className="inputnbtn">
            <input type="text" className="input" />
            <button className="btn" button-type='newTag'>Add Tag</button>
          </div>
          <div className="inputnbtn">
            <input
              type="text"
              className="input"
              placeholder="Choose a tag..."
            />
            <button className="btn" button-type='editTag'>Edit Tag</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
