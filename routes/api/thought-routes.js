const router = require('express').Router();

const {
    getThoughts,
    getThoughtByID,
    makeThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');


router.route('/')
.get(getThoughts)

router.route('/:userId')
.post(makeThought)


router.route('/:thoughtId')
.get(getThoughtByID)
.put(updateThought)
.delete(deleteThought)


router.route('/:thoughtId/reactions')
.post(addReaction)



router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;