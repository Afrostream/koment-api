'use strict';

module.exports = {
    port: process.env.PORT || 3002,
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
};
