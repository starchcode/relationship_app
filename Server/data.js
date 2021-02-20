const data = require('express').Router();
const sqlite3 = require('sqlite3');

let people, tags, relationship

data.get('/', (req, res, next)=> {
const db = new sqlite3.Database('./relation.db');
     db.serialize( ()=>{

             db.all('SELECT * FROM people', (err, rows)=> {
                 if(err){
                     next('error from getting people', err)
                 }  
                 people = rows;
             });
             db.all('SELECT * FROM tag', (err, rows)=> {
                 if(err){
                    next('error from getting tag', err)
                     return res.status(400).send(err);
                }  
                 tags = rows;
             });
             db.all('SELECT * FROM relationship', (err, rows)=> {
                if(err){
                    next('error from getting tag', err)
                     return res.status(400).send(err);
                }  
                 relationship = rows;

                 res.send({people: people, tags: tags, relationship: relationship}) //send everything in last function call to avoid async issues. this way there's no need to create promises
             });
          
       
    })


   
})

module.exports = data;