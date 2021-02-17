import { useEffect, useState } from "react";



const MessageBox = ({
  message,
  error,
  selectPerson,
  selectTag,
  setMessage,
  relationshipTags,
  people,
  searchResult
}) => {
const [searchText, setSearchText] = useState()

    const nameFinder = (firstPerson, tag, secondPerson) => {
        console.log('all data', firstPerson, tag, secondPerson)
        let result = [];
        result.length = 3;
        console.log('all length: ',result.length)
        if(firstPerson) result[0] = people.find((tags) => tags.id == firstPerson);
        if(tag) result[1] = relationshipTags.find((person) => person.id == tag);
        if(secondPerson) result[2] = people.find((person) => person.id == secondPerson);
        console.log(result)
        return result;
    }


  useEffect(() => {
      const result = nameFinder(selectPerson[0],selectTag[0], selectPerson[1]);
    if (selectPerson.length) {
    let firstPerson = result[0]
      let rel = result[1]
      let secondPerson = result[2] 
      let newMessage = `${firstPerson ? firstPerson.person : "..."} is ${
        rel ? rel.tag : "..."
      } of ${secondPerson ? secondPerson.person : "..."} ? (press search when ready)`;
      setMessage(newMessage);


    } else {
      setMessage(undefined);
    }

  }, [selectPerson, selectTag]);

  useEffect(() => {
      const result = nameFinder(searchResult[0], searchResult[1], searchResult[searchResult.length-1])
      console.log('current search result: ', result)
      if(searchResult.length){
        let text = `Closest relationship: ${result[0].person} is ${result[1].tag} of ${result[2].person}`  
        setSearchText(text)
      }else{
        setSearchText('No relationship between them found!')
      }

  }, [searchResult])

  return <div className="flex messages">
      <div>{message}</div>
      <div className={`searchResult`}>{searchText || 'search result will show here...'}</div>
      </div>;
};

MessageBox.defaultProps = {
  message: "Go ahead and submit your data...",
};

export default MessageBox;
