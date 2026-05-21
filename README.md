# Custom API Gateway with Intelligent Rate Limiting

A production-style API Gateway built using Node.js, Express.js, Redis, Docker, and Microservices Architecture.

## Features

- JWT Authentication
- Dynamic Route Configuration
- Redis-based Intelligent Rate Limiting
- IP-based and Tier-based Traffic Control
- Reverse Proxy Routing
- Dockerized Microservices
- Docker Compose Orchestration
- Request Logging with Winston
- Error Logging
- Latency Monitoring
- Secure Request Forwarding

---

## Tech Stack

- Node.js
- Express.js
- Redis
- Docker
- Docker Compose
- Winston
- JWT
- http-proxy-middleware

---

## Architecture

Client -> API Gateway -> Microservices

Gateway handles:
- Authentication
- Rate Limiting
- Logging
- Routing
- Traffic Management

---

## Services

- User Service
- Product Service
- Order Service

---

## Run Project

```bash
docker compose up --build