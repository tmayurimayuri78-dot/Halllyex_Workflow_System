let allLogs = []
let allWorkflows = []

async function executeWorkflow(){

const workflowId = document.getElementById("workflowId").value
const amount = document.getElementById("amount").value

const res = await fetch(`http://127.0.0.1:8000/execute/${workflowId}`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
amount:Number(amount)
})
})

const data = await res.json()

document.getElementById("result").textContent =
"Current Step: " + data.current_step +
"\nRule Applied: " + data.rule_applied +
"\nNext Step: " + data.next_step

console.log(data)

document.getElementById("amount").value=""

}



async function loadWorkflows(){

const res = await fetch("http://127.0.0.1:8000/workflows")
const data = await res.json()

const table = document.getElementById("workflowBody")

if(!table) return

table.innerHTML = ""

data.forEach(wf => {

const button = wf.is_active
? `<button onclick="setWorkflow('${wf.id}')">Execute</button>`
: `<button disabled>Inactive</button>`

const row = `
<tr>
<td>${wf.id}</td>
<td>${wf.name}</td>
<td>${wf.version}</td>
<td>${wf.is_active ? "Active" : "Inactive"}</td>
<td>${button}</td>
</tr>
`

table.innerHTML += row

})

}



function setWorkflow(id){
localStorage.setItem("workflowId", id)
window.location.href="execute.html"
}



async function createWorkflow(){

const id = document.getElementById("wf_id").value
const name = document.getElementById("wf_name").value
const version = document.getElementById("wf_version").value

const data = {
id:id,
name:name,
version:Number(version),
is_active:true,
start_step_id:"step1"
}

await fetch("http://127.0.0.1:8000/workflows",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

alert("Workflow created")

document.getElementById("wf_id").value=""
document.getElementById("wf_name").value=""
document.getElementById("wf_version").value=""

loadWorkflows()

}



async function loadLogs(){

const logRes = await fetch("http://127.0.0.1:8000/logs")
allLogs = await logRes.json()

const wfRes = await fetch("http://127.0.0.1:8000/workflows")
allWorkflows = await wfRes.json()

showAll()

}



function renderLogs(filteredLogs){

const table = document.getElementById("logsBody")

if(!table) return

table.innerHTML = ""

filteredLogs.slice().forEach(log => {

const wf = allWorkflows.find(w => w.id === log.workflow_id)

const name = wf ? wf.name : "-"
const version = wf ? wf.version : "-"
const active = wf && wf.is_active ? "Active" : "Inactive"

let statusBadge=""

if(log.status==="COMPLETED"){
statusBadge=`<span style="color:#00ff88;font-weight:bold;">COMPLETED</span>`
}else{
statusBadge=`<span style="color:#ff4d4d;font-weight:bold;">FAILED</span>`
}

const row = `
<tr>
<td>${log.execution_id}</td>
<td>${log.workflow_id}</td>
<td>${name}</td>
<td>${version}</td>
<td>${active}</td>
<td>${statusBadge}</td>
<td>${log.start_time}</td>
<td>${log.end_time}</td>
</tr>
`

table.innerHTML += row

})

}



function showAll(){
renderLogs(allLogs)
}

function showCompleted(){
const data = allLogs.filter(l => l.status === "COMPLETED")
renderLogs(data)
}

function showFailed(){
const data = allLogs.filter(l => l.status === "FAILED")
renderLogs(data)
}



async function loadWorkflowDropdown(){

const res = await fetch("http://127.0.0.1:8000/workflows")
const data = await res.json()

const dropdown = document.getElementById("workflowId")

if(!dropdown) return

dropdown.innerHTML=""

data.forEach(wf => {

const option = document.createElement("option")

option.value = wf.id
option.text = wf.id + " - " + wf.name

dropdown.appendChild(option)

})

}



function goHome(){
window.location.href="index.html"
}

function goWorkflows(){
window.location.href="workflows.html"
}

function goLogs(){
window.location.href="logs.html"
}

function goExecute(){
window.location.href="execute.html"
}



window.onload = function(){

if(document.getElementById("workflowBody")){
loadWorkflows()
}

if(document.getElementById("logsBody")){
loadLogs()
}

if(document.getElementById("workflowId")){
loadWorkflowDropdown()
}

}