# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Add build arguments
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_NAME
ARG DB_PASSWORD
ARG NEXTAUTH_SECRET
ARG NEXT_PUBLIC_REDIRECT_URI
ARG NEXT_PUBLIC_API_URL


# Set environment variables
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_USER=$DB_USER
ENV DB_NAME=$DB_NAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXT_PUBLIC_REDIRECT_URI=$NEXT_PUBLIC_REDIRECT_URI
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL


# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run npm start script when container starts
CMD ["npm", "start"]

