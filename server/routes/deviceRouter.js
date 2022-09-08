import Router from 'express'
import deviceController from '../controllers/deviceController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

export {router}