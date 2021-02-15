const add = require('express').Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./relation.db');

add.post('/', (req, res)=> {
    const table = req.body.table;
    const column = req.body.table == 'people'? 'person': 'tag'; //people or tag column
    //  const relationshipColumn 

    db.run(`INSERT INTO ${table} (${column}) VALUES($person)`, 
    {
        $person: req.body.newData
    }, function(err){
        if(err) {
            console.log(err);

            return res.status(403).send({
                message: err.code
            });


        }
        db.get(`SELECT * FROM ${table} WHERE id=$id`,{
            $id:this.lastID
        }, function (err, row){
            if(err){
                console.log(err)
                return res.status(403).send({
                    message: err
                });
            }
            console.log('inserted row is: ', row);
            res.send(row);
        })
    })
})

module.exports = add;