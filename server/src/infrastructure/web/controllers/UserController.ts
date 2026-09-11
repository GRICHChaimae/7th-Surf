import { Signup } from "../../../application/use-cases/user/signup";

export class UserController {
  constructor(
    private readonly signup: Signup
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
}