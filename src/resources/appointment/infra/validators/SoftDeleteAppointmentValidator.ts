import { celebrate, Joi, Segments } from "celebrate";

export const softDeleteAppointmentValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    appointmentId: Joi.string().required(),
  }),
});
