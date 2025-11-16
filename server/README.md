# KiranaConnect Server

Backend server for KiranaConnect - AI-powered local commerce platform.

## Features

- **Complete REST API** for shops, products, orders
- **AI Service Layer** with mock and real OpenAI modes
- **TypeScript** throughout for type safety
- **Express.js** with modular architecture
- **CORS** enabled for frontend integration

## Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```
   PORT=3001
   USE_MOCK_AI=true
   OPENAI_API_KEY=your_key_here  # Optional, only needed if USE_MOCK_AI=false
   CLIENT_URL=http://localhost:5173
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Shops & Catalog
- `GET /api/shops` - List all shops
- `GET /api/shops/:id` - Get shop details
- `POST /api/shops` - Create new shop
- `GET /api/catalog/:shopId` - Get products (optional `?category=staples`)
- `POST /api/catalog/:shopId` - Add products to shop
- `PATCH /api/products/:id/stock` - Update product stock

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:shopId` - Get shop orders

### AI Services
- `POST /api/ai/parse-order` - Parse conversational order
  ```json
  { "text": "2L milk and 1kg atta", "shopId": "1" }
  ```
  
- `POST /api/ai/vision-parse` - Parse product images
  ```json
  { "imageData": "base64..." }
  ```
  
- `GET /api/ai/substitutes/:productId` - Get product substitutes

- `POST /api/ai/translate` - Translate text
  ```json
  { "text": "Hello", "targetLang": "hi" }
  ```

## Architecture

```
server/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   │   ├── aiService.ts      # AI integrations
│   │   └── shopService.ts    # Shop/product logic
│   ├── middleware/      # Express middleware
│   ├── types/           # TypeScript definitions
│   ├── utils/           # Utilities
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── package.json
└── tsconfig.json
```

## AI Mode

The server supports two AI modes:

### Mock Mode (Default)
- Uses pattern matching and fixtures
- No API keys needed
- Fast and free for development
- Set `USE_MOCK_AI=true`

### Real OpenAI Mode
- Uses GPT-4 and GPT-4 Vision
- Requires OpenAI API key
- Better accuracy and flexibility
- Set `USE_MOCK_AI=false` and provide `OPENAI_API_KEY`

## Testing

Health check: `http://localhost:3001/health`

Test endpoints with curl or Postman:
```bash
curl http://localhost:3001/api/shops
```

## Notes

- All responses follow format: `{ success: boolean, data: any, error?: string }`
- Mock data is in-memory and resets on restart
- For production, connect to a real database
- CORS is configured for the frontend URL
