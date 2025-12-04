import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    default: []
  }
});

const Cart = mongoose.model(cartCollection, cartSchema);
export default Cart;   // ✅ export default
