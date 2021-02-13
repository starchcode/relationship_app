const Main = ({selectPerson, relationshipTags, loaded, relHandler}) => {
  const renderedPeople = selectPerson.map(({ people, id }) => {
    const selected = selectPerson.find((personId) => personId == id);
    return (
      <div>
        <button
          key={id}
          identity={id}
          button-type="person"
          className={`btn item ${selected ? "selected" : ""}`}
        >
          {people}
        </button>
      </div>
    );
  });

  const renderedRelationshipTags = relationshipTags.map(({ tag, id }) => {
    const selected = relationshipTags.find((tagId) => tagId == id);

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
    <main className="flex" onClick={relHandler}>
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
