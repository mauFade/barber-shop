import { celebrate, Joi, Segments } from "celebrate";

export const createAppointmentValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    barberId: Joi.string().required(),
    time: Joi.string().required(),
    price: Joi.number().required(),
    type: Joi.string().required(),
  }),
});
