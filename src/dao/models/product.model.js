import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true   // ✅ corregido
  },
  description: {
    type: String,
    required: true   // ✅ corregido
  },
  code: {
    type: String,
    required: true   // ✅ corregido
  },
  price: {
    type: Number,
    required: true   // ✅ corregido
  },
  stock: {
    type: Number,
    required: true   // ✅ corregido
  },
  category: {
    type: String,
    required: true   // ✅ corregido
  },
  thumbnails: {
    type: Array,
    default: []      // ⚔️ no hace falta required:false
  }
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
