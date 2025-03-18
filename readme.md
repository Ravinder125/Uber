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

# Captain API Documentation

## Base URL
All captain endpoints are prefixed with `/api/v1/captains`

## Endpoints

### 1. Register Captain
**POST** `/register`

**Validation Rules:**
- firstname, lastname: min 3 chars
- email: valid email format
- password: 8-50 chars
- phone: exactly 10 digits
- status: "active" or "inactive"
- vehicle.color: min 3 chars
- vehicle.plate: min 3 chars
- vehicle.type: must be "car", "bike", "van", or "auto"
- capacity: numeric, min 1

**Request Body:**
```json
{
    "fullname": {
        "firstname": "John",
        "middlename": "Robert",
        "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "password": "securepass123",
    "phone": "1234567890",
    "status": "active",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "type": "car"
    },
    "location": {
        "lat": 12.9716,
        "lng": 77.5946
    }
}
```

**Success Response (200):**
```json
{
    "status": 200,
    "data": {
        "fullName": {
            "firstName": "John",
            "middleName": "Robert",
            "lastName": "Smith"
        },
        "email": "john.smith@example.com",
        "phone": "1234567890",
        "status": "active",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "location": {
            "lat": 12.9716,
            "lng": 77.5946
        },
        "createdAt": "2024-01-20T12:00:00.000Z"
    },
    "message": "Captain is successfully created"
}
```

**Error Responses:**
- `400`: Validation errors or captain already exists
```json
{
    "message": "Validation error",
    "error": [
        "First name must be at least 3 characters long",
        "Phone must be 10 digits long",
        "Vehicle type must be car, bike, van or auto"
    ]
}
```

## Captain Model Fields
- **fullName**: Object (firstName, middleName, lastName)
- **email**: String (unique, required)
- **password**: String (8-50 chars, hashed)
- **phone**: String (10 digits, unique)
- **status**: String (active/inactive)
- **vehicle**: Object
  - color: String (min 3 chars)
  - plate: String (min 3 chars)
  - capacity: Number (min 1)
  - vehicleType: String (car/bike/van/auto)
- **location**: Object (lat, lng)
- **socketId**: String (for real-time tracking)

## Notes
- All successful responses include a JWT token in cookies
- Token is automatically cleared on logout
- All dates are in ISO 8601 format
- All responses follow the format: `{ status, data, message }`
