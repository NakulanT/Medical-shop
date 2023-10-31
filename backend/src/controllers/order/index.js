import Order from '../../models/order';
import Boom from 'boom';
import OrderSchema from './validations';
import Product from '../../models/product'; // Import the Product model

const Create = async (req, res, next) => {
  const input = req.body;
  input.items = input.items ? JSON.parse(input.items) : null;
  input.itemQuantity = input.itemQuantity ? JSON.parse(input.itemQuantity) : null;

  for (let i = 0; i < input.items.length; i++) {
    await findProductById(input.items[i], input.itemQuantity[i]);
  }

  async function findProductById(productId, itemQuantity) {
    try {
      // Use the Product model to query the "products" collection
      const product = await Product.findOne({ _id: productId }).exec();
      console.log(product);

      if (product) {
        product.itemsList -= itemQuantity;
        console.log(product);
        await product.save();
      } else {
        console.log('Product not found.');
      }
    } catch (error) {
      console.error('Error finding/updating product:', error);
    }
  }
   
  const { error } = OrderSchema.validate(input);
  console.log(input.itemQuantity)
  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }
  const { user_id } = req.payload;
  try {
    const order = new Order({
      user: user_id,
      adress: input.address,
      items: input.items,
      itemQuantity:input.itemQuantity,
      total:input.total,
    });

    const savedData = await order.save();

    res.json(savedData);
  } catch (e) {
    next(e);
  }
};

const List = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', '-password -__v').populate('items');

    res.json(orders);
  } catch (e) {
    next(e);
  }
};

const GetMyOrders = async (req, res, next) => {
  const { user_id } = req.payload;

  try {
    const orders = await Order.findById(user_id).populate('purchases.item');

    res.json(orders);
  } catch (e) {
    next(e);
  }
};

export default {
  Create,
  List,
  GetMyOrders,
};
