import { Model, DataTypes } from 'sequelize';

import sequelize from '../sequelize';

class Consultation extends Model {
  public doctorName!: string;
  public patientName!: string;
  public diagnosis!: string;
  public medication!: string;
  public consultationFee!: number;
  public consultedAt!: Date;
  public nextConsultationAt!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Consultation.init(
  {
    doctorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    medication: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    consultationFee: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    consultedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nextConsultationAt: {
      type: DataTypes.DATE,
    },
  },
  {
    modelName: 'consultation',
    sequelize,
  },
);

export default Consultation;
