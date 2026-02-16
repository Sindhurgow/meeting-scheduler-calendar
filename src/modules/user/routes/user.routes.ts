import { Router } from 'express';
import { registerUser, getUser } from '../interface/user.controller';

const router = Router();

router.post('/', registerUser);

router.get('/:id', getUser);

export default router;