'use strict';

const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const testClinic = {
      email: 'test@test.com',
      password: await bcrypt.hash('password', 10),
      name: faker.company.companyName(),
      phoneNumber: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const clinics = [testClinic];

    for (let i = 0; i < 4; i++) {
      const hashedPassword = await bcrypt.hash('password', 10);

      clinics.push({
        email: faker.internet.email(),
        password: hashedPassword,
        name: faker.company.companyName(),
        phoneNumber: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('clinics', clinics, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('clinics', null, {});
  },
};
