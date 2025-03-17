# /users/register Endpoint Documentation

## Description
Registers a new user by validating the provided credentials and creating a user record.

## Endpoint
**POST** `/users/register`

## Request Data
- **username**: string (min. 3 characters, must be in lowercase)
- **email**: string (valid email format)
- **fullname**: object  
    - **firstname**: string (min. 3 characters, trimmed, required)
    - **middlename**: string (optional)
    - **lastname**: string (min. 3 characters, required)
- **password**: string (min. 8 characters)

## Request Body
```json
{
    "username": "johndoe",
    "email": "johndoe@example.com",
    "fullname": {
        "firstname": "John",
        "middlename": "A.",
        "lastname": "Doe"
    },
    "password": "password123"
}
```

## Response Status Codes
- **201**: User created successfully.
- **400**: Validation error or user already exists.
- **500**: Server error.

## Example Response
### Success (201)
```json
{
    "message": "User created successfully.",
    "userId": "12345"
}
```

### Validation Error (400)
```json
{
    "error": "Validation error",
    "details": "Username already exists."
}
```

### Server Error (500)
```json
{
    "error": "Server error",
    "details": "An unexpected error occurred."
}
```
