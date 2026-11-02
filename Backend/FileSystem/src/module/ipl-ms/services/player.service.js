import ApiError from "../../../common/utils/apiError.js";
import Team from "../model/team.model.js"
import Player from "../model/player.model.js"

const showAllPlayer = async() => {
    const player = await Player.find();
    
    if(!player)
        throw ApiError.noUser("No player is found in DB")

    return player
}

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

const playerRoleChange = async({playerId, newRole}) => {
    const player = Player.findByIdAndUpdate(playerId, 
        {role : newRole},
        {new : true, runValidators : true}
    ).populate("name","teamId");

    if(!player) throw ApiError.noUser("No Player Found for this PlayerId")
    
    return player
}


export {
    showAllPlayer,
    addPlayer,
    transferPlayer,
    playerRoleChange
}