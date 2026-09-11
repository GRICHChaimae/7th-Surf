import { PostgresUserRepository } from "../db/repositories/PostgresUserRepository";
import { BcryptPasswordHasher } from "../security/BcryptPasswordHasher";

import { Signup } from "../../application/use-cases/user/signup";
import { UserController } from "../web/controllers/UserController";

const userRepository = new PostgresUserRepository();
const passwordHasher = new BcryptPasswordHasher();

const signup = new Signup(
  userRepository,
  passwordHasher
);

export const userController = new UserController(signup);