import Joi from 'joi';

export const schemaCreateConsultation = Joi.object({
  doctorName: Joi.string().required(),
  patientName: Joi.string().required(),
  diagnosis: Joi.string().required(),
  medication: Joi.string().required(),
  consultationFee: Joi.number().required(),
  consultedAt: Joi.date().required(),
  nextConsultationAt: Joi.date(),
});
