const connection=require('../../database/connection');
const crypto=require('crypto');


module.exports={
    async index (request,response) {
         const users=await connection('users')
         .select(['users.*']);

        return response.json(users);
    },

    async get (request,response) {
        const {id}=request.params;
        const user=await connection('users')
        .where({'id': id})
        .select(['users.*']);

       return response.json(user);
   },
    async create(request,response){
        const {name, email, senha}=request.body;
            const [id]= await connection('users').insert({
                name,
                email,               
                senha, 
            });
            return response.send(""+id);
    },
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
};