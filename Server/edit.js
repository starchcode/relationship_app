const edit = require("express").Router();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./relation.db");

edit.put("/:id", (req, res) => {
  const table = req.body.table;
  const newData = req.body.newData;
  const targetId = req.params.id;

  console.log(req.body);
  console.log("Requested to edit this tag: ", targetId);

//   let data = [targetId, newData];
  let data = {$newData: newData, $targetId:targetId}
  let sql = `UPDATE ${table}
            SET tag = $newData
            WHERE id = $targetId`;

  db.run(sql, data, function (err) {
    if (err) {
      console.log("error while updating: ", err);
      return res.status(403).send({ message: err.code });
    }

    if(this.changes > 0){
        const successMessage = `row number ${targetId} updated!`
        console.log("\x1b[32m",successMessage)
        return res.send({ message: successMessage });
    }

  });
});
module.exports = edit;
