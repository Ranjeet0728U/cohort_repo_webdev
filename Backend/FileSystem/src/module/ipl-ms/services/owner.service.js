import ApiRes from "../../../common/utils/api-respons.js"
import ApiError from "../../../common/utils/apiError.js"
import Owner from "../model/owner.model.js"

const createOwner = async({name, company}) => {
    const newOwner = await Owner.create({name, company})

    if(!newOwner) throw ApiError.no
    return newOwner
}


const getAllOwner = async() => {
    const owners = await Owner.find();
    if(!owners) throw ApiError.noUser('No user exists')

    return owners
}

const getById = async( id ) => {
    const owner = await Owner.findById(id);
    if(!owner) throw ApiError.noUser('No user found')

    return owner;
}

const updateOwner = async (id, {name, company}) => {
    if(!id) throw ApiError.badRequest("No id found")
    
    const owner = await Owner.findByIdAndUpdate(
        id, 
        {name, company},
        {new : true, runValidators : true}
    )

    if(!owner) throw ApiError.noUser("No user with such request found")
    return owner
}

const deleteOwner = async( id ) => {
    const owner = await Owner.findOneAndDelete(id)

    if(!owner) throw ApiError.noUser("No user with this id exists")
    return Owner
}

export {
    createOwner,
    getAllOwner,
    getById,
    updateOwner,
    deleteOwner
}