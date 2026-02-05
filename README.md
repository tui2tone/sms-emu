# SMS Emulator

A web-based dashboard for viewing SMS transaction logs and a backend API for receiving incoming SMS data via webhook/POST requests.

## Tech Stack

### Backend
- NestJS
- TypeORM
- SQLite (in-memory database)
- TypeScript

### Frontend
- React (Vite)
- Tailwind CSS
- Lucide React (Icons)
- TypeScript

## Project Structure

```
sms-emulator/
├── sms-backend/          # NestJS backend
│   ├── src/
│   │   ├── transactions/
│   │   │   ├── entities/    # Transaction entity
│   │   │   ├── dto/         # Data transfer objects
│   │   │   ├── controller.ts
│   │   │   ├── service.ts
│   │   │   └── module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
└── sms-frontend/         # React frontend
    ├── src/
    │   ├── components/      # Dashboard components
    │   ├── services/        # API client
    │   ├── types.ts         # TypeScript types
    │   └── App.tsx
    └── package.json
```

## Getting Started

### Backend Setup

```bash
cd sms-backend
npm install
npm run start:dev
```

The backend will run on http://localhost:3000

### Frontend Setup

```bash
cd sms-frontend
npm install
npm run dev
```

The frontend will run on http://localhost:5173

## API Endpoints

### POST /api/v1/sms/receive
Receive incoming SMS data from a provider.

Request Body:
```json
{
  "mobileNumber": "+15551234567",
  "message": "Hello world",
  "timestamp": "2023-10-27T10:00:00Z"
}
```

Response: 201 Created
```json
{
  "id": "uuid-1234",
  "status": "Pending",
  "createdAt": "2023-10-27T10:00:00Z"
}
```

### GET /api/v1/sms/transactions
List transactions with pagination and filtering.

Query Parameters:
- `page`: number (default 1)
- `limit`: number (default 10)
- `status`: Delivered | Pending | Failed (optional)
- `search`: string (optional search term)

Response:
```json
{
  "data": [
    {
      "id": "uuid-1234",
      "mobileNumber": "+15551234567",
      "message": "Hello world",
      "timestamp": "2023-10-27T10:00:00Z",
      "status": "Pending",
      "cost": null
    }
  ],
  "total": 1
}
```

## Build Commands

### Backend
```bash
cd sms-backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd sms-frontend
npm run build
```

## Features

- Send test SMS messages from the dashboard
- View transaction history with real-time updates
- Filter transactions by status (Delivered, Pending, Failed)
- Search transactions by phone number
- Pagination support
- Responsive design
