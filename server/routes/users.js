const router = require('express').Router()
const userController = require('../controllers/userController')
const middleware = require('../middleware/middleware')

router.post('/signup',userController.signup)
router.post('/signin',userController.signin)
router.get('/',userController.read)
router.get('/:id',userController.readOne)

router.put('/update',middleware.authenticate,userController.update)

router.put('/follow/:id',middleware.authenticate,userController.follow)
router.put('/unfollow/:id',middleware.authenticate,userController.unfollow)

module.exports = router