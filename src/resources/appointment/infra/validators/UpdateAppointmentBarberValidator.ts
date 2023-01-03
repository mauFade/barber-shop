import { celebrate, Joi, Segments } from "celebrate";

export const updateAppointmentBarberValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    newBarberId: Joi.string().required(),
    appointmentId: Joi.string().required(),
  }),
});
