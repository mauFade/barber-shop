import { celebrate, Joi, Segments } from "celebrate";

export const CreateBarberValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    specialty: Joi.array().items(Joi.string()).min(1).required(),
    cellphone: Joi.string().min(11).required(),
    password: Joi.string().min(6).required(),
    instagram: Joi.string(),
  }),
});
