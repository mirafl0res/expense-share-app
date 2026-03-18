# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app


# Install bun
RUN curl -fsSL https://bun.sh/install | bash \
	&& mv /root/.bun/bin/bun /usr/local/bin/bun

# Copy package files and install dependencies
COPY package*.json ./
RUN bun install

# Copy the rest of the app
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the app with bun
CMD ["bun", "run", "./src/index.ts"]