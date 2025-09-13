from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from Functions.StringToJson import string_to_json

app = FastAPI(title="SmartPoint Task API", version="1.0.0")

# Import TaskData from DataFormat.py and llm_do from connectonion
from DataFormat import TaskData
from connectonion import llm_do
from todo import TaskManager

# Initialize task manager
task_manager = TaskManager()

class StringInput(BaseModel):
    input_string: str

@app.post("/process", response_model=TaskData)
async def process_string(request: StringInput):
    """Process a string input and return a formatted TaskData JSON"""
    input_text = request.input_string
    
    # Use llm_do to convert string to TaskData format
    # result = llm_do(
    #     system_prompt="convert.md",
    #     user_prompt=input_text,
    #     output=TaskData
    # )
    result = string_to_json(input_string=input_text)
    
    # Ensure the result has an ID if not provided
    if not hasattr(result, 'id') or not result.id:
        result.id = str(uuid.uuid4())
    
    # Store the task in task manager
    task_manager.insert_task(result)
    return result

@app.get("/tasks", response_model=List[TaskData])
async def get_all_tasks():
    """Get all tasks from storage"""
    return task_manager.get_all_tasks()



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)