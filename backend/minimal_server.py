#!/usr/bin/env python3

"""
Minimal Open WebUI Backend Server
This provides basic API endpoints to make the frontend work.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import json

app = FastAPI(title="Open WebUI Minimal Backend")

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic data models
class ChatMessage(BaseModel):
    content: str
    role: str = "user"

class ChatResponse(BaseModel):
    content: str
    role: str = "assistant"

# Mock data
MOCK_USER = {
    "id": "user123",
    "name": "Demo User",
    "email": "demo@example.com",
    "role": "user",
    "permissions": {}
}

MOCK_CONFIG = {
    "features": {
        "enable_notes": True,
        "enable_channels": False
    },
    "name": "Your Custom AI",
    "version": "0.6.15"
}

# Basic API endpoints to make frontend work
@app.get("/")
async def root():
    return {"message": "Custom Open WebUI Backend is running!"}

@app.get("/api/v1/auths")
async def get_auths():
    return {"enabled": False}

@app.get("/api/v1/config")
async def get_config():
    return MOCK_CONFIG

@app.get("/api/v1/models")
async def get_models():
    return [
        {
            "id": "demo-model",
            "name": "Demo Model",
            "owned_by": "local",
            "info": {
                "meta": {
                    "profile_image_url": "/static/favicon.png"
                }
            }
        }
    ]

@app.get("/api/v1/users/user")
async def get_current_user():
    return MOCK_USER

@app.post("/api/v1/chats/new")
async def create_chat():
    return {"id": "demo-chat-123", "title": "New Chat", "created_at": "2024-01-01T00:00:00Z"}

@app.get("/api/v1/chats")
async def get_chats():
    return []

@app.post("/api/v1/chats/{chat_id}")
async def update_chat(chat_id: str, message: ChatMessage):
    # Mock response for artifact testing
    if "html" in message.content.lower() or "css" in message.content.lower():
        response_content = f"""
Here's a simple HTML example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Artifact</title>
    <style>
        body {{ font-family: Arial, sans-serif; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); }}
        .container {{ max-width: 600px; margin: 50px auto; padding: 20px; background: white; border-radius: 10px; }}
        h1 {{ color: #333; text-align: center; }}
        p {{ line-height: 1.6; color: #666; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 Your Custom AI</h1>
        <p>This is a test artifact to demonstrate the PDF download feature!</p>
        <p>You can now download this as both HTML and PDF.</p>
    </div>
</body>
</html>
```

This creates a beautiful gradient background with a centered container. You can download this as PDF using the new button!
"""
    else:
        response_content = f"I received your message: {message.content}\n\nI'm a minimal backend for your custom Open WebUI. Try asking me to create some HTML/CSS content to test the PDF download feature!"

    return {
        "id": f"msg-{hash(message.content)}",
        "role": "assistant", 
        "content": response_content,
        "timestamp": "2024-01-01T00:00:00Z"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Custom backend is running"}

if __name__ == "__main__":
    print("🚀 Starting Custom Open WebUI Backend...")
    print("🌐 Frontend should connect to: http://localhost:8080")
    print("📄 PDF download feature is ready!")
    print("🎨 Your customizations are active!")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8080,
        log_level="info"
    ) 