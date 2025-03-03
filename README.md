## Prerequisites

- Docker installed on your machine.
- Docker Compose installed.

## Commands

1. **Build the Docker images:**

   ```sh
   docker compose build
   ```

2. **Start the services in detached mode:**

   ```sh
   docker compose up -d
   ```

3. **Access the shell of the running web container:**

   ```sh
   docker exec -it web /bin/sh
   ```
