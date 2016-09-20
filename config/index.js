var all = {
    // Server port
    port: process.env.PORT || 4141,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // List of user roles
    userRoles: ['guest', 'user', 'client', 'admin'],

    facebook: {
        clientID: '828887693868980',
        clientSecret: '25130290468ec21fbefd1604218cc57c'
    },

    sequelize: {
        uri: 'postgres://postgres:root@localhost:5432/koment',
        options: {
            logging: console.log,
            storage: 'dev.postgres',
            define: {
                timestamps: false
            }
        }
    },
    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'koment-admin-secret',
        expire: 1800
    }
};


// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require(`./environment/${process.env.NODE_ENV}.js`) || {});

