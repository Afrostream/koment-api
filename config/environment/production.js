'use strict';

module.exports = {
    sequelize: {
        uri: process.env.DATABASE_URL,
        options: {
            logging: console.log,
            storage: 'koment-postgres',
            define: {
                timestamps: false
            }
        }
    }
};
