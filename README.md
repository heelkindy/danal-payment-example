# Danal Payment Example

This is a complete Danal payment gateway integration example with Next.js frontend and Express.js backend.

## Project Overview

This is a **Danal Payment Integration Example** demonstrating a complete payment flow using the Danal payment gateway. The project is split into a frontend and backend with the following architecture:

- **Frontend**: Next.js application (port 3001) with Pages Router
- **Backend**: Express.js API server (port 3000) that interfaces with Danal's payment API

## Architecture

### Payment Flow
The payment integration follows Danal's standard 3-step flow:

1. **Auth API** (`/payment/auth`): Initialize payment and get redirect URL
2. **Return URL** (`/payment/return`): Handle user return after payment attempt
3. **Notify URL** (`/payment/notify`): Server-side notification for transaction status

### Key Components

**Frontend** (`/frontend`):
- **Pages**: Simple Next.js pages for payment initiation, success, and failure
- **API Client**: Uses Axios to communicate with the backend server
- **Ports**: Frontend runs on port 3001, calls backend on port 3000

**Backend** (`/server-node`):
- **Payment Routes** (`/routes/payment.js`): Express routes handling the payment flow
- **Danal Service** (`/services/danalPaymentService.js`): Core service interfacing with Danal API
- **HMAC Utility** (`/utils/hmacUtil.js`): Authentication token generation using SHA256
- **Configuration** (`/config/config.js`): Danal credentials and API endpoints

### Security Implementation
- Uses HMAC-SHA256 for API authentication with Danal
- CORS configured to allow frontend-backend communication
- Token-based authentication for all Danal API calls

## Development Commands

### Frontend (Next.js)
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server (port 3001)
npm run build        # Build for production
npm run start        # Start production server
```

### Backend (Express.js)
```bash
cd server-node
npm install          # Install dependencies
npm run dev          # Start with nodemon (auto-reload)
npm run start        # Start production server (port 3000)
```

### Full Stack Development
To run the complete application:

1. **Terminal 1**: Start the backend server
   ```bash
   cd server-node && npm run dev
   ```

2. **Terminal 2**: Start the frontend server
   ```bash
   cd frontend && npm run dev
   ```

3. **Access**: Open http://localhost:3001 to test the payment flow

## Important Configuration Notes

### Port Configuration
- **Frontend**: Runs on port 3001 (configured in frontend code)
- **Backend**: Runs on port 3000 (hardcoded in app.js)
- **CORS**: Backend allows origins from localhost:3001

### Danal Configuration
The backend uses production Danal API endpoints (`https://api-pay.danalpay.com`). Key configuration is in `/server-node/config/config.js`:

- **CP ID**: Merchant identifier
- **Secret Key**: Used for HMAC authentication
- **Return/Notify URLs**: Should be updated for production deployment

### SSL Configuration
The service includes `rejectUnauthorized: false` for development - this should be removed for production.

## Testing Payment Flow

1. Start both servers
2. Navigate to http://localhost:3001
3. Click "Thanh toán ngay" to initiate payment
4. Complete payment on Danal's payment page
5. Get redirected to success/fail page based on payment result

## File Structure Highlights

```
├── frontend/                 # Next.js frontend
│   ├── pages/
│   │   ├── index.js         # Main payment initiation page
│   │   ├── success.js       # Payment success page
│   │   └── fail.js          # Payment failure page
│   └── package.json
├── server-node/             # Express.js backend
│   ├── routes/
│   │   └── payment.js       # Payment route handlers
│   ├── services/
│   │   └── danalPaymentService.js  # Danal API integration
│   ├── utils/
│   │   └── hmacUtil.js      # HMAC token generation
│   ├── config/
│   │   └── config.js        # Danal configuration
│   ├── app.js               # Express app setup
│   └── package.json
```

## Dependencies

### Frontend
- **Next.js 15.5.3**: React framework with Pages Router
- **Axios**: HTTP client for API calls
- **React 19.1.0**: Latest React version

### Backend
- **Express.js**: Web server framework
- **Axios**: HTTP client for Danal API calls
- **Crypto**: Built-in Node.js module for HMAC generation
- **CORS**: Cross-origin resource sharing middleware
- **Nodemon**: Development auto-reload utility