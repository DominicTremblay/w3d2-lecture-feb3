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

// Returns an array of quote objects with the corresponding comments
const quoteList = () => {
  // Making the object an array
  const quotesArr = Object.values(movieQuotesDb);
  const commentsArr = Object.values(quoteComments);

  // map loops and transform
  const quoteListComments = quotesArr.map(quote => {
    quote.comments = commentsArr.filter(comment => {
      return quote.id === comment.quoteId;
    });

    return quote;
  });

  return quoteListComments;
};

// Create a new quote Object and add it to the db
const addNewQuote = quoteContent => {
  // generating a random id for our new quote
  const quoteId = uuid().substr(0, 8);

  const newQuote = {
    id: quoteId,
    quote: quoteContent,
  };

  // Add it to movieQuotesDb
  // object name + [key] = value

  movieQuotesDb[quoteId] = newQuote;
  return quoteId;
  b;
};
// End points for our app

// list of quotes
// http Verb (method): GET
// path: '/quotes'/
// req -> request object
// res -> response object
app.get('/quotes', (req, res) => {
  // console.log('method', req.method);
  // console.log('path', req.url);
  // console.log('headers', req.headers);

  // get the list of quotes + comments from our db object

  const quotes = quoteList();

  // render the quotes HTML page

  res.render('quotes', { quoteList: quotes });
});

// Add a new quote
// method: GET
// path: '/quotes/new'

app.get('/quotes/new', (req, res) => {
  // render the new form

  res.render('new_quote');
});

// When the user clicks on the submit of the form
// method: POST
// path: '/quotes'
app.post('/quotes', (req, res) => {
  // Get the quote content from the input form
  // This requires a middleware called bodyParser
  const quoteContent = req.body.quoteContent;

  addNewQuote(quoteContent);

  // redirect to /quotes page

  res.redirect('/quotes');
});

// Deleting a quote
// Method: should be delete, but forms don't understand delete. So POST instead.
// path: /quotes/:id/delete
// :id is a wildcard

app.post('/quotes/:id/delete', (req, res) => {
  // extract the id value from the path with req.params
  const quoteId = req.params.id;

  // delete the object with that id in the db
  delete movieQuotesDb[quoteId];

  // redirect to /quotes
  res.redirect('/quotes');
});

// display the form to see one quote
// method: GET
// path: '/quotes/:id/update

app.get('/quotes/:id/update', (req, res) => {
  // extract the id from the url
  const quoteId = req.params.id;
  // get the quote from db
  const movieQuote = movieQuotesDb[quoteId];

  const templateVar = { quoteObj: movieQuote };

  res.render('quote_show', templateVar);
});

app.post('/quotes/:id/update', (req, res) => {
  // extract the id from the url
  const quoteId = req.params.id;

  //extract the quote content from the form
  const quoteContent = req.body.quoteContent;

  // update the content of the quote for that particular quote in the db

  movieQuotesDb[quoteId].quote = quoteContent;

  res.redirect('/quotes');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
