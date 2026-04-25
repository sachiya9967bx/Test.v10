FROM node:18-bullseye-slim

# Setup timezone
ENV TZ=Africa/Nairobi
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install necessary system dependencies for the bot
# ffmpeg for media conversions, imagemagick/webp for stickers, and git for some operations
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg \
    imagemagick \
    webp \
    git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install npm dependencies (production only to save space)
RUN npm install --production

# Bundle app source code
COPY . .

# Run the bot
CMD ["npm", "start"]
