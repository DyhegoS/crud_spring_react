# Person Management System

A complete person management system developed with **Spring Boot** on the backend and **React** on the frontend, allowing you to create, read, update, and delete person records with image upload support.

## 📋 Overview

This project is a full-stack application that manages a database of people with the following features:

- Person registration with name and city
- Image upload and storage
- User-friendly React interface
- REST API with Spring Boot
- CORS enabled for frontend-backend communication

## 🛠️ Technologies Used

### Backend

- **Java 25**
- **Spring Boot 4.0.5**
- **Spring MVC** - For building REST API
- **Jakarta Persistence (JPA/Hibernate)** - For ORM
- **MySQL** - Database
- **Lombok** - To reduce code boilerplate
- **Maven** - Dependency manager

### Frontend

- **React 19.2.4** - UI library
- **Vite 8.0.4** - Build tool and dev server
- **Bootstrap 5.3.8** - CSS framework
- **ESLint** - Code quality linter

## 📁 Project Structure

```
spring_react/
├── backend/                          # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/br/com/api/person/
│   │   │   │   ├── PersonApplication.java        # Main class
│   │   │   │   ├── controller/
│   │   │   │   │   ├── PersonController.java     # REST endpoints
│   │   │   │   │   └── exceptions/               # Exception handling
│   │   │   │   ├── entities/
│   │   │   │   │   ├── Person.java               # Person entity
│   │   │   │   │   └── dto/
│   │   │   │   │       └── PersonDTO.java        # Data Transfer Object
│   │   │   │   ├── services/
│   │   │   │   │   ├── PersonService.java        # Business logic
│   │   │   │   │   └── exceptions/
│   │   │   │   │       └── ResourceNotFoundException.java
│   │   │   │   └── repositories/
│   │   │   │       └── PersonRepository.java     # Data access
│   │   │   └── resources/
│   │   │       └── application.properties        # Configuration
│   │   └── test/                                 # Tests
│   ├── pom.xml                       # Maven configuration
│   └── mvnw / mvnw.cmd              # Maven Wrapper
│
└── frontend/                         # React Application
    ├── src/
    │   ├── App.jsx                   # Main component
    │   ├── main.jsx                  # Entry point
    │   └── components/
    │       ├── FormComponent.jsx     # Registration form
    │       ├── TableComponent.jsx    # Person listing table
    │       └── Modal.jsx             # Edit modal
    ├── public/                       # Static files
    ├── index.html                    # Main HTML
    ├── package.json                  # npm dependencies
    ├── vite.config.js                # Vite configuration
    └── eslint.config.js              # ESLint configuration
```

## 🚀 How to Run

### Prerequisites

- **Java 25** installed
- **Node.js 18+** installed
- **MySQL 8.0+** installed and running
- **Maven** (or use the provided Maven Wrapper)

### Step 1: Configure the Database

1. Open MySQL and create a database:

```sql
CREATE DATABASE spring_react;
```

2. Check the credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/spring_react?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=12345678
```

### Step 2: Run the Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Clean and compile the project:

```bash
mvnw clean compile
```

3. Start the Spring Boot application:

```bash
mvnw spring-boot:run
```

4. The server will be available at `http://localhost:8080`

### Step 3: Run the Frontend

In another terminal, navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

4. Access the application at `http://localhost:5173`

## 🔌 API Endpoints

### GET `/persons` or `/persons/select`

Returns the list of all registered persons.

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "John Smith",
    "city": "New York",
    "img": "base64ImageData...",
    "extension": "jpg"
  }
]
```

### POST `/persons/insert`

Creates a new person record with image upload.

**Parameters (multipart/form-data):**

- `name` (string) - Person's name
- `city` (string) - City
- `img` (file) - Image file

**Response (201 Created):**

```json
{
  "id": 2,
  "name": "Jane Doe",
  "city": "Los Angeles",
  "img": "base64ImageData...",
  "extension": "png"
}
```

### PUT `/persons/{id}`

Updates an existing person record.

**Parameters (JSON):**

```json
{
  "id": 1,
  "name": "John Smith Updated",
  "city": "Boston"
}
```

**Response (200 OK):** Updated person

### DELETE `/persons/{id}`

Deletes a person record.

**Response (204 No Content)**

## 🔐 CORS Configuration

The backend is configured with CORS enabled for `http://localhost:5173` (frontend development URL).

To change the allowed URL, modify the annotation in `PersonController.java`:

```java
@CrossOrigin(value = "http://your-domain.com")
```

## 📦 Data Structure

### Person Entity

```java
@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String city;

    @Lob
    private byte[] img;          // Image in bytes
    private String extension;     // File extension (jpg, png, etc)
}
```

## 🔧 Important Configuration

### Backend (application.properties)

```properties
spring.application.name=spring_react

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/spring_react?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=12345678

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

### Frontend (vite.config.js)

- Default port: `5173`
- Build output: `dist/`

## 📝 npm Scripts (Frontend)

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🧪 Tests

To run backend tests:

```bash
cd backend
mvnw test
```

## 📋 Interface Features

- **Person Table**: Lists all registered persons
- **Registration Form**: Allows adding a new person with image upload
- **Edit Modal**: Allows editing a person's data
- **Delete**: Removes person from the system
- **Image Upload**: Supports uploading images in various formats

## 🐛 Exception Handling

The project implements custom exception handling:

- `ResourceNotFoundException` - When a resource is not found
- `FieldMessage` - Field error details
- `StandardError` - Standard error response format

## 🚢 Production Build

### Backend

```bash
cd backend
mvnw clean package
java -jar target/person-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd frontend
npm run build
```

Production-ready files will be in `frontend/dist/`

## 📞 Support

If you have questions or problems, verify:

1. If MySQL is running
2. If the database credentials are correct
3. If ports 8080 (backend) and 5173 (frontend) are available
4. If Java 25 and Node.js are installed correctly

## 📄 License

This project is open source and available for educational and commercial use.

---

**Developed by Dyhego Silva**
