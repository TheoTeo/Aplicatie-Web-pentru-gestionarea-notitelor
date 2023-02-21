import express from 'express';
import {
    getNotita, getNotite, getUser, getUsers, addNotita, addUser, saveNotita, saveUser, removeNotita, removeUser, getDisciplina,
    getDiscipline, addDisciplina, saveDisciplina, removeDisciplina
} from './service.mjs';

const router = express.Router();

router.route('/notite')
    .get((request, response) => getNotite(request, response))
    .post((request, response) => addNotita(request, response));

router.route('/notite/:id')
    .get((request, response) => getNotita(request, response))
    .patch((request, response) => saveNotita(request, response))
    .delete((request, response) => removeNotita(request, response));

router.route('/users')
    .get((request, response) => getUsers(request, response))
    .post((request, response) => addUser(request, response));

router.route('/users/:id')
    .get((request, response) => getUser(request, response))
    .patch((request, response) => saveUser(request, response))
    .delete((request, response) => removeUser(request, response));

router.route('/discipline')
    .get((request, response) => getDiscipline(request, response))
    .post((request, response) => addDisciplina(request, response));

router.route('/discipline/:id')
    .get((request, response) => getDisciplina(request, response))
    .patch((request, response) => saveDisciplina(request, response))
    .delete((request, response) => removeDisciplina(request, response));

export default router;