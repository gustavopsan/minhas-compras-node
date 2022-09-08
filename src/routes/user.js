const routes = require('express').Router();
const JWT = require('jsonwebtoken');

// Middlewares
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

//  User Controllers
const createUser = require('../controllers/user/createUser');
const authenticateUser = require('../controllers/user/authenticateUser');
const checkSession = require('../controllers/user/checkSession');
const updateUser = require('../controllers/user/updateUser');
const getUsers = require('../controllers/user/getUsers');

//  Create User
routes.post('/createUser', async (req, res) => {
    const { name, email, password, passwordConfirm, avatarUrl } = req.body;

    console.info('API Minhas Compras - createUser - Iniciando criação de novo usuário');

    if (password !== passwordConfirm) {
        console.warn('API Minhas Compras - createUser - Senhas não conferem');

        res.json({
            errorId: 'register_01',
            message: 'Password does not match'
        });
    } else if(!validateEmail(email)) {
        console.warn('API Minhas Compras - createUser - Email com formato inválido');

        res.json({
            errorId: 'register_02',
            message: 'Invalid email format'
        });
    } else if(!validatePassword(password)) {
        console.warn('API Minhas Compras - createUser - Senha com formato inválido');

        res.json({
            errorId: 'register_03',
            message: 'Invalid password format'
        });
    } else {
        createUser(name, email, password, avatarUrl)
            .then( response => {
                if(response.hasOwnProperty('keyValue')) {
                    console.warn('API Minhas Compras - createUser - Email já cadastrado');

                    return res.json({
                        errorId: 'register_04',
                        message: 'Email already registered'
                    });
                } else {
                    console.info('API Minhas Compras - createUser - Usuário ' + response._id + ' criado com sucesso');

                    return res.json({
                        message: 'User created successfully'
                    });
                }
            });
    }
})

//  Authenticate User
routes.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    console.info('API Minhas Compras - authenticate - Iniciando autenticação de usuário');

    authenticateUser(email, password)
        .then( response => {
            if (response.errorId) {
                switch (response.errorId) {
                    case 'auth_01':
                        console.warn('API Minhas Compras - authenticate - Usuário não encontrado com o email informado');
                        break;

                    case 'auth_02':
                        console.warn('API Minhas Compras - authenticate - Senha Incorreta');
                        break;
                    
                    case 'auth_03':
                        console.warn('API Minhas Compras - authenticate - Usuário inatívo');
                        break;
                
                    default:
                        break;
                }

                res.json(response);
            } else {
                const token = JWT.sign(
                    { id: response.userId },
                    process.env.SECRET,
                    { expiresIn: '1m' }
                );

                console.info('API Minhas Compras - authenticate - Usuário ' + response.userId + ' autenticado com sucesso');

                res.json({
                    userData: response,
                    token
                });
            }
        })
        .catch(error => {
            console.warn('API Minhas Compras - authenticate - Erro ao autenticar usuário', error);
            res.json(error)
        });
})

//  Check Session
routes.post('/checkSession', async (req, res) => {
    const { token } = req.body;

    checkSession(token)
        .then( response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
})

//  Update User
routes.put('/updateUser', async (req, res) => {
    const { id, key, value } = req.body;

    console.info('API Minhas Compras - updateUser - Atualizando dados do usuário');

    updateUser(id, key, value)
        .then( response => {
            console.info('API Minhas Compras - updateUser - Usuário atualizado com sucesso');
            res.json(response);
        })
        .catch(error => {
            console.warn('API Minhas Compras - updateUser - Erro ao atualizar usuário', error);
            res.json(error)
        })
})

//  Get all users (Debug endpoint)
routes.get('/debug/getUsers', async (req, res) => {
    console.info('API Minhas Compras - getUsers - Retornando todos os usuários');

    getUsers()
        .then( response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        })
})

module.exports = routes;