const connection = require('../database/connection');

module.exports = {
    async login(request, response){

        const {user, password} = request.body;

        const dados = await connection('cq_usuario')
            .select(['login','nome_completo','empresa','cluster'])
            .where('login', '=', user)
            .where('senha', '=', password)
            .first();

            return response.status(200).json(dados);
    }
}