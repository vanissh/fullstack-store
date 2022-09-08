import Router from 'express'
import basketController from '../controllers/basketController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = new Router()
router.get('/', authMiddleware , basketController.getBasketUser)
router.post('/', authMiddleware , basketController.addToBasket)
router.put('/', authMiddleware , basketController.deleteFromBasket)

export {router}