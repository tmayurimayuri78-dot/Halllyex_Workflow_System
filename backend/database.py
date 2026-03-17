from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client.workflowdb

workflows = db.workflows
steps = db.steps
rules = db.rules
logs = db.execution_logs