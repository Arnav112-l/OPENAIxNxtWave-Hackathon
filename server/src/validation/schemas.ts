import { z } from 'zod';

// Shop validation schemas
export const createShopSchema = z.object({
  name: z.string().min(1, 'Shop name is required'),
  nameHi: z.string().optional(),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
  ownerName: z.string().min(1, 'Owner name is required'),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  products: z.array(z.object({
    name: z.string(),
    nameHi: z.string().optional(),
    price: z.number().positive(),
    unit: z.string(),
    category: z.enum(['staples', 'dairy', 'snacks', 'beverages', 'personal-care']),
    stock: z.number().int().min(0),
    image: z.string().optional(),
  })).optional(),
});

// Product validation
export const productSchema = z.object({
  name: z.string().min(1),
  nameHi: z.string().optional(),
  price: z.number().positive(),
  unit: z.string().min(1),
  category: z.enum(['staples', 'dairy', 'snacks', 'beverages', 'personal-care']),
  stock: z.number().int().min(0),
  image: z.string().optional(),
});

export const addProductsSchema = z.object({
  products: z.array(productSchema).min(1, 'At least one product required'),
});

// Order validation
export const createOrderSchema = z.object({
  shopId: z.string().min(1, 'Shop ID required'),
  items: z.array(z.object({
    productId: z.string().optional(),
    productName: z.string().min(1, 'Product name required'),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
  })).min(1, 'At least one item required'),
  totalAmount: z.number().positive(),
  customer: z.object({
    name: z.string().min(1, 'Customer name required'),
    phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
    address: z.string().min(5, 'Address required'),
  }),
});

// AI validation schemas
export const parseOrderSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  shopId: z.string().optional(),
  locale: z.enum(['en', 'hi']).default('en'),
});

export const getSubstitutesSchema = z.object({
  productId: z.string().min(1, 'Product ID required'),
  shopId: z.string().optional(),
});

export const translateSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  locale: z.enum(['en', 'hi']).default('en'),
});

export const visionParseSchema = z.object({
  imageData: z.string().min(1, 'Image data is required'),
});

export const updateStockSchema = z.object({
  stock: z.number().int().min(0, 'Stock must be non-negative'),
});

// Type exports
export type CreateShopInput = z.infer<typeof createShopSchema>;
export type AddProductsInput = z.infer<typeof addProductsSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type ParseOrderInput = z.infer<typeof parseOrderSchema>;
export type GetSubstitutesInput = z.infer<typeof getSubstitutesSchema>;
export type TranslateInput = z.infer<typeof translateSchema>;
