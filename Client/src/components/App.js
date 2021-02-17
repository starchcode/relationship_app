import { useState, useEffect } from "react";
import "./app.css";

import Input from "./Input";
import Server from "./Server";
import Main from "./Main";


const App = () => {
  const [people, setPeople] = useState([])
  const [relationshipTags, setRelationshipTags] = useState([]);
  const [selectPerson, setSelectPerson] = useState([]);
  const [selectTag, setSelectTag] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tagToEdit, setTagToEdit] = useState('')

//Select people and tags
  const selectHandler = (e) => {
    let target = e.target.getAttribute("button-type");
    let id = e.target.getAttribute("identity");


    if(e.target.parentNode.nodeName === 'MAIN' ){ //unselect
      setSelectTag([]) 
      setTagToEdit('')
    } 
    if (e.target.nodeName !== "BUTTON") return; //Do nothing if not a button

    if (target === "person") {
      if (selectPerson.find((person) => person == id)) {
        return null;
      }
      if (selectPerson.length > 1) {
        setSelectPerson(selectPerson.shift());
      }
      setSelectPerson(selectPerson.concat(id));
    }

    if (target === "tag") {
      setTagToEdit(e.target.innerText);
      if (selectTag.find((tag) => tag == id)) {
        return null;
      }
      if (selectTag.length > 0) {
        setSelectTag(selectTag.shift());
      }
      setSelectTag(selectTag.concat(id));
    }
  };

//Fetch Data
const data = async () => {
  await Server.get("/data").then((res) => {
    // console.log(res.data.people)
    setPeople(res.data.people); 
    setRelationshipTags(res.data.tags); 
    setLoaded(true);
    // console.log('loaded', people, relationshipTags);
  });
};

  useEffect(() => {
    data();
  }, []);

const insertData = async (newData, table)=> {

  const request = await Server.post('/add',
  {
    newData: newData,
    table: table
  }).then(res=> {
    if(res.status < 400){
      if(res.data.person == newData){
        console.log('new data ', newData, ' added to table ', table);
      }else if(res.data.tag == newData){
        console.log('new data ', newData, ' added to table ', table);
      }
      data();
    }
  }).catch(e => {
    console.log(e.response.data.message);
  })
}

const editData = async (newData, table) => {
  const request = await Server.put('/edit/' + selectTag, {
    newData: tagToEdit,
    table: table
  }).then(res => {
    console.log(res.status)
      setSelectTag([])
      setTagToEdit('')
      data();

  }).catch(e=> {
    console.log(e.response.data.message)
  })
}

const dbQuery = async (buttonType) => {
  console.log('requested query: ', buttonType)
  const request = await Server.get('/reset')
  .then(res => {
    if(res.status === 200){
      console.log('db reset done!', res.status)
      data();
    }
  })
}

  return (
    <div>
      <h1>Relationship App</h1>
      <p>1. Select two people and a tag to submit a relationship.</p>
      <p>
        2. Select two people and press Lookup to see if there is any
        relationship between them.
      </p>

       <Main
        people={people}
        relationshipTags={relationshipTags}
        selectHandler={selectHandler}
        selectPerson={selectPerson}
        selectTag={selectTag}
        loaded={loaded}
      />
      <Input
      insertData={insertData}
      tagToEdit={tagToEdit}
      selectTag={selectTag}
      setTagToEdit={setTagToEdit}
      editData={editData}
      dbQuery={dbQuery}
      />
    </div>
  );
};

export default App;
