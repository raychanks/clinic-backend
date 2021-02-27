import { Clinic, Consultation } from './models';

Clinic.hasMany(Consultation, {
  onDelete: 'cascade',
});
Consultation.belongsTo(Clinic);
