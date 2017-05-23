var express = require('express');
var jsdiff = require('diff');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var text1 = req.query.text1;
  var text2 = req.query.text2;

  if (!text1 || !text2) {
    var err = new Error('Wrong Parameter');
    err.status = 500;
    next(err);
    return;
  }

  var diffs = jsdiff.diffLines(text1, text2);
  var results = diffs.reduce(function (results, item) {
    return results.concat(...item.value.split('\n').map(line => ({ added: item.added, removed: item.removed, value: line })));
  }, []);

  res.render('index', { title: 'Diff Tool', configFromServer: JSON.stringify(results) });

});

module.exports = router;
