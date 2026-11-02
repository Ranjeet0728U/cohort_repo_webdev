import * as controller from '../services/team.service.js'
import ApiResponse from '../../../common/utils/api-respons.js'

const addTeam = async (req, res) =>{
    try{
        const players = await controller.addTeam(req.body)
        ApiResponse.created(res, "team got created", players)
    }catch (err) {
        return res.status(err.statusCode).json({
            success : false,
            message : err.message
        })
    }
}

const getAllTeams = async (req, res) => {
    try {
        const players = await controller.getAllTeam()
        return ApiResponse.ok(res, "The teams are: -", players)
    }catch (err){
        return res.status(err.statusCode || 500).json({
            success : false,
            message : err.message
        })
    }
}

const changeTeamOwner = async (req, res) => {
    try{
        const changeOwner = await controller.changeTeamOwner(req.body)
        return ApiResponse(res, "owner changed", changeOwner)

    }catch (err) {
        return res.status(err.statusCode).json({
            success : false,
            message : err.message
        })
    }
}

export {
    addTeam,
    getAllTeams,
    changeTeamOwner
}