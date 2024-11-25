const {
   getAll,
   createApplication,
   getById,
   updateApplication,
   deleteApplication,
} = require('#controllers/application.controller');
const auth = require('#middlewares/auth.middleware');

const router = require('express').Router();

router.get('/', getAll);
router.get('/:id', auth, getById);
router.post('/', auth, createApplication);
router.put('/:id', auth, updateApplication);
router.delete('/:id', auth, deleteApplication)

module.exports = router;
