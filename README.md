 Halleyx Workflow Automation System🤖

<p align="center">
  <b>Dynamic Rule-Based Workflow Execution Engine</b><br>
  <i>Built with FastAPI, MongoDB & JS</i>
</p>

---

📌 Project Overview

This project is a **full-stack Workflow Automation System** that dynamically executes workflows using a **rule engine**.

Instead of hardcoding logic, decisions are made based on **conditions stored in the database**, making the system flexible and scalable.

---

🧠 Architecture

```text
Workflow → Steps → Rules → Execution → Audit Logs
```

⚙️ Features
```
| Feature                | Description                             |
| ---------------------- | --------------------------------------- |
| 🧩 Workflow Management | Create workflows with ID, name, version |
| 🔁 Step Execution      | Multi-step process handling             |
| ⚡ Rule Engine          | Condition-based dynamic decision making |
| 🧪 Execution API       | Run workflows with input (amount)       |
| 📊 Audit Logs          | Tracks execution history                |
| 🟢 Status Tracking     | COMPLETED / FAILED                      |
| 🌐 Multi-Page UI       | Home, Workflows, Execute, Logs          |

```
🛠 Tech Stack
```
| Layer       | Technology            |
| ----------- | --------------------- |
| 🔧 Backend  | FastAPI (Python)      |
| 🗄 Database | MongoDB               |
| 🎨 Frontend | HTML, CSS, JavaScript |

```
📁 Project Structure
```
halleyx-project/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── rule_engine.py
│
├── frontend/
│   ├── index.html
│   ├── workflows.html
│   ├── execute.html
│   ├── logs.html
│   ├── create.html
│   ├── script.js
│   ├── style.css
│
└── README.md

```
▶️ How to Run
🔧 Backend
```

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

```
🌐 Frontend
```
frontend/index.html

```
🧪 Example Execution
```
| Input       | Value |
| ----------- | ----- |
| Workflow ID | wf1   |
| Amount      | 600   |

FLOW
Step1 → Rule Applied → Next Step → Completed

```
📊 Audit Logs
```
| Status       | Meaning                        |
| ------------ | ------------------------------ |
| 🟢 COMPLETED | Workflow executed successfully |
| 🔴 FAILED    | No matching rule / error       |

```
🔥 Key Highlight
```
💡 Dynamic Rule Engine
The system evaluates conditions at runtime using rules stored in the database, making workflows flexible and configurable.

```
## 🎬 Demo Video
```
https://drive.google.com/file/d/1x99eKzdJcvPkjZdFHHT64wxbEzvyJGu9/view?usp=sharing
