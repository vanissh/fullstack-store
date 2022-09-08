import Router from 'express'
const router = new Router()
import {router as brandRouter} from './brandRouter.js'
import {router as deviceRouter} from './deviceRouter.js'
import {router as typeRouter} from './typeRouter.js'
import {router as userRouter} from './userRouter.js'
import {router as basketRouter} from './basketRouter.js'

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)

export default router