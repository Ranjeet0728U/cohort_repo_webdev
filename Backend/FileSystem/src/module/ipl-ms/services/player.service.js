import ApiError from "../../../common/utils/apiError.js";
import Team from "../model/team.model.js"
import Player from "../model/player.model.js"

const addPlayer = async ({name, role, teamId}) => {
    const player = await Player.create({name, role, teamId})

    if(!player) return ApiError.badRequest("failed");

    return player
}

const transferPlayer = async ({PlayerId, newTeamId}) => {
    const newTeam = await Team.findById(newTeamId)

    if(!newTeam) 
        throw ApiError.badRequest("No team found")
    const player = await Player.findByIdAndUpdate(
        id,
        {teamId : newTeamId},
        {new : true, runValidators : true}
    ).populate('teamId', 'name')

    if(!player)
        throw ApiError.noUser("NO user found")

    return player
}


export {
    addPlayer,
    transferPlayer
}