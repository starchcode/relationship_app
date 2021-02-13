import { useState, useEffect } from "react";
import "./app.css";

import Input from "./Input";

const people = [
  {
    id: 1,
    name: "Dave",
  },
  {
    id: 2,
    name: "John",
  },
  {
    id: 3,
    name: "Brad",
  },
  {
    id: 4,
    name: "Zack",
  },
];
const relationshipTags = [
  {
    id: 1,
    tag: "brother",
  },
  {
    id: 2,
    tag: "father",
  },
  {
    id: 3,
    tag: "sister",
  },
  {
    id: 4,
    tag: "cousin",
  },
];

const App = () => {

  const [selectPerson, setSelectPerson] = useState([]);
  const [selectTag, setSelectTag] = useState([]);

  const renderedPeople = people.map(({ name, id }) => {
    const selected = selectPerson.find(personId => personId == id)
    return (
      <div>
        <button key={id} identity={id} button-type='person' className={`btn item ${selected? 'selected': ''}`}>{name}</button>
      </div>
    );
  });

  const renderedRelationshipTags = relationshipTags.map(({ tag, id }) => {
    const selected = selectTag.find(tagId => tagId == id)

    return (
      <div>
        <button key={id} identity={id} button-type='tag' className={`btn item ${selected? 'selected': ''}`}>{tag}</button>
      </div>
    );
  });

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
}, [])

  return (
    <div>
      <h1>Relationship App</h1>
      <p>1. Select two people and a tag to submit a relationship.</p>
      <p>
        2. Select two people and press Lookup to see if there is any
        relationship between them.
      </p>

      <main className="flex" onClick={relHandler}>
        <div className="flex wrap allItems">{renderedPeople}</div>
        <div className="midLine"></div>
        <div className="flex wrap allItems">{renderedRelationshipTags}</div>
      </main>

      <Input />
    </div>
  );
};

export default App;
