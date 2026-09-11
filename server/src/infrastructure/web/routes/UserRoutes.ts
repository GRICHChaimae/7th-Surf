import { Router } from "express"; import { UserController } from "../controllers/UserController";

export function createUserRoutes(userController: UserController){
  const router = Router();

  router.post("/signup", (req, res) => 
    userController.signupUser(req, res)
  );

  return router;

}