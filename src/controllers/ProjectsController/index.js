const connection=require('../../database/connection');
const crypto=require('crypto');


module.exports={
    async index (request,response) {
         const projects=await connection('projects')
         .select(['projects.*']);

        return response.json(projects);
    },
    async getUserProjects (request,response) {
        const {id} = request.params;
        const projects=await connection('projects')
        .where({'user_id': id})
        .select(['projects.*']);

       return response.json(projects);
   },
   
   async getCountUserProjects (request,response) {
    const {id} = request.params;
    const count = await connection('projects')
    .where({'user_id': id})
    .count();

   return response.send(count);
},
    
    /**
 * @api {get} /project/:id Request Project information
 * @apiName GetProject
 * @apiGroup Project
 *
 * @apiParam {Integer} id Unique ID of project
 *
 * @apiSuccess {Integer} id Id of the User.
 * @apiSuccess {String} name Name of the Project.
 * @apiSuccess {String} xml  Xml of the User.
 * @apiSuccess {Integer} user_id  Project user id. .
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blink led",
 *       "xml": "84 99999999",
 *       "user_id": 11,
 *     }
 *
 * @apiError ProjectNotFound The id of the project was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProjectNotFound"
 *     }
 */
    async get (request,response) {
        const {id}=request.params;
        console.log(id);
        await connection('projects')
        .where({'id': id})
        .select(['projects.*'])
        .then((result) =>{
            if(result.length > 0){
                return response.json(result[0]);
            }else{
                response.status(404).send({
                    "error": "ProjectNotFound"
                  })
            }
           
        })
        .catch((err) => response.sendStatus(500).send({
                   "error": "ProjectNotFound"
                 }));
   },
    async create(request,response){
        const {name, xml, user_id}=request.body;
        console.log("Enter");
            const [id]= await connection('projects').insert({
                name,
                xml, 
                user_id,               
            })
            .then(result => {                
                console.log(result)
                return response.send(result);
            })
            .catch(err => {
                console.log(err)
                return response.sendStatus(422);
            })
            ;            
    },
    async update(request,response){
        const {xml, id}=request.body;
        console.log(id);

            await connection('projects').where({'id': id})
            .update({
                xml: xml
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
    async delete(request,response){
        const {id}=request.params;
        console.log(id);

            await connection('projects').where({'id': id})
            .del()
            .then(function(numberOfUpdatedRows) {
                if(numberOfUpdatedRows) {                   
                    return response.send("Ok ");
                }
            }).catch(function(err){
                console.log(err);
                return response.send("Erro"+id);     
            });             
    },
};
