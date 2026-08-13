import {generateRestToken} from '../../common/utils/jwt.token'
import user from './auth.model'
import ApiError from '../../common/utils/apiError'

const register = async({name, email, password, role}) =>{
    const existing = await user.find(email)
    if(existing){
        throw new ApiError("Email already registered")
    }
    const {rawToken, HashedToken} = generateRestToken();
    
    const User = await user.create({
        name,
        password,
        email,
        role,
        verificationToken :HashedToken
    });
    
    const userObj = User.toObject();
    delete userObj.password
    delete userObj.verificationToken
    return userObj;

}

export {register};
