import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, trim: true }, // consigna: único
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, lowercase: true, trim: true },
  thumbnails: {
    type: [String],
    default: [],
    validate: {
      validator: arr =>
        arr.every(url =>
          /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)
        ),
      message: "Cada thumbnail debe ser una URL válida de imagen"
    }
  }
}, { timestamps: true });

// Plugin de paginación (consigna)
productSchema.plugin(mongoosePaginate);

// ✅ Evita OverwriteModelError
const ProductModel = mongoose.models[productCollection] 
  || mongoose.model(productCollection, productSchema);

export default ProductModel;