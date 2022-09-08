import Router from 'express'
import brandController from '../controllers/brandController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
const router = new Router()


router.post('/', checkRoleMiddleware('ADMIN'), brandController.create)
router.get('/', brandController.getAll)

export {router}