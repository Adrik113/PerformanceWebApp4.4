const express = require('express');
const app = express();
 
const bookRoute = express.Router();
let Book = require('../model/Book');
 
// Get all Books
bookRoute.route('/').get((req, res) => {
    Book.find().then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error(`Could not get books: ${error}`);
  })
})

//Add a book
bookRoute.route('/add-book').post((req, res) => {
  Book.create(req.body).then(() => {
    console.log('Book added successfully.');
    res.status(200)
  })
  .catch((error) => {
    console.error('Could not save book: ${error}');
  })
})

bookRoute.route('/delete-book/:id').delete((req, res) => {
  console.log('Preparing to delete: ${req.params.id}');
  Book.findByIdAndDelete(req.params.id).then(() => {
    console.log('Book deleted successfully. ');
    res.status(200);
  })
  .catch((error) => {
    console.error('Could not delete book: {error}');
  })
})

bookRoute.route('/update-book/:id').put((req, res) => {
  Book.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
  .then((book) => res.json(book))
  .catch((error) => res.status(400).send(`Unable to update: ${error}`));
});

module.exports = bookRoute;