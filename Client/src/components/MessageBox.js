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
  searchResult,
}) => {
  const [searchText, setSearchText] = useState();
  const nameFinder = (param) => {
    // console.log("results received", param);
    let result = [];
    let statement = '';
    if (param && param.length > 1) {
      param.forEach((element, i) => {
        if (i % 2 == 1) {
          console.log(element);
          result[i] = relationshipTags.find((person) => person.id == element);
        } else {
          result[i] = people.find((tags) => tags.id == element);
        }
      });
    }
    if(result.length > 3 ){
      result.forEach((word, i) => {
        if(word.tag) return;
        if(result.length - 1 == i) return statement += word.person;
        if(word.person) statement += word.person + ' > ';
      });
    }else{
      result.forEach((word, i) => {
        if (i == 1) return statement += word.tag + ' of ';
        if (i == 2) return statement += word.person + '.';
        statement += word.person + ' is '
      });
    }

    return statement;
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

    const result = nameFinder(searchResult);
    console.log("all results: ", result);
    if (searchResult.length && error == false) {
      let text = result;
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
      <div
        className={
          `searchResult ` +
          `${error == true ? "error " : error == undefined ? "" : "success"}`
        }
      >
        {searchText}
      </div>
      {/* `${error==false?'success': ''}` */}
    </div>
  );
};

MessageBox.defaultProps = {
  message: "Go ahead and submit a relationship...",
};

export default MessageBox;
