import { useEffect } from "react";

const MessageBox = ({
  message,
  error,
  selectPerson,
  selectTag,
  setMessage,
  relationshipTags,
  people,
}) => {
  useEffect(() => {



    if (selectPerson.length) {
      let rel = relationshipTags.find((tags) => tags.id == selectTag[0]);
      let firstPerson = people.find((person) => person.id == selectPerson[0]);
      let secondPerson = people.find((person) => person.id == selectPerson[1]);
      let newMessage = `${firstPerson ? firstPerson.person : "..."} is ${
        rel ? rel.tag : "..."
      } of ${secondPerson ? secondPerson.person : "..."} ? (press search when ready)`;
      setMessage(newMessage);


    } else {
      setMessage(undefined);
    }

  }, [selectPerson, selectTag]);

  return <div className="flex">{message}</div>;
};

MessageBox.defaultProps = {
  message: "Go ahead and submit your data...",
};

export default MessageBox;
