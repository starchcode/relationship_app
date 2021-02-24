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
  
  const nameFinder = (list) => {
    let result = [];
    if (list && list.length > 1) {
      list.forEach((element, i) => {
        if (i % 2 == 1) {
          result[i] = relationshipTags.find((person) => person.id == element);
        } else {
          result[i] = people.find((tags) => tags.id == element);
        }
      });
    }
    return result;
  }

  const statementBuilder = (param) => {
    let result = nameFinder(param);
    let statement = '';
    if(result.length > 3 ){
      result.forEach((word, i) => {
        if(word.tag) return;
        if(result.length - 1 == i) return statement += word.person;
        if(word.person) statement += word.person + ' > ';
      });
    }else{
      result.forEach((word, i) => {
        if(word == undefined) return statement += ' ... ' ;

        if (i == 1) return statement += word.tag + ' of ';
        if (i == 2) return statement += word.person + '.';
        statement += word.person + ' is '
      });
    }
    return statement;
  };

  useEffect(() => {
    const result = statementBuilder([selectPerson[0], selectTag[0], selectPerson[1]]);
    if (selectPerson.length) {
      setMessage(result + '.?');
    } else {
      setMessage(undefined);
    }
  }, [selectPerson, selectTag]);

  useEffect(() => {
    const result = statementBuilder(searchResult);

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
