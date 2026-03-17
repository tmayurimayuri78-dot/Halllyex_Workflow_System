from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import workflows, steps, rules, logs
from rule_engine import evaluate_rules
import uuid
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/workflows")
def get_workflows():

    data = []

    for wf in workflows.find({}, {"_id":0}):
        data.append(wf)

    return data

@app.get("/")
def home():
    return {"message": "Workflow system running"}

@app.post("/workflows")
def create_workflow(data: dict):
    workflows.insert_one(data)
    return {"message": "Workflow created"}

@app.post("/steps")
def create_step(data: dict):
    steps.insert_one(data)
    return {"message": "Step created"}

@app.post("/rules")
def create_rule(data: dict):
    rules.insert_one(data)
    return {"message": "Rule created"}

@app.post("/execute/{workflow_id}")
def execute_workflow(workflow_id: str, input_data: dict):

    execution_id = str(uuid.uuid4())
    start_time = datetime.utcnow()

    amount = input_data["amount"]

    step = steps.find_one({"workflow_id": workflow_id})

    if not step:
        return {"message": "No step found"}

    step_rules = list(rules.find({"step_id": step["id"]}))

    matched_rule = evaluate_rules(step_rules, amount)

    end_time = datetime.utcnow()

    log_data = {
        "execution_id": execution_id,
        "workflow_id": workflow_id,
        "step": step["name"],
        "rule_applied": matched_rule["condition"] if matched_rule else "None",
        "status": "COMPLETED" if matched_rule else "FAILED",
        "start_time": start_time,
        "end_time": end_time
    }

    logs.insert_one(log_data)

    if matched_rule:
        return {
            "current_step": step["name"],
            "rule_applied": matched_rule["condition"],
            "next_step": matched_rule["next_step_id"]
        }
    else:
        return {
            "current_step": step["name"],
            "rule_applied": "No rule",
            "next_step": "End"
        }

@app.get("/logs")
def get_logs():
    return list(logs.find({}, {"_id": 0}).sort("start_time", -1))
