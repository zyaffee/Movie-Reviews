// Import Dependencies
const express = require('express')
const Review = require('../models/review')

// Create router
const router = express.Router()

// auth middleware
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// index that shows only the user's reviews
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Review.find({ owner: userId })
		.then(reviews => {
			res.render('reviews/index', { reviews, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('reviews/new', { username, loggedIn })
})

// create route
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	Review.create(req.body)
		.then(review => {
			console.log('this was returned from create', review)
			res.redirect('/reviews')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const reviewId = req.params.id
	Review.findById(reviewId)
		.then(review => {
			res.render('review/edit', { review })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const reviewId = req.params.id
	req.body.ready = req.body.ready === 'on' ? true : false

	Review.findByIdAndUpdate(reviewId, req.body, { new: true })
		.then(review => {
			res.redirect(`/reviews/${review.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const reviewId = req.params.id
	Review.findById(reviewId)
		.then(review => {
            const {username, loggedIn, userId} = req.session
			res.render('reviews/show', { review, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const reviewId = req.params.id
	Review.findByIdAndRemove(reviewId)
		.then(review => {
			res.redirect('/reviews')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router