import ApiError from "../../../common/utils/apiError.js";
import Team from '../model/team.model.js'


const addTeam = async({name, teamId}) => {
    if(!name || !teamId) 
        throw ApiError.badRequest("name or teamId missing")

    const team = await Team.findOne({name})

    if(team)
        throw ApiError.conflict('Team name already exist')

    const player = await Team.create({name, teamId})

    if(!player)
        throw ApiError.noUser("team not create")
    return player
}


const getAllTeam = async () => {
    const teams = await Team.find()

    if(teams.length === 0)
        throw ApiError.noUser("No player found")

    return teams
}


const changeTeamOwner = async ({id, newTeamId})=> {

    if(!id || !newTeamId)
        throw ApiError.badRequest("Id or newTeamId not availabe")

    const newOWner = await Team.findByIdAndUpdate(
        id,
        {teamId : newTeamId},
        { new : true, runValidators : true }
    ).populate("name", "teamId")

    if(!newOWner)
        throw ApiError.badRequest("not created")

    return newOWner
}


export{
    addTeam,
    getAllTeam,
    changeTeamOwner
}