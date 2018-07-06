'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('provs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            codigo: {
                type: Sequelize.STRING
            },
            nombre: {
                type: Sequelize.STRING
            },
            direccion: {
                type: Sequelize.STRING
            },
            cpostal: {
                type: Sequelize.STRING
            },
            localidad: {
                type: Sequelize.STRING
            },
            provincia: {
                type: Sequelize.STRING
            },
            telefono: {
                type: Sequelize.STRING
            },
            fax: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            ctaprov: {
                type: Sequelize.STRING
            },
            cuit: {
                type: Sequelize.STRING
            },
            condfis: {
                type: Sequelize.STRING
            },
            retivasn: {
                type: Sequelize.STRING
            },
            porretiva: {
                type: Sequelize.STRING
            },
            retgansn: {
                type: Sequelize.STRING
            },
            concepto: {
                type: Sequelize.STRING
            },
            inscgansn: {
                type: Sequelize.STRING
            },
            observaciones: {
                type: Sequelize.STRING
            },
            cta2: {
                type: Sequelize.STRING
            },
            cta3: {
                type: Sequelize.STRING
            },
            cta4: {
                type: Sequelize.STRING
            },
            porc1: {
                type: Sequelize.STRING
            },
            porc2: {
                type: Sequelize.STRING
            },
            porc3: {
                type: Sequelize.STRING
            },
            porc4: {
                type: Sequelize.STRING
            },
            vtoco: {
                type: Sequelize.STRING
            },
            nroInscrIB: {
                type: Sequelize.STRING
            },
            VencRetIVA: {
                type: Sequelize.STRING
            },
            VencRetGan: {
                type: Sequelize.STRING
            },
            RetIBBASN: {
                type: Sequelize.STRING
            },
            PrRetIBBA: {
                type: Sequelize.STRING
            },
            RetPrevSN: {
                type: Sequelize.STRING
            },
            PorRetPrev: {
                type: Sequelize.STRING
            },
            VencRetPrev: {
                type: Sequelize.STRING
            },
            RetPescaSN: {
                type: Sequelize.STRING
            },
            InscPescaSN: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('provs');
    }
};