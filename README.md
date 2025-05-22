## Quick Start

1. **Clone the repo**

```bash
git clone https://github.com/1cornerstone/career-test.git
cd career-test
```

2. **Create .env file**
    ```
   PORT=3000
   JWT_SECRET=
   JWT_EXPIRES_IN=2h
   MONGO_URI=mongodb://mongodb:27017/test
   SAFEHAVEN_CLIENT_ID=
   CLIENT_ASSERTION=
   ```

3. **Install node modules**
    ``npm install``
4. **Run docker compose** ``docker-compose up --build``
5. **Access API docs**
    ```
    Open http://localhost:3000/api-docs in your browser.
    ```