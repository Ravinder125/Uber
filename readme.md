# User API Documentation

## Authentication
Most endpoints require authentication via JWT token. Send the token as:
- Cookie named "token", or
- Authorization header: `Bearer <token>`

## Endpoints

app.use("/api/v1/users", userRoutes) 

### 1. Register User
**POST** `/users/register`

**Request Body:**
```json
{
    "username": "johndoe",
    "email": "johndoe@example.com",
    "fullname": {
        "firstname": "John",
        "middlename": "Robert",
        "lastname": "Doe"
    },
    "password": "securepass123"
}
```

**Success Response (201):**
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
        },
        "token": "jwt.token.here"
    },
    "message": "User created successfully"
}
```

**Error Responses:**
- `400`: Validation errors or user exists
- `500`: Server error

### 2. Login User
**POST** `/users/login`

**Request Body:**
```json
{
    "email": "johndoe@example.com",
    "password": "securepass123"
}
```

**Success Response (200):**
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
        },
        "token": "jwt.token.here"
    },
    "message": "User logged in successfully"
}
```

**Error Responses:**
- `400`: Missing fields
- `401`: Invalid credentials

### 3. Get User Profile
**GET** `/users/profile`

**Headers Required:**
- `Authorization: Bearer <token>`

**Success Response (200):**
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
        },
        "createdAt": "2024-01-20T12:00:00.000Z"
    },
    "message": "User profile fetched successfully"
}
```

**Error Response:**
- `401`: Unauthorized

### 4. Logout User
**GET** `/users/logout`

**Headers Required:**
- `Authorization: Bearer <token>`

**Success Response (200):**
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

**Error Response:**
- `401`: Unauthorized

## Validation Rules
- Username: Minimum 3 characters, lowercase
- Email: Valid email format
- Password: Minimum 8 characters
- First name: Minimum 3 characters
- Last name: Minimum 3 characters

## Notes
- All successful responses include a JWT token in cookies
- Token is automatically cleared on logout
- All dates are in ISO 8601 format
- All responses follow the format: `{ status, data, message }`
