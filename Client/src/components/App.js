import { useState, useEffect } from "react";
import "./app.css";

import Input from "./Input";
import Server from "./Server";
import Main from "./Main";
import MessageBox from "./MessageBox";
import DbStatus from "./DbStatus";

const App = () => {
  const [people, setPeople] = useState([]);
  const [relationshipTags, setRelationshipTags] = useState([]);
  const [selectPerson, setSelectPerson] = useState([]);
  const [selectTag, setSelectTag] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tagToEdit, setTagToEdit] = useState("");
  const [message, setMessage] = useState();
  const [error, setError] = useState(undefined);
  const [searchResult, setSearchResult] = useState([]);
  const [dbMessage, setDbMessage] = useState("status");
  const [dbError, setDbError] = useState(undefined);

  //Select people and tags
  const selectHandler = (e) => {
    let target = e.target.getAttribute("button-type");
    let id = e.target.getAttribute("identity");

    if (e.target.parentNode.nodeName === "MAIN") {
      //unselect
      setSelectTag([]);
      setSelectPerson([]);
      setTagToEdit("");
    }
    if (e.target.nodeName !== "BUTTON") return; //Do nothing if not a button

    if (target === "person") {
      if (selectPerson.find((person) => person == id)) {
        //unselect
        const removeIndex = selectPerson.findIndex((person) => person != id);
        if (removeIndex == -1) {
          return setSelectPerson([]);
        }
        return setSelectPerson([...selectPerson[removeIndex]]);
      }
      if (selectPerson.length > 1) {
        setSelectPerson(selectPerson.shift());
      }
      setSelectPerson(selectPerson.concat(id));
    }

    if (target === "tag") {
      if (selectTag.find((tag) => tag == id)) {
        //unselect
        const removeIndex = selectTag.findIndex((tag) => tag != id);
        if (removeIndex == -1) {
          return setSelectTag([]);
        }
      }

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
      setPeople(res.data.people);
      setRelationshipTags(res.data.tags);
      setLoaded(true);
    });
  };

  useEffect(() => {
    data();
  }, []);

  const insertData = async (newData, table) => {
    if (
      table == "relationship" &&
      selectPerson.length == 2 &&
      selectTag.length == 1
    ) {
      //submit relationship
      const request = await Server.post(`/add/newdata/${table}`, {
        person1: selectPerson[0],
        relationshipTag: selectTag.toString(),
        person2: selectPerson[1],
      })
        .then((res) => {
          if (res.status < 400) {
            setDbError(false);
            setDbMessage("Relationship submitted!");
          }
        })
        .catch((e) => {
          setDbError(true);
          if (e.response.data.message == "SQLITE_CONSTRAINT") {
            setDbMessage("This relationship was submitted before");
          } else {
            setDbMessage("Unknown error, see console!");
            console.log(e.response.data.message);
          }
        });
    } else if (table == "people" || table == "tag") {
      const request = await Server.post(`/add/newdata/peopleandtags/${table}`, {
        newData: newData,
      })
        .then((res) => {
          if (res.data.person == newData) {
            setDbMessage(
              "Success!: " + 'New person "' + res.data.person + '" added!'
            );
          } else if (res.data.tag == newData) {
            setDbMessage(
              "Success!: " + 'New tag "' + res.data.tag + '" added!'
            );
          }
          setDbError(false);
          data();
        })
        .catch((e) => {
          setDbMessage(
            "error while inserting data " +
              e.response.data.message +
              " make sure to not insert the same data!"
          );
          setDbError(true);
        });
    }
  };

  const editData = async (newData, table) => {
    const request = await Server.put("/edit/" + selectTag, {
      newData: newData,
      table: table,
    })
      .then((res) => {
        setSelectTag([]);
        setTagToEdit("");
        setDbMessage("Success: tag edited successfuly!");
        setDbError(false);
        data();
      })
      .catch((e) => {
        setDbError(true);
        if (e.response.data.message === "SQLITE_CONSTRAINT") {
          setDbMessage(
            "This tag already exists! Change it to a different name!"
          );
        } else {
          setDbMessage("Unknown error!");
        }
      });
  };

  const dbQuery = async (buttonType) => {
    if (buttonType == "reset_db") {
      const request = await Server.get("/reset")
        .then((res) => {
          if (res.status < 400) {
            setDbError(false);
            setDbMessage("Database reset successfully!");
          }
        })
        .then(data())
        .catch((e) => {
          setDbError(true);
          setDbMessage("error while resetting database: see console!");
          console.log(e.response);
        });
    }

    if (buttonType == "search") {
      const params = {
        firstPerson: selectPerson[0],
        secondPerson: selectPerson[1],
      };
      const request = await Server.get("/search", {
        params: params,
      }).then((res) => {
        if (res.status < 400) {
          //receiving search result
          setSearchResult(res.data.shortestResult);
          if (res.data.shortestResult.length < 1) {
            setError(true);
          } else {
            setError(false);
          }
        }
      });
    }
  };

  return (
    <div>
      <h1>Relationship App</h1>
      <p>1. Select two people and a tag then pres 'Submit a Relationship' to relationship between people.</p>
      <p>
        2. Select two people and press 'Search' to see if there is any
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
      <MessageBox
        message={message}
        setMessage={setMessage}
        error={error}
        setError={setError}
        selectPerson={selectPerson}
        selectTag={selectTag}
        people={people}
        relationshipTags={relationshipTags}
        searchResult={searchResult}
      />
      <DbStatus
        dbMessage={dbMessage}
        dbError={dbError}
        setDbError={setDbError}
        setDbMessage={setDbMessage}
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
