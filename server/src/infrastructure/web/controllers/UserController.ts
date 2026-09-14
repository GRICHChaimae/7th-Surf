import { Signup } from "../../../application/use-cases/user/signup";
import { Login } from "../../../application/use-cases/user/login";

export class UserController {
  constructor(
    private readonly signup: Signup,
    private readonly login: Login
  ){}

  async signupUser(req: any, res: any){
    await this.signup.execute({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });

    res.status(201).send();
  }

  async loginUser(req: any, res: any){
    const result = await this.login.execute({
      email: req.body.email,
      password: req.body.password
    });

    res.status(200).send(result);
  }
}