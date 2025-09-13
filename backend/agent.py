from connectonion import Agent
from .todo import TaskManager
# 1. Write your prompt
prompt = "You are a helpful assistant"

# 2. Define your function  


# 3. Create agent
agent = Agent(prompt, tools=[TaskManager])

