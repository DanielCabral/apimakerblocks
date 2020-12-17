var express = require('express');
const ProjectsController=require('./controllers/ProjectsController');
const UsersController=require('./controllers/UsersControllers');

var router = express.Router();
router.use(express.json());

router.get('/', (req,res) => {
    res.send('OK');
});

//Rotas de Projeto
router.get('/projects', ProjectsController.index);

router.post('/project',ProjectsController.create);

router.put('/project', ProjectsController.update);

router.delete('/project/:id', ProjectsController.delete);

router.get('/project/:id', ProjectsController.get);

//----------------------------------------------------
//Rotas de usuario 
router.get('/users', ProjectsController.index);

router.post('/user',ProjectsController.create);

router.put('/user', ProjectsController.update);

router.get('/user/:id', ProjectsController.get);

//router.get('/login/', ProjectsController.auth);




module.exports = router;