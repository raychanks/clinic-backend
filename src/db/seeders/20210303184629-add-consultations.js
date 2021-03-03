'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const consultations = [];

    for (let i = 0; i < 500; i++) {
      consultations.push({
        doctorName: faker.name.firstName() + ' ' + faker.name.lastName(),
        patientName: faker.name.firstName() + ' ' + faker.name.lastName(),
        diagnosis: faker.lorem.paragraph(),
        medication: faker.lorem.sentence(),
        consultationFee: Math.floor(Math.random() * 1500) + 500,
        consultedAt: faker.date.between(new Date('01-01-2021'), new Date()),
        nextConsultationAt: Math.random() > 0.5 ? faker.date.future() : null,
        clinicId: Math.ceil(Math.random() * 5),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('consultations', consultations, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('consultations', null, {});
  },
};
