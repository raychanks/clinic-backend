'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('consultations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      patientName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      diagnosis: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      medication: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      consultationFee: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      consultedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      nextConsultationAt: {
        type: Sequelize.DATE,
      },
      clinicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clinics',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('consultations');
  },
};
