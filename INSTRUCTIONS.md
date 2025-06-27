# Server Control Commands

Here are the exact commands to manage the development servers for this project on Windows.

---

### 1. Kill All Servers (Force Stop)

Run this command from the project root in any terminal to immediately stop all running frontend and backend servers.

```powershell
taskkill /F /IM python.exe; taskkill /F /IM node.exe
```

---

### 2. Run Frontend Server

Open a new terminal and ensure you are in the project root directory (`E:\openwebbb\open-webui`). Then run the following command. This terminal will be dedicated to the frontend server.

```powershell
pnpm dev
```
The server is typically available at `http://localhost:5173`.

---

### 3. Run Backend Server (for `test.html`)

Open a **separate, new terminal** and ensure you are in the project root directory (`E:\openwebbb\open-webui`). Then run the following commands to start the Python server.

```powershell
cd backend
python -m http.server 8000
```
This server will make `test.html` available at `http://localhost:8000/test.html`. 