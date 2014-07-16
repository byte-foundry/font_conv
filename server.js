var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    exec = require("child_process").exec,
    fs = require("fs");


http.createServer(function(req, res) {
  //if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      exec("fontforge -script ../convert.sh --format ." + fields.format + " " + files.upload.path, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        res.setHeader('Content-disposition', 'attachment; filename=' + files.upload.name.replace('svg', fields.format));
        res.writeHead(200, {'Content-Type': 'application/x-font-' + fields.format});
        fs.unlink(files.upload.path, function (err) {
          if (err) throw err;
          console.log('successfully deleted' + files.upload.path);
        });
        fs.unlink(files.upload.path + "." + fields.format, function (err) {
          if (err) throw err;
          console.log('successfully deleted' + files.upload.path);
        });
        res.end(files.upload.path, 'binary');

      });
    });

    return;
  //}

  // show a file upload form
  /*res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );*/
}).listen(8080);
