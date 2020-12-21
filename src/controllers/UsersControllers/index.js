const connection=require('../../database/connection');
const crypto=require('crypto');
//var jwt = require('jsonwebtoken');
const mailer = require('../../modules/mailer');

module.exports={
    async index (request,response) {       
         const users = await connection('users')
         .select(['users.*']);
        return response.json(users);
    },


    /**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Integer} id Unique ID of users
 *
 * @apiSuccess {String} name Name of the User.
 * @apiSuccess {String} phone  Phone of the User.
 * @apiSuccess {String} email  Email of the User.
 * @apiSuccess {String} image  Image of the User.
 * @apiSuccess {String} status  Status of the User.
 * @apiSuccess {String} type  Type of User.
 * @apiSuccess {String} token  Token autorizathion of the User.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "José Felipe",
 *       "phone": "84 99999999",
 *       "email": "jose@gmail.com",
 *       "image": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", 
 *       "status": "0", 
 *       "type": "1", 
 *       "token": "ew093m0gk302m4",  
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

    async get (request,response) {
        const {id}=request.params;
        await connection('users')
        .where({'id': id})
        .select(['users.*'])
        .then((result) =>{
            if(result.length > 0){
                return response.json(result[0]);
            }else{
                response.status(404).send({
                    "error": "UserNotFound"
                  })
            }
           
        })
        .catch((err) => response.sendStatus(500).send({
                   "error": "UserNotFound"
                 }));
   },


    async create(request,response){
        const {name, phone, email, password }=request.body;
            const [id]= await connection('users').insert({
                name,
                phone,
                email,               
                password,
                image: 'https://meet.google.com/linkredirect?authuser=0&dest=https%3A%2F%2Fw7.pngwing.com%2Fpngs%2F2%2F604%2Fpng-transparent-computer-icons-silhouette-user-profile-silhouette-animals-silhouette-fen.png',
                token: '',
                status: 0,
                type: 0,
            })
            .then(result => {                
                console.log(result)
                return response.send(result);
            })
            .catch(err => {
                console.log(err)
                return response.sendStatus(422);
            })
    },

    /**
 * @api {put} /user/ Modify User information
 * @apiName PutUser
 * @apiGroup User
 *
 * @apiParam {Number} id          Users unique ID.
 * @apiParam {String} [firstname] Firstname of the User.
 * @apiParam {String} [lastname]  Lastname of the User.
 * @apiParam {String} [name] Name of the User.
 * @apiParam {String} [phone]  Phone of the User.
 * @apiParam {String} [email]  Email of the User.
 * @apiParam {String} [image]  Image of the User.
 * @apiParam {String} [status]  Status of the User.
 * @apiParam {String} [type]  Type of User.
 * @apiParam {String} [token]  Token autorizathion of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */

    async update(request,response){
        const {name, email}=request.body;
        console.log(id);

            await connection('users').where({'id': id})
            .update({
                name: name,
                email: email
            })
            .then(function(numberOfUpdatedRows) {
                if(numberOfUpdatedRows) {                   
                    return response.send("Ok ");
                }
            }).catch(function(err){
                console.log(err);
                return response.send("Erro");
                return;         
            });           
    },

    async uploadImage(request,response){
        const {id} = request.params;
        console.log(id)
        const user=await connection('users')
        .where({'id': id})
        .select(['users.*'])
        .then((result) =>{
            console.log(result.length);
            if(result.length > 0){
                console.log('ok');
                const { originalname: name, size, key, url = "", path } = request.file;
                console.log(request.file);
                connection('users').where({'id': id})
                .update({
                    image: 'http://192.168.1.9:3333/files/'+key,
                })
                .then(function(numberOfUpdatedRows) {
                    if(numberOfUpdatedRows) {                   
                        return response.send("Ok ");
                    }
                }).catch(function(err){
                    console.log(err);
                    return response.send("Erro");         
                });
            }else{
                response.status(404).send({
                    "error": "UserNotFound"
                  })
            }
           
        })
        .catch((err) => {response.status(500).send({
                   "error": "UserNotFound"
        }); console.log(err)});               
    },
    async login (request,response) {
        const {email, password} = request.body;
        console.log(request.body)
        const user=await connection('users')
        .where({'email': email, 'password': password})        
        .select(['users.*'])
        .then((result) =>{
            if(result.length > 0){                
                return response.json(result[0]);
            }else{
                response.status(404).send({
                    "error": "UserNotFound"
                  })
            }
           
        })     
   },
   async forgotpassword (request,response) {
    const {email} = request.body;
    console.log(request.body)
    const user=await connection('users')
    .where({'email': email})        
    .select(['users.*'])
    .then((result) =>{
        if(result.length > 0){
            const token = crypto.randomBytes(3).toString('hex');

                const now = new Date();
                console.log(now)
                now.setHours(now.getHours()+1);
            connection('users').where({'id': result[0].id})
                .update({
                    passwordResetToken: token,
                    passwordResetExpires: now,
                })
                .then(function(numberOfUpdatedRows) {                    
                    if(numberOfUpdatedRows) {                   
                        mailer.sendMail({
                            to: email, 
                            from: 'danielcsouza97@gmail.com',
                            template: 'auth/forgot.password',
                            context: {token}
                        }, (err) => {
                            console.log(err)
                            if(err){
                                return response.send("Erro no envio do email");
                            }
                            return response.send("Ok");
                        })
                        
                    }
                }).catch(function(err){
                    console.log(err);
                    return response.send("Erro");         
                });            
        }else{
            response.status(404).send({
                "error": "UserNotFound"
              })
        }
       
    })     
},
async resetpassword (request,response) {
    const {email, token, password} = request.body;
    console.log(request.body)
    const user=await connection('users')
    .where({'email': email})        
    .select(['users.*'])
    .then((result) =>{
        if(result.length > 0){
            console.log(result[0].passwordResetToken)
            if(token !== result[0].passwordResetToken){
            response.status(400).send({
                "error": "Token wrong"
              })
            return;
            }            
            connection('users').where({'id': result[0].id})
                .update({
                    password: password, 
                    passwordResetToken: crypto.randomBytes(3).toString('hex'),                   
                })
                .then(function(numberOfUpdatedRows) {                    
                    if(numberOfUpdatedRows) {                                           
                        response.send();
                    }
                }).catch(function(err){
                    console.log(err);
                    return response.send("Erro");         
                });            
        }else{
            response.status(404).send({
                "error": "UserNotFound"
              })
        }
    })
},

};