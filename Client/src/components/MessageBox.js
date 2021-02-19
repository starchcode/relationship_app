import { useEffect, useState } from "react";
let myTimeout;

const MessageBox = ({
  message,
  error,
  setError,
  selectPerson,
  selectTag,
  setMessage,
  relationshipTags,
  people,
  searchResult
}) => {
  const [searchText, setSearchText] = useState();

  const nameFinder = (firstPerson, tag, secondPerson) => {

    let result = [];
    result.length = 3;

    if (firstPerson) result[0] = people.find((tags) => tags.id == firstPerson);
    if (tag) result[1] = relationshipTags.find((person) => person.id == tag);
    if (secondPerson)
      result[2] = people.find((person) => person.id == secondPerson);

    return result;
  };

  useEffect(() => {
    const result = nameFinder(selectPerson[0], selectTag[0], selectPerson[1]);
    if (selectPerson.length) {
      let firstPerson = result[0];
      let rel = result[1];
      let secondPerson = result[2];
      let newMessage = `${firstPerson ? firstPerson.person : "..."} is ${
        rel ? rel.tag : "..."
      } of ${
        secondPerson ? secondPerson.person : "..."
      } ? ('Search' or 'Submit' when ready)`;
      setMessage(newMessage);
    } else {
      setMessage(undefined);
    }
  }, [selectPerson, selectTag]);

  useEffect(() => {


    const result = nameFinder(
      searchResult[0],
      searchResult[1],
      searchResult[searchResult.length - 1]
    );

    if (searchResult.length && error == false) {
      let text = `Closest relationship: ${result[0].person} is ${result[1].tag} of ${result[2].person}`;
      setSearchText(text);
      clearTimeout(myTimeout)
      myTimeout = setTimeout(() => {
        setError(undefined);
        setSearchText('search result will show here...')
      }, 5000)
    } else {
      if (error) setSearchText("There is no relationship between them!");
      clearTimeout(myTimeout)
      myTimeout = setTimeout(() => {
        setError(undefined);
        setSearchText('search result will show here...')
      }, 5000)

    }
  }, [searchResult, error]);

  return (
    <div className="flex messages">
      <div>{message}</div>
      <div className={`searchResult ` + `${error == true? 'error ': error == undefined ? '': 'success'}`}>{searchText}</div>
      {/* `${error==false?'success': ''}` */}
    </div>
  );
};

MessageBox.defaultProps = {
  message: "Go ahead and submit a relationship...",
};

export default MessageBox;
