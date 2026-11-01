import * as ownerService from "../services/owner.service.js"
import ApiResponse from "../../../common/utils/api-respons.js"

const createOwner = (req, res) => {
    try{

        const owner = ownerService.createOwner(req.body)

        return ApiResponse.created(
            res,
            "owner is created successfully",
            owner
        )
    }
    catch(err){
        return res.status(err.statusCode).json({
            success : false,
            message : err.message
        })
    }
}



export {
    createOwner
}