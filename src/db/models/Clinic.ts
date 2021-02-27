import { Model, DataTypes } from 'sequelize';

import sequelize from '../sequelize';

class Clinic extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public phoneNumber!: string;
  public address!: string;
}

Clinic.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'clinic',
    sequelize,
  },
);

export default Clinic;
