const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

let iteration1 = Recipe.create({ 
  title: 'Whoopies',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup brown sugar', '2 large egg', '2 tablespoons cream', '1 1/4 teaspoons vanilla extract', '3 marshmallows'],
  cuisine: 'American',
  dishType: 'Snack',
  image: 'https://d2gk7xgygi98cy.cloudfront.net/1058-3-large.jpg',
  duration: 30,
  creator: 'Sarah Alt'
})
  .then(data => {
    console.log("Whoopies");
  })
  .catch(err => {
    console.log(err);
  });

let iteration2 = Recipe.insertMany(data).then(d => {
  d.forEach(x => console.log(x.title))
})
.catch(err => {
  console.log(err);
});

let iteration3 = Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(data => {
    console.log("You made it! Rigatoni has a new duration!");
  })
  .catch(err => {
    console.log(err);
  });

let iteration4 = Recipe.deleteOne({title: 'Carrot Cake'})
  .then(data => {
    console.log("Yay! Carrot Cake is deleted!");
  })
  .catch(err => {
    console.log(err);
  });

Promise.all([iteration1, iteration2, iteration3, iteration4])
  .then(() => {
    mongoose.connection.close()
});


