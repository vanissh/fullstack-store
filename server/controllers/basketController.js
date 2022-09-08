import ApiError from '../error/ApiError.js'
import models from '../models/models.js'

const {Basket, BasketDevice, Device} = models

class BasketController {

    async createBasket (req,res,next){
        const {id} = req.user
        const basket = await Basket.create({userId: id})
    }

    async addToBasket(req,res,next){
        const {deviceId} = req.body
        const {id} = req.user
        const basket = await Basket.findOne({where: {userId: id}})
        const basketDevice = await BasketDevice.create({deviceId: deviceId, basketId: basket.id})
        return res.json(basketDevice)
    }

    async deleteFromBasket(req, res) {
        
        const {id} = req.body
        const device = await BasketDevice.findOne(
            {where: {id}},
        )
        await device.destroy()
        return res.json('delete')
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const basket = await Basket.findOne({where: {userId: id}})
        const basketDevices = await BasketDevice.findAll({include: {
                model: Device
            }, where: {basketId: basket.id}})

        return res.json(basketDevices)
    }
}

export default new BasketController()