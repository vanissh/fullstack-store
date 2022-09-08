import ApiError from '../error/ApiError.js'
import models from '../models/models.js'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const {Device, DeviceInfo} = models
const __dirname = path.resolve();

class DeviceController {
    async create (req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuidv4() + '.jpg'
            img.mv(path.resolve(__dirname, 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info){
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        name: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            }

            return res.json(device)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    } 

    async getAll (req, res) {
        try {
            let {brandId, typeId, limit, page} = req.query
            page = page || 1
            limit = limit || 9

            let offset = page * limit - limit 
            let devices

            if (!brandId && !typeId){
                devices = await Device.findAndCountAll({limit, offset})
            }

            if (brandId && !typeId){
                devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
            }

            if (!brandId && typeId){
                devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
            }

            if (brandId && typeId){
                devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
            }
            return res.json(devices)
        } catch (e) {
            console.log(e)
        }
    }

    async getOne (req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {   
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]  
            },
        )
        return res.json(device)
    }

}

export default new DeviceController()