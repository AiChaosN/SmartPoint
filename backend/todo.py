from typing import Dict, List, Optional
from datetime import datetime
import uuid
from DataFormat import TaskData, TaskDataList

class TaskManager:
    """Task manager class for CRUD operations on tasks"""
    
    def __init__(self):
        """Initialize the task manager with default task storage"""
        self.tasks: Dict[str, TaskData] = {
            "default-1": TaskData(
                id="default-1",
                title="Morning Exercise",
                speak="Time for your morning workout!",
                time="2024-01-01T07:00:00Z",
                leadMinutes=10,
                rrule="FREQ=DAILY",
                confirmRequired=True,
                nudgeEveryMinutes=5,
                maxNudges=3
            ),
            "default-2": TaskData(
                id="default-2",
                title="Team Meeting",
                speak="Don't forget about the team meeting",
                time="2024-01-01T10:00:00Z",
                leadMinutes=15,
                rrule="FREQ=WEEKLY;BYDAY=MO",
                confirmRequired=True,
                nudgeEveryMinutes=10,
                maxNudges=2
            ),
            "default-3": TaskData(
                id="default-3",
                title="Lunch Break",
                speak="Time to take a lunch break",
                time="2024-01-01T12:00:00Z",
                leadMinutes=5,
                rrule="FREQ=DAILY;BYHOUR=12",
                confirmRequired=False,
                nudgeEveryMinutes=15,
                maxNudges=1
            )
        }
    
    def insert_task(self, task_data: TaskData) -> TaskData:
        """Insert a new task into the storage
        
        Args:
            task_data: TaskData object to insert
            
        Returns:
            TaskData: The inserted task with generated ID if not provided
        """
        # Generate ID if not provided
        if not task_data.id:
            task_data.id = str(uuid.uuid4())
        
        # Store the task
        self.tasks[task_data.id] = task_data
        return task_data
    
    def update_task(self, task_id: str, **kwargs) -> Optional[TaskData]:
        """Update an existing task
        
        Args:
            task_id: ID of the task to update
            **kwargs: Fields to update (title, speak, time, etc.)
            
        Returns:
            TaskData: Updated task or None if not found
        """
        if task_id not in self.tasks:
            return None
        
        task = self.tasks[task_id]
        
        # Update provided fields
        for field, value in kwargs.items():
            if hasattr(task, field):
                setattr(task, field, value)
        
        return task
    
    def delete_task(self, task_id: str) -> bool:
        """Delete a task from storage
        
        Args:
            task_id: ID of the task to delete
            
        Returns:
            bool: True if deleted, False if not found
        """
        if task_id in self.tasks:
            del self.tasks[task_id]
            return True
        return False
    
    def get_task(self, task_id: str) -> Optional[TaskData]:
        """Get a specific task by ID
        
        Args:
            task_id: ID of the task to retrieve
            
        Returns:
            TaskData: The task or None if not found
        """
        return self.tasks.get(task_id)
    
    def get_all_tasks(self) -> List[TaskData]:
        """Get all tasks
        
        Returns:
            List[TaskData]: List of all tasks
        """
        return list(self.tasks.values())
    
    def get_all_tasks_as_list(self) -> TaskDataList:
        """Get all tasks as TaskDataList format
        
        Returns:
            TaskDataList: All tasks wrapped in TaskDataList format
        """
        return TaskDataList(tasks=list(self.tasks.values()))
    
    def get_tasks_by_time(self, ascending: bool = True) -> List[TaskData]:
        """Get all tasks sorted by time
        
        Args:
            ascending: Sort in ascending order if True, descending if False
            
        Returns:
            List[TaskData]: List of tasks sorted by time
        """
        return sorted(self.tasks.values(), key=lambda x: x.time, reverse=not ascending)
    
    def get_tasks_by_time_as_list(self, ascending: bool = True) -> TaskDataList:
        """Get all tasks sorted by time as TaskDataList format
        
        Args:
            ascending: Sort in ascending order if True, descending if False
            
        Returns:
            TaskDataList: Tasks sorted by time wrapped in TaskDataList format
        """
        sorted_tasks = sorted(self.tasks.values(), key=lambda x: x.time, reverse=not ascending)
        return TaskDataList(tasks=sorted_tasks)
    
    def clear_all_tasks(self) -> None:
        """Clear all tasks from storage"""
        self.tasks.clear()
    
    def task_count(self) -> int:
        """Get the total number of tasks
        
        Returns:
            int: Number of tasks in storage
        """
        return len(self.tasks)