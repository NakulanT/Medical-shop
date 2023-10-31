import Joi from 'joi';

const OrderSchema = Joi.object({
  address: Joi.string().required(),
  itemQuantity: Joi.array().items(Joi.number()),
  total: Joi.number(),
  items: Joi.array().items(Joi.string()).required(),
});

export default OrderSchema;
