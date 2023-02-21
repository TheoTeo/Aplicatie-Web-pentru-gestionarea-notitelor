import Sequelize from 'sequelize';
import { Users, Notite, Discipline } from './repository.mjs';

async function getUsers(request, response) {
    try {
        const users = await Users.findAll();
        if (users.length > 0) {
            response.status(200).json(users);
        } else {
            response.status(204).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function getUser(request, response) {
    try {
        if (request.params.id) {
            const user = await Users.findByPk(request.params.id);
            if (user) {
                response.json(user);
            } else {
                response.status(404).send();
            }
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function addUser(request, response) {
    try {
        if (request.body.email) {
            await Users.create(request.body);
            response.status(201).send();
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function saveUser(request, response) {
    try {
        const user = await Users.findByPk(request.params.id);
        if (user) {
            Object.entries(request.body).forEach(([email, value]) => user[email] = value);
            await user.save();
            response.status(204).send();
        } else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function removeUser(request, response) {
    try {
        if (request.params.id) {
            const user = await Users.findByPk(request.params.id);
            if (user) {
                await user.destroy();
                response.status(204).send();
            } else {
                response.status(404).send();
            }
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function getNotite(request, response) {
    try {
        const notite = await Notite.findAll({
            where: request.query.usersId
                ? { usersId: { [Sequelize.Op.eq]: request.query.usersId } }
                : undefined,
            attributes: ['id', 'title', 'continut', 'usersId', 'disciplineId', 'tip', 'date']
        });
        if (notite.length > 0) {
            response.status(200).json(notite);
        } else {
            response.status(204).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function getNotita(request, response) {
    try {
        if (request.params.id) {
            const notita = await Notite.findByPk(request.params.id);
            if (notita) {
                response.json(notita);
            } else {
                response.status(404).send();
            }
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function addNotita(request, response) {
    try {
        if (request.body.title) {
            await Notite.create(request.body);
            response.status(201).send();
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function saveNotita(request, response) {
    try {
        const notita = await Notite.findByPk(request.params.id);
        if (notita) {
            Object.entries(request.body).forEach(([title, value]) => notita[title] = value);
            await notita.save();
            response.status(204).send();
        } else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function removeNotita(request, response) {
    try {
        if (request.params.id) {
            const notita = await Notite.findByPk(request.params.id);
            if (notita) {
                await notita.destroy();
                response.status(204).send();
            } else {
                response.status(404).send();
            }
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function getDiscipline(request, response) {
    try {
        const discipline = await Discipline.findAll();
        if (discipline.length > 0) {
            response.status(200).json(discipline);
        } else {
            response.status(204).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function getDisciplina(request, response) {
    try {
        if (request.params.id) {
            const disciplina = await Discipline.findByPk(request.params.id);
            if (disciplina) {
                response.json(disciplina);
            } else {
                response.status(404).send();
            }
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function addDisciplina(request, response) {
    try {
        if (request.body.title) {
            await Discipline.create(request.body);
            response.status(201).send();
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function saveDisciplina(request, response) {
    try {
        const disciplina = await Discipline.findByPk(request.params.id);
        if (disciplina) {
            Object.entries(request.body).forEach(([title, value]) => disciplina[title] = value);
            await disciplina.save();
            response.status(204).send();
        } else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function removeDisciplina(request, response) {
    try {
        if (request.params.id) {
            const disciplina = await Discipline.findByPk(request.params.id);
            if (disciplina) {
                await disciplina.destroy();
                response.status(204).send();
            } else {
                response.status(404).send();
            }
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

export {
    getNotita, getNotite, getUser, getUsers, addNotita, addUser, saveNotita, saveUser, removeNotita, removeUser, getDisciplina,
    getDiscipline, addDisciplina, saveDisciplina, removeDisciplina
}