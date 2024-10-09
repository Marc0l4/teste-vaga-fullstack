import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController"
import DocsController from "../controllers/DocsController"
import Auth from '../auths/jwt'

const router = Router()

router.get('/ping', (req: Request, res: Response) => {
  res.json({ pong: true });
});


router.get('/users', UserController.getAllUsers)
router.get('/user/:id', UserController.getUser)
router.post('/user/signin', UserController.login)
router.post('/user/signup', UserController.createUser)
router.put('/user/:id', Auth.auth, UserController.updateUser)
router.delete('/user/:id', Auth.auth, UserController.deleteUser)

router.get('/user/:user_id/docs', DocsController.getAllDocs)
router.get('/user/:user_id/doc/:id', DocsController.getDoc)
router.post('/user/:user_id/doc', DocsController.addDoc)
router.put('/user/:user_id/doc/:id', Auth.auth, DocsController.updateDoc)
router.delete('/user/:user_id/doc/:id', Auth.auth, DocsController.deleteDoc)

export default router