import ApiError from "../../../common/utils/apiError.js";
import Team from '../model/team.model.js'
import Owner from '../model/owner.model.js'


const addTeam = async({name, OwnerId}) => {
    if(!name || !OwnerId) 
        throw ApiError.badRequest("name or OwnerId missing")

    const owner = await Owner.findById(OwnerId)

    if(!owner) {
        throw ApiError.notFound("owner not found")
    }

    const existingTeam = await Team.findOne({name})

    if(existingTeam)
        throw ApiError.conflict('Team name already exist')

    const team = await Team.create({name, OwnerId})

    if(!team)
        throw ApiError.noUser("team not create")

    return team
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