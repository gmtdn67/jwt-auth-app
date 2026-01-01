import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user-controller';
import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 16 }),
  userController.registration.bind(userController)
);

router.post('/login', userController.login.bind(userController));
router.post('/logout', userController.logout.bind(userController));

router.get('/activate/:link', userController.activate.bind(userController));
router.get('/refresh', userController.refresh.bind(userController));
router.get('/users', authMiddleware, userController.getUsers.bind(userController));

export default router;

