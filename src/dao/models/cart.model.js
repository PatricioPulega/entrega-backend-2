import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, required: true, min: 1 }
  }]
}, { timestamps: true });

// ✅ Evita OverwriteModelError
const CartModel = mongoose.models[cartCollection] 
  || mongoose.model(cartCollection, cartSchema);

export default CartModel;