class GenericController {
  async listFilesx(req, res) {
    var fs = require("fs");
    var path = require("path");

    var directoryName = '../mobile';
    var myFiles = [];

      fs.readdir(directoryName, function (e, files) {
        if (e) {
          console.log("Error: ", e);
          res.json({files: JSON.stringify(myFiles)});
        }
        files.forEach(function (file) {
          var fullPath = path.join(directoryName, file);
          fs.stat(fullPath, function (e, f) {
            if (e) {
              console.log("Error: ", e);
              res.json({files: JSON.stringify(myFiles)});
            }
            if (f.isDirectory()) {
              walk(fullPath);
            } else {
              console.log("- " + fullPath);
              myFiles.push(fullPath);
            }
          });
        });
      });
      console.log('enviou');
      res.json({files: JSON.stringify(myFiles)});
  }

  async listFiles(req, res) {
   const {  promises: fs } = require("fs");
    const path = require("path");

    async function walk(dir) {
      const entries = await fs.readdir(dir);
      let ret = [];
      for (const entry of entries) {
          const fullpath = path.resolve(dir, entry);
          const info = await fs.stat(fullpath);
          if (info.isDirectory()) {
              ret = [...ret, ...(await walk(fullpath))];
          } else {
              ret = [...ret, fullpath];
          }
      }
      return ret;
    }

    (async function () {
      var ret = await walk("../backend/mobile"); 
      res.json({files: JSON.stringify(ret)});
  })();
  }


  async getFile(req, res) {
    const fs  = require("fs");
    var directoryName = '../backend/mobile/' + req.params.file;
    console.log(directoryName);
    await fs.readFile(directoryName,"utf8",function(err,html) {
      res.send(html);
    });
  }
}
module.exports = new GenericController();
