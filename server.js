var formidable = require('formidable'),
    http = require('http'),
    exec = require("child_process").exec,
    fs = require("fs");


http.createServer(function(req, res) {
if (req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
    exec("fontforge -script convert.sh -format \"." + fields.format + "\"" + " " + files.upload.path, function(error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        res.setHeader('Content-disposition', 'attachment; filename=' + files.upload.name.replace('svg', fields.format));
        res.writeHead(200, {'Content-Type': 'application/x-font-' + fields.format});
	fs.readFile(files.upload.path + "." + fields.format, function (err, data) {
 		if (err) throw err;
  			console.log(data);
		fs.unlink(files.upload.path, function (err) {
          		if (err) throw err;
       		 });
        	fs.unlink(files.upload.path + "." + fields.format, function (err) {
         		 if (err) throw err;
       		 });
        res.end(data);
       });
	
      });
    });
  }

    return;
}).listen(8080);
