
var express = require('express');
var jsdiff = require('diff');
var router = express.Router();


hasAddedAndRemovedTerm = function (line) {
  return line.some( term => term.added ) && line.some( term => term.removed );
}

router.get('/', function (req, res, next) {
  var text1 = req.query.text1;
  var text2 = req.query.text2;

  if (!text1 || !text2) {
    var err = new Error('Wrong Parameter');
    err.status = 500;
    next(err);
    return;
  }

  var diffs = jsdiff.diffWords(text1, text2);
  console.log(diffs);


  var results = [];
  var lastLine = [];
  for (var item of diffs) {

    item.value.split('\n').forEach(function (i, idx, array) {
      if (idx !== array.length - 1 || item.value.endsWith('\n')) {
        lastLine.push({ added: item.added, removed: item.removed, value: i });
        results.push(lastLine);
        lastLine = [];
      } else {
        lastLine.push({ added: item.added, removed: item.removed, value: i });
      }
    });

  }

  if (lastLine.length !== 0) {
    results.push(lastLine);
    lastLine = null;
  }

  results = results.reduce( function ( arr , line ) {
    if (!hasAddedAndRemovedTerm(line)) {
      arr.push(line);
    } else {
      arr.push(line.filter(term => !term.added ), line.filter(term => !term.removed ));
    }
    return arr;
  }, []);

  console.log(results);

  res.render('index', { title: 'Diff Tool', configFromServer: JSON.stringify(results) });

});

module.exports = router;
