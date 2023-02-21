import Sequelize from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './repository.db',
    define: {
        timestamps: false
    }
});

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parola: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Notite = sequelize.define('notite', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    continut: {
        type: Sequelize.STRING,
    },

    tip: { // tip = 's' sau 'c'
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

const Discipline = sequelize.define('disciplina', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

Users.hasMany(Notite, { foreignKey: 'usersId' });
Notite.belongsTo(Users, { foreignKey: 'usersId' });

Discipline.hasMany(Notite, { foreignKey: "disciplineId" });
Notite.belongsTo(Discipline, { foreignKey: "disciplineId" })

async function initialize() {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
}

export {
    initialize,
    Users,
    Notite,
    Discipline,
}
