const fs = require('fs');


function DbReset() {
    fs.copyFile('./db_backup/relation.db', './relation.db', (err) => {
        if (err) throw err;
        console.log('dB reset!');
      });
    // fs.copyFile('./db_backup/relation_project.sqbpro', './relation_project.sqbpro', (err) => {
    //     if (err) throw err;
    //     console.log('dB reset!');
    //   });

}

module.exports = DbReset;