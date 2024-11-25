const {
   getAll,
   createApplication,
   getById,
   updateApplication,
   deleteApplication,
} = require('#controllers/application.controller');

const router = require('express').Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication)

module.exports = router;
