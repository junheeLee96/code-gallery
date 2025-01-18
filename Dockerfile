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

# Copy Prisma schema file
COPY prisma/schema.prisma ./prisma/

# Add build arguments
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG DATABASE_URL
ARG AUTH_SECRET
ARG AUTH_TRUST_HOST
ARG AUTH_URL
ARG NEXT_PUBLIC_REDIRECT_URI
ARG NEXT_PUBLIC_API_URL

# Set environment variables
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST
ENV AUTH_URL=$AUTH_URL
ENV NEXT_PUBLIC_REDIRECT_URI=$NEXT_PUBLIC_REDIRECT_URI
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Create a .env.local file with the environment variables
RUN echo "GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID" >> .env.local && \
    echo "GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET" >> .env.local && \
    echo "DATABASE_URL=$DATABASE_URL" >> .env.local && \
    echo "AUTH_SECRET=$AUTH_SECRET" >> .env.local && \
    echo "AUTH_TRUST_HOST=$AUTH_TRUST_HOST" >> .env.local && \
    echo "AUTH_URL=$AUTH_URL" >> .env.local && \
    echo "NEXT_PUBLIC_REDIRECT_URI=$NEXT_PUBLIC_REDIRECT_URI" >> .env.local && \
    echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> .env.local

# Generate Prisma client
RUN npx prisma generate

RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run npm start script when container starts
CMD ["npm", "start"]