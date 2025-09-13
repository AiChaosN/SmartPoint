pls convert the string to the output format 

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