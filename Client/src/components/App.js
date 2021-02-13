import { useState, useEffect } from "react";
import "./app.css";

import Input from "./Input";
import Server from './Server';
import Main from './Main';

let people= [];
let relationshipTags = [];

const App = () => {

  const [selectPerson, setSelectPerson] = useState([]);
  const [selectTag, setSelectTag] = useState([]);
  const [loaded, setLoaded] = useState(false);

 const relHandler = (e) => {
  let target = e.target.getAttribute('button-type');
  let id = e.target.getAttribute('identity');

  if (e.target.nodeName !== 'BUTTON') return; //Do nothing if not a button

  if(target === 'person'){
    if(selectPerson.find(person => person == id)){
      return null;
    }
    if(selectPerson.length > 1){
      setSelectPerson(selectPerson.shift());
    }
    setSelectPerson(selectPerson.concat(id));
  }

  if(target === 'tag'){
    if(selectTag.find(person => person == id)){
      return null;
    }
    if(selectTag.length > 0){
      setSelectTag(selectTag.shift());
    }
    setSelectTag(selectTag.concat(id));
  }

  }

useEffect(()=> {
  console.log('loaded')



  const data = async () =>{
await Server.get("/data").then( res =>{
  setSelectTag(selectTag.concat(res.data.tags))
  setSelectPerson(selectPerson.concat(res.data.people))
  setLoaded(true);
  console.log(selectPerson)
})
  }
  data();
}, [])

  return (
    <div>
      <h1>Relationship App</h1>
      <p>1. Select two people and a tag to submit a relationship.</p>
      <p>
        2. Select two people and press Lookup to see if there is any
        relationship between them.
      </p>

      <Main selectPerson={selectPerson} relationshipTags={relationshipTags} relHandler={relHandler} loaded={loaded} />

      <Input />
    </div>
  );
};

export default App;
