import { BadRequestError, ForbiddenError, UnauthorizedError } from "../../common/errors/errors.js";
import { createHash, isValidPassword } from "../../common/utils/hashPassword.js";
import { createToken } from "../../common/utils/jwt.js";
import { userDao } from "../users/user.dao.js";
import { logger } from "../../common/utils/logger.js"

class AuthService {
  async registerUser(user) {
    const findUser = await userDao.getOne({ email: user.email });
    if(findUser) throw new ForbiddenError("El usuario ya existe con ese email");

    const newUserData = {
      ...user,
      password: createHash(user.password)
    }
    const newUser = await userDao.create(newUserData);

    return newUser;
  }

  async login(email, password){
    logger.debug("Login service");
      const findUser = await userDao.getOne({ email});
      if(!findUser || !isValidPassword(findUser, password)) throw new UnauthorizedError("El mail o password no válido");
      
      const token = createToken(findUser);
      logger.debug(`Token generado: ${token}`);

      return {user: findUser, token};
      
  }
}

export const authService = new AuthService();
