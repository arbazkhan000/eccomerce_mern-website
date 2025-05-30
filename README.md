# E-commerce App (MERN)

## API Documentation

### User Routes

#### 1. Register a New User

**Endpoint**: `/api/auth/register`  
**Method**: `POST`  
**Description**: Registers a new user.

**Request Body**:

```json
{
    "email": "johndoe@example.com",
    "password": "password123"
}
```

**Response**:

```json
{
    "success": true,
    "message": "User profile retrieved successfully",
    "data": {
        "_id": "userId",
        "fullName": "John Doe",
        "email": "johndoe@example.com"
    }
}
```
