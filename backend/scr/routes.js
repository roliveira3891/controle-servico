const express = require('express');

const ServicoControllers = require('./controllers/ServicoControllers');
const UserControllers = require('./controllers/UserControllers');

const routes = express.Router();

routes.post('/user', UserControllers.login);

routes.post('/servicos', ServicoControllers.create);
routes.get('/servicos/', ServicoControllers.index);
routes.get('/servicos/:matricula', ServicoControllers.profile);
routes.post('/servicos/:id/update', ServicoControllers.update)

module.exports = routes;