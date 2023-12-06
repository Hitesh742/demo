// // import http from "http";

// var http = require("http");
// var demo = require("./demo.js");
// var fs = require("fs");
// var url = require("url");

// http
//   .createServer(function (req, res) {
//     var q = url.parse(req.url, true);
//     var filename = "." + q.pathname;
//     fs.readFile(filename, function (error, data) {
//       if (error) {
//         throw error;
//       }
//       res.writeHead(200, { "Content-Type": "text/html" });
//       //   res.write(JSON.stringify(demo.demofile(), null, 2));
//       res.write(data);
//       //   res.write();
//       return res.end();
//     });
//   })
//   .listen(8080);

// file
var http = require("http");
var formidable = require("formidable");
var fs = require("fs");

http
  .createServer(function (req, res) {
    if (req.url == "/fileupload") {
      var form = new formidable.IncomingForm();
      form.uploadDir = "D:/demo_test/";
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload[0].filepath;
        var newpath = "D:/demo_test/" + files.filetoupload[0].originalFilename;
        fs.rename(oldpath, newpath, function (err) {
          if (err) {
            throw err;
          }
          res.write("File uploaded and moved!");
          res.end();
        });
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        '<form action="fileupload" method="post" enctype="multipart/form-data">'
      );
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write("</form>");
      return res.end();
    }
  })
  .listen(8080);
