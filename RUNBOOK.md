# Open WebUI - Development Server Runbook (Windows/PowerShell)

This guide contains the exact commands to run the Open WebUI development environment on Windows using PowerShell.

---

### **Step 0: One-Time Setup**

These commands only need to be run **once** to set up the project.

1.  **Install Frontend Dependencies** (from the project root `E:\openwebbb\open-webui`):
    ```powershell
    npm install
    ```

2.  **Install Backend Dependencies** (from the `backend` folder):
    ```powershell
    cd backend
    pip install -r requirements.txt -U
    cd ..
    ```

---

### **How to Run the Application**

You need to have **two separate PowerShell terminals** open.

**Terminal 1: Start the Frontend**

1.  Make sure you are in the project root directory (`E:\openwebbb\open-webui`).
2.  Run the development server:
    ```powershell
    npm run dev
    ```
    Keep this terminal open. The frontend will be available at `http://localhost:5173`.

**Terminal 2: Start the Backend**

1.  In your new, separate terminal, navigate to the `backend` directory:
    ```powershell
    cd backend
    ```
2.  Run the backend server:
    ```powershell
    uvicorn open_webui.main:app --port 8080 --host 0.0.0.0 --reload
    ```
    Keep this terminal open.

Once both are running, the full application will be available at `http://localhost:5173`.

---

### **How to Stop Everything**

To fully stop all servers, run this command from any terminal:

```powershell
taskkill /F /IM node.exe; taskkill /F /IM python.exe
``` 