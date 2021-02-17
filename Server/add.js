const add = require("express").Router();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./relation.db");

add.post("/newdata/relationship", (req, res) => {
  const newData = req.body;
  const table = 'relationship';
    // console.log(newData)

  db.run(
    `INSERT INTO ${table} (people_id, relationship_id, tag_id) VALUES($person1, $person2, $relationshipTag)`,
    {
      $person1: newData.person1,
      $person2: newData.person2,
      $relationshipTag: newData.relationshipTag,
    },
    function (err) {
      if (err) {
        console.log('error while inserting into relationship table',err);
        return res.status(403).send({
          message: err.code,
        });
      }
      console.log(this)
      db.get(
        `SELECT * FROM ${table} WHERE id=$id`,
        {
          $id: this.lastID,
        },
        function (err, row) {
          if (err) {
            console.log(err);
            return res.status(403).send({
              message: err,
            });
          }
          console.log("inserted row is: ", row);
          res.send(row);
        }
      );
    }
  );
});

add.post("/newdata/peopleandtags/:type", (req, res) => {
  const table = req.params.type;
  const column = table == "people" ? "person" : "tag"; //people or tag column

  db.run(
    `INSERT INTO ${table} (${column}) VALUES($person)`,
    {
      $person: req.body.newData,
    },
    function (err) {
      if (err) {
        console.log(err);

        return res.status(403).send({
          message: err.code,
        });
      }

      db.get(
        `SELECT * FROM ${table} WHERE id=$id`,
        {
          $id: this.lastID,
        },
        function (err, row) {
          if (err) {
            console.log(err);
            return res.status(403).send({
              message: err,
            });
          }
          console.log("inserted row is: ", row);
          res.send(row);
        }
      );
    }
  );
});

module.exports = add;
