import "./input.css";

const Input = () => {
  return (
    <div>
     
      <button className="btn center">Submit a Relationship</button>

      <div className="inputComponent flex">
        <div className="inputnbtn">
          <input type="text " className="input" />
          <button className="btn">Add Person</button>
        </div>
        <div className="tagInputs">
          <div className="inputnbtn">
            <input type="text" className="input" />
            <button className="btn">Add Tag</button>
          </div>
          <div className="inputnbtn">
            <input
              type="text"
              className="input"
              placeholder="Choose a tag..."
            />
            <button className="btn">Edit Tag</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
