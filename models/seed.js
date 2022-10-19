///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Movie = require('./movie')
const db = mongoose.connection

db.on('open', () => {

    // array of starter movies
    const startMovies = [
        { title: "Goodfellas", lengthMinutes: 146, director: "Martin Scorcese" },
        { title: "Return of the Living Dead", lengthMinutes: 91, director: "Dan O'Bannon" },
        { title: "Baraka", lengthMinutes: 96, director: "Ron Fricke" },
        { title: "Robocop", lengthMinutes: 103, director: "Paul Verhoeven" },
        { title: "Blazing Saddles", lengthMinutes: 93, director: "Mel Brooks" },
    ]

    // delete all the existing movies
    Movie.deleteMany({ owner: null })
        .then(deletedMovies => {
            console.log('this is what .deleteMany returns', deletedMovies)

            // create a bunch of new games from startGames
            Movie.create(startMovies)
                .then(data => {
                    console.log('here are the newly created movies', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})