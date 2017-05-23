var express = require('express');
var jsdiff = require('diff');
var fs = require("fs");

var router = express.Router();

// Asynchronous read
var readFile = function (filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        });
    });
};

router.get('/file', function (req, res, next) {
    Promise.all([readFile('/Users/kaiyi/Desktop/difftemp/file1'), readFile('/Users/kaiyi/Desktop/difftemp/file2')])
        .then((datas) => res.send(jsdiff.diffLines(...datas))).catch(err => console.error(err));
}); 

module.exports = router;