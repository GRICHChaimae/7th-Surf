import { PostgresUserRepository } from "../db/repositories/PostgresUserRepository";
import { BcryptPasswordHasher } from "../security/BcryptPasswordHasher";

import { Signup } from "../../application/use-cases/user/signup";
import { Login } from "../../application/use-cases/user/login";
import { UserController } from "../web/controllers/UserController";

const userRepository = new PostgresUserRepository();
const passwordHasher = new BcryptPasswordHasher();

const signup = new Signup(
  userRepository,
  passwordHasher
);

const login = new Login(
  userRepository,
  passwordHasher
);

export const userController = new UserController(
  signup,
  login
);