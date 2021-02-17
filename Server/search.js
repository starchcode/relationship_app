const DbReset = require("./modules and classes/DbReset");

const search = require("express").Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./relation.db");
const RelationshipFinder = require("./modules and classes/RelationshipFinder");

search.get("/", (req, res) => {
    if(!req.query.firstPerson || !req.query.secondPerson) return res.status(403).send({message: 'Not enough data to compare'})
  console.log("here is your request query: ", req.query);
  let allData;
  db.all("SELECT * FROM relationship", function (err, rows) {
    if (err) {
      console.log("error while getting relationship table", err);
      res.status(403).send({ message: err.code });
    }
    // console.log('rows retrieved from relationship table: ',rows)

    allData = rows.map(({ people_id, relationship_id, tag_id }) => {
      return [people_id, tag_id, relationship_id];
    });
    console.log("Matrix of data", allData);
    // console.log('type of array', typeof allData);
    // search for data USE

    let rel = new RelationshipFinder(
      allData,
      req.query.firstPerson,
      req.query.secondPerson
    );
    try{
        rel.search();
        const shortestResult = rel.shortestRelationship();
    
        res.send({shortestResult});
    }catch(e){
        console.log('error while searching', e)
    }


  });

});

module.exports = search;
