const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const uuid = require('uuid/v4');
const app = express();
const morgan = require('morgan');
const methodOverride = require('method-override');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(morgan('short'));

app.use(express.static('public'));
app.set('view engine', 'ejs');

const movieQuotesDb = {
  d9424e04: {
    id: 'd9424e04',
    quote: 'Why so serious?',
  },
  '27b03e95': {
    id: '27b03e95',
    quote: 'YOU SHALL NOT PASS!',
  },
  '5b2cdbcb': {
    id: '5b2cdbcb',
    quote: "It's called a hustle, sweetheart.",
  },
  '917d445c': {
    id: '917d445c',
    quote: 'The greatest teacher, failure is.',
  },
  '4ad11feb': {
    id: '4ad11feb',
    quote: 'Speak Friend and Enter',
  },
};

const quoteComments = {
  '70fcf8bd': {
    id: '70fcf8bd',
    comment: 'So awesome comment!',
    quoteId: 'd9424e04',
  },
};

app.get('/quotes', (req, res) => {
  res.render('quotes');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
