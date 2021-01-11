var express = require('express');
const ProjectsController=require('./controllers/ProjectsController');
const UsersControllers=require('./controllers/UsersControllers');

var router = express.Router();
router.use(express.json());

router.get('/', (req,res) => {
    res.send('OK');
});

//Rotas de Projeto
router.get('/projects', ProjectsController.index);

router.get('/projects/:id', ProjectsController.get);

router.post('/project',ProjectsController.create);

router.put('/project', ProjectsController.update);

router.delete('/project/:id', ProjectsController.delete);

router.get('/project/:id', ProjectsController.get);

//----------------------------------------------------
//Rotas de usuario 
router.get('/users', UsersControllers.index);

router.post('/user', UsersControllers.create);


router.put('/user/:id', UsersControllers.update);

//router.patch('/image/:id', multer(multerConfig).single('file'), UsersController.uploadImage);

router.get('/user/:id', UsersControllers.get);
router.post('/auth', UsersControllers.login)
router.post('/forgotpassword', UsersControllers.forgotpassword)
router.post('/resetpassword', UsersControllers.resetpassword)




module.exports = router;