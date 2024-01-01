#!/bin/bash

# Navigate to the backend folder
cd backend

# Install backend dependencies
yarn


# Run backend project
yarn dev &

# Navigate to the frontend folder
cd ../frontend

# Install frontend dependencies
yarn

# Run frontend project
yarn start
