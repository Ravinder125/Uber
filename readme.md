# Backend API Documentation

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
- `400`: Validation errors or user already exists
- `500`: Internal server error - User not created

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
- `400`: Missing email or password
- `401`: Invalid email or password

### 3. Get User Profile
**GET** `/api/v1/users/profile`

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
**GET** `/api/v1/users/logout`

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

**Success Response (200):**
```json
{
    "status": 200,
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
    "message": "Captain successfully created"
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
    "message": "Captain successfully logged in"
}
```

**Error Responses:**
- `400`: Missing email/password or invalid credentials

### 3. Get Captain Profile
**GET** `/api/v1/captains/profile`

**Headers Required:**
- `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
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
    "message": "Captain profile fetched successfully"
}
```

### 4. Logout Captain
**GET** `/api/v1/captains/logout`

**Headers Required:**
- `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
    "status": 200,
    "data": {
        "blacklistToken": {
            "token": "previous.jwt.token",
            "createdAt": "2024-01-20T12:00:00.000Z"
        }
    },
    "message": "Captain successfully logged out"
}
```

## Error Responses

### Validation Error (400)
```json
{
    "message": "Validation Error",
    "errors": [
        "Field specific error message"
    ]
}
```

### Authentication Error (401)
```json
{
    "message": "Unauthorized request"
}
```

## Security Features
- Password hashing using bcrypt
- JWT token blacklisting on logout
- Token expiry management
- HTTP-only cookies for token storage
- Input validation and sanitization

## Technical Notes
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
