# Booking System TypeScript API

This is a RESTful API built using NestJS and TypeScript that enables users to reserve appointments, services, or resources through a booking system. The API provides functionality for managing availability, user authentication, and notifications for booking confirmations or reminders.

## Features

- **Availability Management:** The API allows administrators to manage the availability of appointments, services, or resources. This includes defining working hours, blocking specific time slots, and managing overlapping bookings.

- **User Authentication:** Users can sign up, log in, and manage their bookings through authenticated routes. Authentication ensures that only authorized users can access protected endpoints.

- **Booking Reservations:** Users can reserve appointments, services, or resources by specifying the desired date, time slot, and any additional details. The API handles the validation of available slots and creates bookings accordingly.

- **Notifications:** Users receive notifications for booking confirmations and reminders. This feature helps users stay informed about their upcoming reservations and reduces the risk of missed appointments.

## Installation

- Clone the repository: `git clone https://github.com/BaseMax/BookingGraphQLTS.git`
- Navigate to the project directory: `cd BookingGraphQLTS`
- Install the dependencies: `yarn install`

## Configuration

- Rename the `.env.example` file to `.env`.
- Open the `.env` file and modify the configuration variables according to your needs. This may include database connection settings, authentication secrets, and email notification settings.

## Database Setup

- Create a database for the application.
- Update the `DATABASE_URL` variable in the `.env` file with your database connection string.

## Running the Application

To start the API server, run the following command:

```
npm run start
```

The server will start running on http://localhost:3000 by default. You can modify the port in the .env file.

## API Documentation

The API documentation can be found at http://localhost:3000/api/swagger when the server is running. It provides detailed information about the available endpoints, request/response formats, and authentication requirements.

## Testing

To run the tests for the API, use the following command:

```
npm run test
```

The test suite includes unit tests, integration tests, and end-to-end tests to ensure the functionality of the API.

## API Routes

| Route |	Method |	Description |
| ----- | ------ | ------------ |
| `/api/auth/signup` |	POST |	Register a new user account |
| `/api/auth/login` |	POST |	Authenticate and log in a user |
| `/api/auth/logout` |	POST |	Log out the currently authenticated user |
| `/api/bookings` |	GET |	Get all bookings (admin only) |
| `/api/bookings` |	POST |	Create a new booking |
| `/api/bookings/:id` |	GET | |	Get a specific booking by ID |
| `/api/bookings/:id` |	PUT |	Update a specific booking by ID |
| `/api/bookings/:id` |	DELETE |	Delete a specific booking by ID |
| `/api/availability` |	GET |	Get availability for a specific date |
| `/api/availability` |	POST | Add availability for a specific date |
| `/api/availability/:id` |	GET |	Get availability by ID |
| `/api/availability/:id` |	PUT |	Update availability by ID |
| `/api/availability/:id` |	DELETE |	Delete availability by ID |
| `/api/users` |	GET |	Get all users (admin only) |
| `/api/users/:id` |	GET |	Get a specific user by ID |
| `/api/users/:id` |	PUT |	Update a specific user by ID |
| `/api/users/:id` |	DELETE |	Delete a specific user by ID |

This table provides an overview of the routes available in the Booking System API, along with their associated HTTP methods and descriptions. Please note that this is just a sample and you may have additional routes or modify the existing ones based on your specific project requirements.

## Models

### User Model

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Booking Model

```typescript
interface Booking {
  id: number;
  userId: number;
  resourceId: number;
  startDate: Date;
  endDate: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Resource Model

```typescript
interface Resource {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Availability Model

```typescript
interface Availability {
  id: number;
  resourceId: number;
  date: Date;
  slots: AvailabilitySlot[];
  createdAt: Date;
  updatedAt: Date;
}

interface AvailabilitySlot {
  startTime: Date;
  endTime: Date;
}
```

These models represent the entities used in the Booking System API. The User model represents a user account, the Booking model represents a booking made by a user, the Resource model represents a resource that can be booked, and the Availability model represents the availability of a resource on a specific date, divided into slots.

## API Examples

Here's an example of the request and response bodies for the routes in the Booking System API:

### Sign Up (POST /api/auth/signup)

**Request Body**

```typescript
interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}
```

**Response Body**

```typescript
interface SignUpResponse {
  user: User;
  token: string;
}
```

### Log In (POST /api/auth/login)

**Request Body**

```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

**Response Body**

```typescript
interface LoginResponse {
  user: User;
  token: string;
}
```

### Log Out (POST /api/auth/logout)

**No Request Body**

**No Response Body**

### Get All Bookings (GET /api/bookings)

**No Request Body**

**Response Body**

```typescript
interface GetAllBookingsResponse {
  bookings: Booking[];
}
```

### Create Booking (POST /api/bookings)

**Request Body**

```typescript
interface CreateBookingRequest {
  resourceId: number;
  startDate: Date;
  endDate: Date;
  notes: string;
}
```

**Response Body**

```typescript
interface CreateBookingResponse {
  booking: Booking;
}
```

### Get Booking by ID (GET /api/bookings/:id)

**No Request Body**

**Response Body**

```typescript
interface GetBookingResponse {
  booking: Booking;
}
```

### Update Booking by ID (PUT /api/bookings/:id)

**Request Body**

```typescript
interface UpdateBookingRequest {
  startDate?: Date;
  endDate?: Date;
  notes?: string;
}
```

**Response Body**

```typescript
interface UpdateBookingResponse {
  booking: Booking;
}
```

### Delete Booking by ID (DELETE /api/bookings/:id)

**No Request Body**

**No Response Body**

### Get Availability for Date (GET /api/availability)

**Request Body**

```typescript
interface GetAvailabilityRequest {
  date: Date;
}
```

**Response Body**

```typescript
interface GetAvailabilityResponse {
  availability: Availability[];
}
```

### Add Availability for Date (POST /api/availability)

**Request Body**

```typescript
interface AddAvailabilityRequest {
  resourceId: number;
  date: Date;
  slots: AvailabilitySlot[];
}
```

**Response Body**

```typescript
interface AddAvailabilityResponse {
  availability: Availability;
}
```

### Get Availability by ID (GET /api/availability/:id)

**No Request Body**

**Response Body**

```typescript
interface GetAvailabilityResponse {
  availability: Availability;
}
```

### Update Availability by ID (PUT /api/availability/:id)

**Request Body**

```typescript
interface UpdateAvailabilityRequest {
  slots?: AvailabilitySlot[];
}
```

**Response Body**

```typescript
interface UpdateAvailabilityResponse {
  availability: Availability;
}
```

### Delete Availability by ID (DELETE /api/availability/:id)

**No Request Body**

**No Response Body**

### Get All Users (GET /api/users)

No Request Body

Response Body

```typescript
interface GetAllUsersResponse {
  users: User[];
}
```

### Get User by ID (GET /api/users/:id)

**No Request Body**

**Response Body**

```typescript
interface GetUserResponse {
  user: User;
}
```

### Update User by ID (PUT /api/users/:id)

**Request Body**

```typescript
interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}
```

**Response Body**

```typescript
interface UpdateUserResponse {
  user: User;
}
```

### Delete User by ID (DELETE /api/users/:id)

**No Request Body**

**No Response Body**

Please note that these are just examples, and the actual request and response bodies may vary based on your specific project requirements. You can customize the request and response bodies by adding or removing fields as needed.

## Contributing

Contributions are welcome! If you find any bugs or want to suggest new features, please open an issue or submit a pull request to the repository.

## License

This project is licensed under the MIT License.

Copyright 2023, Max Base

