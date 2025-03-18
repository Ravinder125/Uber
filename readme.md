# User API Documentation

## Base URL
All endpoints are prefixed with `/api/v1/users`

## Authentication
Most endpoints require authentication via JWT token. Send the token as:
- Cookie named "token", or
- Authorization header: `Bearer <token>`

## API Endpoints

### 1. Register User
**POST** `/register`

**Validation Rules:**
- username: min 3 chars, lowercase only
- email: valid email format
- fullname.firstname: min 3 chars, trimmed
- fullname.lastname: min 3 chars
- password: min 8 chars

**Request Body:**
```json
{
    "username": "johndoe",
    "email": "johndoe@example.com",
    "fullname": {
        "firstname": "John",
        "middlename": "Robert", // optional
        "lastname": "Doe"
    },
    "password": "securepass123"
}
```

**Success Response:** `201 Created`
```json
{
    "status": 201,
    "data": {
        "user": {
            "username": "johndoe",
            "email": "johndoe@example.com",
            "fullName": {
                "firstName": "John",
                "middleName": "Robert",
                "lastName": "Doe"
            },
            "createdAt": "2024-01-20T12:00:00.000Z"
        }
    },
    "message": "User created successfully"
}
```

**Error Response:**
```json
{
    "message": "Validation Error",
    "errors": [
        "Username must be at least 3 characters long",
        "Username must be in lowercase",
        "Invalid Email"
        // ... other validation errors
    ]
}
```

### 2. Login User
**POST** `/login`

**Validation Rules:**
- email: valid email format
- password: min 8 chars

**Request Body:**
```json
{
    "email": "johndoe@example.com",
    "password": "securepass123"
}
```

**Success Response:** `200 OK`
```json
{
    "status": 200,
    "data": {
        "user": {
            "username": "johndoe",
            "email": "johndoe@example.com",
            "fullName": {
                "firstName": "John",
                "middleName": "Robert",
                "lastName": "Doe"
            }
        }
    },
    "message": "User logged in successfully"
}
```

### 3. Get User Profile
**GET** `/profile`

**Authentication:** Required (JWT Token)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response:** `200 OK`
```json
{
    "status": 200,
    "data": {
        "username": "johndoe",
        "email": "johndoe@example.com",
        "fullName": {
            "firstName": "John",
            "middleName": "Robert",
            "lastName": "Doe"
        }
    },
    "message": "User profile fetched successfully"
}
```

### 4. Logout User
**GET** `/logout`

**Authentication:** Required (JWT Token)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response:** `200 OK`
```json
{
    "status": 200,
    "data": {
        "username": "johndoe",
        "email": "johndoe@example.com"
    },
    "message": "User logged out successfully"
}
```

## Common Error Responses

### Validation Error (400)
```json
{
    "message": "Validation Error",
    "errors": ["Error message"]
}
```

### Authentication Error (401)
```json
{
    "message": "Unauthorized Access"
}
```

### Server Error (500)
```json
{
    "message": "Internal Server Error"
}
```

## Notes
- All endpoints return JSON responses
- Authentication uses JWT tokens
- Tokens are sent via both cookies and Authorization header
- All timestamps use ISO 8601 format
