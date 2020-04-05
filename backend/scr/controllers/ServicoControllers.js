const connection = require('../database/connection');

module.exports = {
    async index (request, response){
        const { page = 1} = request.query;
        const [count] = await connection('cq_inst_gpon').count();

        const servicos = await connection('cq_inst_gpon')
            .limit(5)
            .offset((page -1) * 5)
            .select([
                'cq_inst_gpon.*'
            ]);
        
        response.header('X-Total-Count', count['count(*)']);


        return response.json(servicos);
    },

    async profile (request, response){
        const { matricula } = request.params;
        const dados = await connection('cq_inst_gpon')
            .select('*').where('matsupervisor', '=', matricula);

        return response.json(dados);
    },

    async create (request, response){
        const {
            cluster, 
            atividade,
            telefone, 
            ard, 
            tecnico,
            documento,
            supervisor,
            matsupervisor,
            empresa, 
            endereco,
            cliente, 
            projeto, 
            envio,
            vencimento, 
            cq
        } = request.body;
        const sup = request.headers.authorization;

        const [id] = await connection('cq_inst_gpon').insert({
            cluster, 
            atividade,
            telefone, 
            ard, 
            tecnico,
            documento,
            supervisor,
            matsupervisor,
            empresa, 
            endereco,
            cliente, 
            projeto, 
            envio,
            vencimento, 
            cq,
            sup
        });

        return response.json({id});

    },

    async delete (request, response){
        return response.send('t');
    },

    async update (request, response){
        const { id } = request.params;
        const matricula = request.headers.authorization;

        const dados = {
            documento2,
            prod,
            cadastrado,
            vistoria,
            encerramento,
            total_rep,
            rede,
            cloud,
            recente,
            statuscode,
            acabamento_rede_interna,
            avalicao_tecnico_pelo_cliente,
            cliente_orientado,
            clientes_conector_autofusao,
            clientes_configurados,
            configurado_canais,
            cto_dgoi_cdoi_cdoe_caixa_tar,
            drop_feb,
            equipagem_postes,
            equipamento_rede_cliente,
            estrutura,
            etiqueta_identificacao,
            extencao_linha,
            facilidades_atualiadas,
            jumper_padrao,
            modem_melhor_local,
            observacao,
            orientacao_movimentacao_fibra,
            pacote,
            parametros_modem,
            pingadeira_reserva_tecnica,
            postura_tecnico,
            questionamento_tecnico_n_soube,
            satisfacao_produto,
            tecnico_deixou_cliente_acoes,
            tecnico_foi_cordial,
            tecnologia,
            tipo_tv,
            tomada_padrao,
            images,
            latitude,
            logintude
        } = request.body;

        await connection('cq_inst_gpon').update(dados).where('id','=', id);

        return response.status(200).json({'matricula' : matricula});
    }

}