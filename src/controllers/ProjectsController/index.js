const connection=require('../../database/connection');
const crypto=require('crypto');


module.exports={
    async index (request,response) {
         const ongs=await connection('projects')
         .select(['projects.*']);

        return response.json(ongs);
    },
    async get (request,response) {
        const {id}=request.params;
        console.log(id);
        const ongs=await connection('projects')
        .where({'id': id})
        .select(['projects.*']);

       return response.json(ongs);
   },
    async create(request,response){
        const {name, xml}=request.body;
        console.log("Enter");
            // const ong_id=request.headers.authorization;
            // console.log(ong_id);
            const [id]= await connection('projects').insert({
                name,
                xml,                
            });
            return response.send(""+id);
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