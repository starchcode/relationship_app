import { useState } from "react";
import "./app.css";

import Input from './Input'

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
  const renderedPeople = people.map(({ name }) => {
    return (
      <div>
        <button className="btn item">{name}</button>
      </div>
    );
  });

  const renderedRelationshipTags = relationshipTags.map(({ tag }) => {
    return (
      <div>
        <button className="btn item">{tag}</button>
      </div>
    );
  });
  return (
    <div>

      <h1>Relationship App</h1>
      <main className='flex'>
        <div className='flex wrap allItems'>{renderedPeople}</div>
        <div className="midLine"></div>
        <div className='flex wrap allItems'>{renderedRelationshipTags}</div>
      </main>

    <Input />
    </div>
  );
};

export default App;
