import ApiRes from '../../../common/utils/api-respons.js'
import * as playerService from '../services/player.service.js'

const AllPlayer = async (req, res) => {
    try{
        const allPlayer = await playerService.showAllPlayer()
        ApiRes.ok(res, "All Register Player: - ", allPlayer)
    }catch(err) {
        res.status(err.statuscode).json({
            success : false,
            message : err.message
        })
    }
}


const addPlayer = async(req, res) => {
    try{
        const player = await playerService.addPlayer(req.body)

        return ApiRes.created(res, "SuccessFully created", player)
    }
    catch(err) {
        return res.status(err.statuscode).json({
            success : false,
            message : err.message
        })
    }
}

const transferPlayer = async (req, res) => {
    try{
        const player = await playerService.transferPlayer(req.body);
        ApiRes.ok(res, "Player successFully transfered", player)
    }
    catch (err){
        res.status(err.statuscode || 500).json({
            success : false,
            message : err.message || "network err"
        })
    }
}


export {
    AllPlayer,
    addPlayer,
    transferPlayer
}