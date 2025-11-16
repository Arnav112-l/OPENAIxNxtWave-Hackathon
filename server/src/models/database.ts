import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kiranaconnect';
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${mongoose.connection.name}`);
    
    // Seed initial data if database is empty
    await seedInitialData();
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

async function seedInitialData() {
  const { Shop } = await import('./Shop');
  
  const count = await Shop.countDocuments();
  
  if (count === 0) {
    console.log('🌱 Seeding initial shop data...');
    
    const mockShops = [
      {
        name: "Sharma Kirana Store",
        nameHi: "शर्मा किराना स्टोर",
        address: "Shop 12, Main Market, Sector 15",
        phone: "+91 98765 43210",
        ownerName: "Rajesh Sharma",
        location: { lat: 28.5355, lng: 77.3910 },
        rating: 4.5,
        deliveryTime: "20-30 mins",
        products: [
          { name: "Tata Salt", nameHi: "टाटा नमक", price: 22, unit: "1kg", category: "staples", stock: 50 },
          { name: "Fortune Atta", nameHi: "फॉर्च्यून आटा", price: 320, unit: "10kg", category: "staples", stock: 20 },
          { name: "Amul Milk", nameHi: "अमूल दूध", price: 28, unit: "500ml", category: "dairy", stock: 30 }
        ]
      },
      {
        name: "Patel General Store",
        nameHi: "पटेल जनरल स्टोर",
        address: "B-45, Gandhi Nagar",
        phone: "+91 98123 45678",
        ownerName: "Mahesh Patel",
        location: { lat: 28.5365, lng: 77.3920 },
        rating: 4.7,
        deliveryTime: "15-25 mins",
        products: [
          { name: "Britannia Bread", price: 40, unit: "400g", category: "staples", stock: 25 },
          { name: "Parle-G Biscuits", price: 10, unit: "200g", category: "snacks", stock: 100 }
        ]
      },
      {
        name: "Kumar Provision Store",
        nameHi: "कुमार प्रोविजन स्टोर",
        address: "Plot 8, Nehru Colony",
        phone: "+91 99887 76655",
        ownerName: "Suresh Kumar",
        location: { lat: 28.5345, lng: 77.3900 },
        rating: 4.3,
        deliveryTime: "25-35 mins",
        products: [
          { name: "Surf Excel", price: 250, unit: "2kg", category: "personal-care", stock: 15 },
          { name: "Coca Cola", price: 40, unit: "750ml", category: "beverages", stock: 40 }
        ]
      }
    ];
    
    await Shop.insertMany(mockShops);
    console.log(`✅ Seeded ${mockShops.length} shops`);
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});
