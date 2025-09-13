from pydoc import text
from sqlite3 import TimestampFromTicks
from flask import Flask, jsonify, request
from flask_cors import CORS
from Utils import plan_to_json, json_to_daily_overview

app = Flask(__name__)
CORS(app)  # 启用CORS支持

DATA = [
  {
    "id": "med-morning",
    "title": "Morning meds",
    "speak": "It’s time to take your morning pills. Take the white tablet and drink some water.",
    "time": "2025-09-14T08:00:00+08:00",
    "leadMinutes": 0,
    "rrule": "FREQ=DAILY",
    "confirmRequired": True,
    "nudgeEveryMinutes": 2,
    "maxNudges": 2
  },
  {
    "id": "walk",
    "title": "Short walk",
    "speak": "Let’s go downstairs for a 10-minute walk. Remember your hat.",
    "time": "2025-09-14T10:00:00+08:00",
    "confirmRequired": True
  },
  {
    "id": "water",
    "title": "Drink water",
    "speak": "Remember to drink a glass of warm water to stay hydrated.",
    "time": "2025-09-14T14:30:00+08:00",
    "leadMinutes": 0,
    "confirmRequired": True
  },
  {
    "id": "med-evening",
    "title": "Evening meds",
    "speak": "It's time for your evening medication. Please follow the instructions.",
    "time": "2025-09-14T20:00:00+08:00",
    "leadMinutes": 0,
    "rrule": "FREQ=DAILY",
    "confirmRequired": True
  }
]

plan = ""
tasks = []
overview = ""


# 返回默认json
@app.get("/")
def root():
    return jsonify(DATA)

# Client send PlanString
@app.post("/sendplan")
def sendplan():
    global plan
    data = request.get_json()
    plan = data.get('plan', '')
    return jsonify({"status": "success", "message": "Plan saved successfully"})

# Client get DailyTasks
@app.get("/getdailytasks")
def getdailytasks():
    global plan
    if plan:
        result = plan_to_json(plan)
        return jsonify(result)
    else:
        return jsonify({"error": "No plan available"}), 400

# Client push DailyTasks
@app.post("/pushdailytasks")
def pushdailytasks():
    global tasks
    data = request.get_json()
    tasks = data.get('tasks', [])
    return jsonify({"status": "success", "message": "Tasks updated successfully"})

# Client get DailyOverview
@app.get("/getdailyoverview")
def getdailyoverview():
    global tasks, overview
    if tasks:
        overview = json_to_daily_overview(tasks)
        return jsonify({"overview": overview})
    else:
        return jsonify({"error": "No tasks available"}), 400

if __name__ == "__main__":
    # 0.0.0.0 便于本机/局域网访问，端口 8000
    app.run(host="0.0.0.0", port=8000)
