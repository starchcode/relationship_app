const Main = ({people, relationshipTags, loaded, selectHandler, selectPerson, selectTag}) => {

  const renderedPeople = people.map(({ person, id }) => {

    const selected = selectPerson.find( personId => personId == id);
    return (
      <div>
        <button
          key={id}
          identity={id}
          button-type="person"
          className={`btn item ${selected ? "selected" : ""}`}
        >
          {person}
        </button>
      </div>
    );
  });

  const renderedRelationshipTags = relationshipTags.map(({ tag, id }) => {
    const selected = selectTag.find(tagId => tagId == id);

    return (
      <div>
        <button
          key={id}
          identity={id}
          button-type="tag"
          className={`btn item ${selected ? "selected" : ""}`}
        >
          {tag}
        </button>
      </div>
    );
  });

  return (
    <main className="flex" onClick={e => selectHandler(e)}>
      <div className="flex wrap allItems">
        {loaded ? renderedPeople : "loading..."}
      </div>
      <div className="midLine"></div>
      <div className="flex wrap allItems">
        {loaded ? renderedRelationshipTags : "loading..."}
      </div>
    </main>
  );
};

export default Main;
