# Job Portal
A job portal application built using the MERN stack. This platform enables employers to efficiently post job listings and manage applicants, while job seekers can search for jobs, apply, and manage their profiles seamlessly.

## Table of Contents
1. [About the Project](#1-about-the-project)
2. [Tech Stack](#2-tech-stack)
3. [Features](#3-features)
4. [Getting Started](#4-getting-started)
    - [Prerequisites](#prerequisites)
5. [Installation](#5-installation)
6. [Usage](#6-usage)
7. [API Endpoints](#7-api-endpoints)
8. [Screenshots](#8-screenshots)
9. [Contact](#9-contact)

## 1. About the Project
### Introduction
The Job Portal application is designed to bridge the gap between employers and job seekers. By providing a user-friendly platform, it simplifies the process of job posting, searching, and application. Employers can efficiently manage job listings and applicants, while job seekers can effortlessly find and apply for jobs that match their skills and preferences.

### Project Description
This comprehensive job portal application leverages the power of the MERN stack to deliver a robust and scalable solution. Employers can post job openings, view and manage applicants, and edit or delete job listings as needed. Job seekers can create profiles, update their information, search for jobs, and apply for positions that align with their career goals. The platform also includes features such as user authentication, secure data handling, and seamless integration with external services for enhanced functionality.

## 2. Tech Stack
#### Frontend:
  - React
  - React Router
  - CSS/SCSS or styled-components (or any other CSS framework)
  - TailwindCSS
#### Backend:
  - Node.js
  - Express
#### Database:
  - MongoDB
  - Mongoose (ODM)
#### Other Tools:
  - JWT for authentication
  - bcrypt for password hashing

## 3. Features
- User Authentication and Authorization
- Authenticated Employers can create, update, delete, and view job posts
- Each job post contains Job Title, Salary, and Job Description
- CRUD operations for job posts
- Job application system
- List of applicants for each job post
- View, update, and delete user profiles
- Add, update, and delete educational qualifications

## 4. Getting Started
### Prerequisites
  - Node.js and npm installed
  - MongoDB installed and running

## 5. Installation
1. **Clone the repository:**
   ```
     git clone https://github.com/udayakiranchhotaraya/glosity-job-portal.git
     cd glosity-job-portal
   ```
2. **Install server dependencies:**
   ```
      cd server
      npm install
   ```
3. **Install client dependencies:**
   ```
      cd ../client
      npm install
   ```
4. **Set up environment variables:**
Create a .env file in the server directory and add the following variables:
  ```env
      PORT = your_port_number
      MONGO_USER = your_mongo_username
      MONGO_PASSWORD = your_mongo_password
      MONGO_CLUSTER = your_mongo_cluster
      MONGO_DATABASE = your_db_name
  ```
5. **Run the server:**
   ```
      cd server
      npm start
   ```
6. **Run the client:**
   ```
       cd ../client
       npm start
   ```
## 6. Usage

## 7. API Endpoints
#### User Routes
  ```env
    POST /api/users/signup -- Register an user
    POST /api/users/signin -- Login an user
    GET /api/users/profile -- View profile details
    PUT /api/users/profile/update -- Update profile details
    POST /api/users/profile/education/add -- Add a new education detail
    PUT /api/users/profile/education/:educationId/update -- Update education detail
    DELETE /api/users/profile/education/:educationId/delete -- Delete education detail
    DELETE /api/users/profile -- Delete user profile
    PUT /api/users/apply/:jobId -- Apply to a particular job
    GET /api/users/appliedJobs -- Get all applied jobs for the user
  ```
#### Employer Routes
  ```env
    POST /api/employers/register -- Register an Employer
    POST /api/employers/login -- Login an Employer
    PUT /api/employers/addOrUpdateCompanyDetails -- Add or update Company Details
    PUT /api/employers/job/:jobId/details -- View Job details
    PUT /api/employers/job/:jobId/applicants -- View applicants list for a particular jon
  ```
#### Job Routes
  ```env
    POST /api/job/ -- Create a new job (Employers only)
    POST /api/job/ -- View Jobs and Job details (Request query based search)
    POST /api/job/update/:jobId -- Update a job (Employers only)
    POST /api/job/delete/:jobId -- Delete a job (Employers only)
  ```

## 8. Screenshots

## 9. Contact
