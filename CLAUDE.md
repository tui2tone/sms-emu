Project Specification: SMS Dashboard & Transaction API

1. Project Overview

A web-based dashboard for viewing SMS transaction logs and a backend API for receiving incoming SMS data via webhook/POST requests.

2. Tech Stack

Frontend: React (Vite), Tailwind CSS, Lucide React (Icons)

Backend: NestJS

Database: SQLite (via TypeORM or Prisma)

Language: TypeScript

3. Commands

Backend (NestJS)

Install: npm install

Development: npm run start:dev

Build: npm run build

Test: npm run test

Frontend (React/Vite)

Install: npm install

Development: npm run dev

Build: npm run build

4. Architecture

Database Schema (SQLite)

Table: transaction
| Column | Type | Description |
|---|---|---|
| id | UUID / String | Primary Key |
| mobileNumber | String | Format: +1 (555) 000-0000 |
| message | Text | The SMS content |
| timestamp | DateTime | When the SMS was received/sent |
| status | String | Enum: Delivered, Pending, Failed |
| cost | Float | Optional: Cost of transaction |

API Endpoints

1. Receive/Create Transaction (The "1 API" Request)

Method: POST

Path: /api/v1/sms/receive

Description: Receives incoming SMS data from a provider or simulation.

Request Body:

{
  "mobileNumber": "+15551234567",
  "message": "Hello world",
  "timestamp": "2023-10-27T10:00:00Z" // Optional, default to now
}


Response: 201 Created

{
  "id": "uuid-1234",
  "status": "Pending",
  "createdAt": "..."
}


2. List Transactions (Dashboard Feed)

Method: GET

Path: /api/v1/sms/transactions

Query Params:

page: number (default 1)

limit: number (default 10)

status: string (optional filter)

search: string (optional search term)

5. Implementation Steps

Initialize NestJS: nest new sms-backend

Setup SQLite: Install sqlite3 and TypeORM/Prisma.

Generate Resource: nest g resource transactions

Implement POST Endpoint: Create the service method to save to SQLite.

Connect Frontend: Replace mock fetchFreshData and createTransaction in sms_dashboard.jsx with real fetch() calls to the NestJS API.

6. Style Guidelines

Backend: Follow standard NestJS dependency injection patterns. Use DTOs (Data Transfer Objects) for validation.

Frontend: Functional components with Hooks. Lucide icons for UI elements. Tailwind for layout.