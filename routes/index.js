
var express = require('express');
var jsdiff = require('diff');
var router = express.Router();


escape = function (str) {
  return str
    .replace(/[\"]/g, '\\"')
    .replace(/[\']/g, "\\'")
    .replace(/\\n/g, '\\\\n');
};

function needSplitToTwoLines(line) {
  return false;
}

function reconstructWithLine(wordsDiff) {

  return wordsDiff.reduce(function (out, diff) {
    diff.value.split('\n').forEach( function (term, idx, array) {
      if (idx !== array.length - 1 ) {
        out.lastLine.push({ added:diff.added, removed:diff.removed, value: term });
        out.result.push(out.lastLine);
        out.lastLine = [];
      } else if (term !== '') {
        out.lastLine.push({ added:diff.added, removed:diff.removed, value: term });
      }
    });

    return out;
  }, {result:[], lastLine: []}).result;
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

  var diffs = jsdiff.diffLines(text1, text2);
  // to make sure will involve last item
  diffs.push({value:''});

  var result = diffs.reduce( function (out, diff) {
    if (!diff.added && !diff.removed ) {
      // check current addedValue and removedValue
      if (out.addedValue || out.removedValue) {
        out.result.push( ...reconstructWithLine(jsdiff.diffWords(out.removedValue, out.addedValue)) );
        out.addedValue = '';
        out.removedValue = '';
      }

      out.result.push(...diff.value.split('\n').filter((line, idx, array) => (idx !== array.length - 1 || line !== '')).map( line => ([{ value:line }])));
    } else if ( diff.added ) {
      out.addedValue += diff.value;
    } else if ( diff.removed ) {
      out.removedValue += diff.value;
    }

    return out;

  }, { result:[], addedValue:'', removedValue:'' }).result.reduce(function (out, line) {
    if (needSplitToTwoLines(line)) {
      // add two empty term, make sure it will be rendered with added or removed color
      line.push({added:true, value:''}, {removed: true, value:''});
      out.push(line.filter(term => !term.added), line.filter(term => !term.removed));
    } else {
      out.push(line);
    }
    return out;
  }, []);

  console.log(result);

  res.render('index', { title: 'Diff Tool', configFromServer: escape(JSON.stringify(result))});

});

module.exports = router;
