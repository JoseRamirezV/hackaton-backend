const { login, signup, update } = require('#controllers/user.controller');
const auth = require('#middlewares/auth.middleware');
const router = require('express').Router();

router.get('/:email&:password', login);
router.post('/signUp', signup);

router.put('/:id', auth, update);
// router.put('/change-password/:id', auth, changePassword);
// router.delete('/delete/:id&:pass', auth, deleteUser);
// router.get('/isLogged/:token', verifyToken);
// router.put('/forgot-password', forgotPassword);
// router.put('/verify', verifyAccount);

module.exports = router;
