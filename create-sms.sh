#!/bin/bash

API_URL="http://localhost:3100/api/v1/sms/receive"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+15550048002",
    "message": "Hello world",
    "sender": "TestSender"
  }'
