import { eq } from "drizzle-orm"
import ApiError from "../../common/utils/apiError.js"
import { verifyAccessToken } from "../../common/utils/jwt.token.js"
import db from '../../db/index.js'
import { userTable } from "../../db/schema.js"

const authenticate = async(req, res, next) => {
    try{
        const accessToken = req.cookies.accessToken

        if(!accessToken) {
            return ApiError.unauthorized("Kindly login for this");
        }

        const decode = verifyAccessToken(accessToken);

        const user = await db.select().from(userTable).where(eq(userTable.id, decode.id));

        if(user.length == 0){
            return res.status(401).json({
                success: false,
                message: "Kindly login first"
            });
        }

        const currentuser = user[0];
        req.user = {
            id : currentuser.id,
            name : currentuser.name,
            email : currentuser.email,
            role : currentuser.role
        }
        next();

    }catch(error){
        next(error);
    }
}



export {authenticate}