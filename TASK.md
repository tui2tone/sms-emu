# SMS Emulator Implementation Plan

## Overview
Build SMS Dashboard & Transaction API → React frontend + NestJS backend + SQLite

## Phase 1: Backend Setup
1. **Initialize NestJS Project**
   - [ ] `nest new sms-backend`
   - [ ] Setup directory structure

2. **Database Configuration**
   - [ ] Install SQLite + TypeORM: `npm install sqlite3 typeorm @nestjs/typeorm`
   - [ ] Create Transaction entity w/ schema:
     - [ ] id: UUID (primary)
     - [ ] mobileNumber: string (+1 format)
     - [ ] message: text
     - [ ] timestamp: DateTime
     - [ ] status: enum (Delivered|Pending|Failed)
     - [ ] cost: float (optional)
   - [ ] Configure TypeORM in app.module.ts

3. **Generate Transaction Resource**
   - [ ] `nest g resource transactions`
   - [ ] Create DTOs for validation
   - [ ] Implement service methods

4. **API Endpoints**
   - [ ] POST /api/v1/sms/receive
     - [ ] Request: mobileNumber, message, timestamp (optional)
     - [ ] Response: 201 w/ id, status, createdAt
   - [ ] GET /api/v1/sms/transactions
     - [ ] Query params: page, limit, status, search
     - [ ] Response: paginated transaction list

## Phase 2: Frontend Setup
1. **Initialize Vite React Project**
   - [ ] `npm create vite@latest sms-frontend -- --template react-ts`
   - [ ] Install dependencies: `npm install tailwindcss lucide-react`

2. **Setup Tailwind CSS**
   - [ ] Configure tailwind.config.js
   - [ ] Import styles in main CSS

3. **Create Components**
   - [ ] Dashboard layout
   - [ ] Transaction list w/ pagination
   - [ ] SMS form for testing
   - [ ] Status filters
   - [ ] Search functionality

## Phase 3: Integration
1. **Replace Mock Data**
   - [ ] Update fetchFreshData() → real API calls
   - [ ] Update createTransaction() → POST to backend
   - [ ] Add error handling

2. **API Client Setup**
   - [ ] Configure base URL
   - [ ] Add request/response interceptors
   - [ ] Handle loading states

## Phase 4: Testing & Polish
1. **Backend Tests**
   - [ ] Unit tests for service methods
   - [ ] E2E tests for endpoints
   - [ ] Validation tests for DTOs

2. **Frontend Tests**
   - [ ] Component tests
   - [ ] Integration tests for API calls

3. **Error Handling**
   - [ ] Network errors
   - [ ] Validation errors
   - [ ] Loading states

## File Structure
```
sms-emulator/
├── sms-backend/
│   ├── src/
│   │   ├── transactions/
│   │   │   ├── entities/transaction.entity.ts
│   │   │   ├── dto/create-transaction.dto.ts
│   │   │   ├── transactions.controller.ts
│   │   │   └── transactions.service.ts
│   │   └── app.module.ts
│   └── package.json
├── sms-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/api.ts
│   │   └── App.tsx
│   └── package.json
└── CLAUDE.md
```

## Commands Summary
**Backend:**
- Development: `npm run start:dev`
- Build: `npm run build`
- Test: `npm run test`

**Frontend:**
- Development: `npm run dev`
- Build: `npm run build`

## Next Actions
1. [ ] Create backend directory structure
2. [ ] Initialize NestJS project
3. [ ] Setup database & entities
4. [ ] Implement API endpoints
5. [ ] Create frontend project
6. [ ] Build dashboard components
7. [ ] Connect frontend to backend