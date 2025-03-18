# API Endpoint Documentation

## /users/login Endpoint

**Description:**  
Logs in a user using email and password.

**Endpoint:**  
**POST** `/users/login`

**Request Data:**
- **email**: string (valid email format, required)
- **password**: string (min. 8 characters, required)

**Response Status Codes:**
- **200**: User logged in successfully.
- **400**: Validation error or missing fields.
- **401**: Invalid email or password.

**Example Request:**
```json
{
    "email": "johndoe@example.com",
    "password": "password123"
}
```

**Example Response:**
```json
{
    "status": 200,
    "data": {
        "user": { "username": "johndoe", "email": "johndoe@example.com", "...": "Other user details" },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "message": "User logged in successfully"
}
```

## /users/profile Endpoint

**Description:**  
Retrieves the profile of the authenticated user.

**Endpoint:**  
**GET** `/users/profile`

**Headers:**  
- **Authorization:** Bearer token cookie or header must be provided.

**Response Status Codes:**
- **200**: User profile fetched successfully.
- **401**: Unauthorized access.

**Example Response:**
```json
{
    "status": 200,
    "data": {
        "username": "johndoe",
        "email": "johndoe@example.com",
        "fullName": {
            "firstName": "John",
            "middleName": "A.",
            "lastName": "Doe"
        },
        "...": "Other user details"
    },
    "message": "User profile fetched successfully"
}
```

## /users/logout Endpoint

**Description:**  
Logs out the authenticated user by clearing the token.

**Endpoint:**  
**GET** `/users/logout`

**Headers:**  
- **Authorization:** Bearer token cookie or header must be provided.

**Response Status Codes:**
- **200**: User logged out successfully.

**Example Response:**
```json
{
    "status": 200,
    "data": { "username": "johndoe", "email": "johndoe@example.com", "...": "Other user details" },
    "message": "User logged out successfully"
}
```
