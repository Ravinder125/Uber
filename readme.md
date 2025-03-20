# Backend API Documentation

## API Response Format
All endpoints use a consistent response structure via ApiResponse:

```json
{
    "success": true|false,
    "status": "<http_status_code>",
    "data": null|{},
    "error": [],
    "message": "Response message"
}
```

## Base URLs
- Users API: `/api/v1/users`
- Captains API: `/api/v1/captains`

## Authentication
All protected endpoints require JWT token via:
- Cookie: `token`
- Header: `Authorization: Bearer <token>`

## User Endpoints

### 1. Register User
**POST** `/api/v1/users/register`

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
    "success": true,
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
    "error": [],
    "message": "User created successfully"
}
```

**Error Response (400):**
```json
{
    "success": false,
    "status": 400,
    "data": null,
    "error": ["User already exists"],
    "message": "Registration failed"
}
```

### 2. Login User
**POST** `/api/v1/users/login`

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
    "success": true,
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
    "error": [],
    "message": "User logged in successfully"
}
```

**Error Response (401):**
```json
{
    "success": false,
    "status": 401,
    "data": null,
    "error": ["Invalid email or password"],
    "message": "Authentication failed"
}
```

### 3. Get User Profile
**GET** `/api/v1/users/profile`

**Headers Required:**
- `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
    "success": true,
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
    "error": [],
    "message": "User profile fetched successfully"
}
```

**Error Response (401):**
```json
{
    "success": false,
    "status": 401,
    "data": null,
    "error": ["Unauthorized"],
    "message": "Unauthorized"
}
```

### 4. Logout User
**GET** `/api/v1/users/logout`

**Headers Required:**
- `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
    "success": true,
    "status": 200,
    "data": {
        "username": "johndoe",
        "email": "johndoe@example.com"
    },
    "error": [],
    "message": "User logged out successfully"
}
```

**Error Response (401):**
```json
{
    "success": false,
    "status": 401,
    "data": null,
    "error": ["Unauthorized"],
    "message": "Unauthorized"
}
```

## Captain Endpoints

### 1. Register Captain
**POST** `/api/v1/captains/register`

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

**Success Response (201):**
```json
{
    "success": true,
    "status": 201,
    "data": {
        "newCaptain": {
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
        "token": "jwt.token.here"
    },
    "error": [],
    "message": "Captain successfully created"
}
```

**Error Response (400):**
```json
{
    "success": false,
    "status": 400,
    "data": null,
    "error": [
        "First name must be at least 3 characters long",
        "Phone must be 10 digits long"
    ],
    "message": "Validation error"
}
```

### 2. Login Captain
**POST** `/api/v1/captains/login`

**Request Body:**
```json
{
    "email": "john.smith@example.com",
    "password": "securepass123"
}
```

**Success Response (200):**
```json
{
    "success": true,
    "status": 200,
    "data": {
        "captain": {
            "fullName": {
                "firstName": "John",
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
            }
        },
        "token": "jwt.token.here"
    },
    "error": [],
    "message": "Captain successfully logged in"
}
```

**Error Response (401):**
```json
{
    "success": false,
    "status": 401,
    "data": null,
    "error": ["Invalid email or password"],
    "message": "Authentication failed"
}
```

### 3. Get Captain Profile
**GET** `/api/v1/captains/profile`

**Headers Required:**
- `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
    "success": true,
    "status": 200,
    "data": {
        "captain": {
            "fullName": {
                "firstName": "John",
                "lastName": "Smith"
            },
            "email": "john.smith@example.com",
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
            }
        }
    },
    "error": [],
    "message": "Captain profile fetched successfully"
}
```

**Error Response (401):**
```json
{
    "success": false,
    "status": 401,
    "data": null,
    "error": ["Unauthorized"],
    "message": "Unauthorized"
}
```

### 4. Logout Captain
**GET** `/api/v1/captains/logout`

**Headers Required:**
- `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
    "success": true,
    "status": 200,
    "data": {
        "blacklistToken": {
            "token": "previous.jwt.token",
            "createdAt": "2024-01-20T12:00:00.000Z"
        }
    },
    "error": [],
    "message": "Captain successfully logged out"
}
```

**Error Response (401):**
```json
{
    "success": false,
    "status": 401,
    "data": null,
    "error": ["Unauthorized"],
    "message": "Unauthorized"
}
```

## Common Error Responses

### Token Errors
```json
{
    "success": false,
    "status": 400,
    "data": null,
    "error": ["No token provided"],
    "message": "Token error"
}
```

### Server Errors
```json
{
    "success": false,
    "status": 500,
    "data": null,
    "error": ["Error occurred while processing request"],
    "message": "Internal server error"
}
```

## Technical Notes & Security Features
1. All tokens expire as per JWT_EXPIRY env variable
2. Blacklisted tokens are automatically removed after 24 hours
3. Passwords are not returned in responses
4. All successful auth responses include both cookie and token in response

## Authentication Details
- Tokens are provided both as HTTP-only cookies and in response body
- Token options:
  - httpOnly: true
  - secure: true (in production)
  - sameSite: 'None'
- Token blacklisting is implemented for logout
- Authorization can be provided via:
  - Cookie: `token`
  - Header: `Authorization: Bearer <token>`
