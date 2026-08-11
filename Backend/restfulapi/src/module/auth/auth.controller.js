import * as service from './auth.service.js';
import ApiRes from '../../common/utils/api-respons.js'

const register = async (req, res) => {
    const user = service.register(req.body);
    ApiRes.created(res, "Registration SuccessFull", user);
}