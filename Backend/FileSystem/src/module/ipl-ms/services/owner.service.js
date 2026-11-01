import ApiRes from "../../../common/utils/api-respons.js"
import ApiError from "../../../common/utils/apiError.js"
import Owner from "../model/owner.model.js"

const createOwner = async({name, company}) => {
    const newOwner = await Owner.create({name, company})

    if(!newOwner) throw ApiError.no
    return newOwner
}

export {
    createOwner
}