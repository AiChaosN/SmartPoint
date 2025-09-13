from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

class TaskData(BaseModel):
    """Type annotation for task/reminder data structure"""
    id: str
    title: str
    speak: str
    time: str  # ISO format datetime string
    leadMinutes: Optional[int] = None
    rrule: Optional[str] = None
    confirmRequired: Optional[bool] = None
    nudgeEveryMinutes: Optional[int] = None
    maxNudges: Optional[int] = None

class TaskDataList(BaseModel):
    """Type annotation for list of task data"""
    tasks: List[TaskData]

# Type aliases for convenience
TaskDataType = TaskData
TaskDataListType = List[TaskData]