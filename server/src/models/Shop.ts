import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameHi: String,
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['staples', 'dairy', 'snacks', 'beverages', 'personal-care'],
    required: true 
  },
  stock: { type: Number, default: 0 },
  image: String
});

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameHi: String,
  address: { type: String, required: true },
  phone: { type: String, required: true },
  ownerName: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  products: [productSchema],
  rating: { type: Number, default: 4.5 },
  isOpen: { type: Boolean, default: true },
  deliveryTime: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

shopSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Shop = mongoose.model('Shop', shopSchema);
