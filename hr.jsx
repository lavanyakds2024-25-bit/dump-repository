<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HR Leave Management System</title>

<style>
*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Segoe UI',sans-serif;
}

body{
background:#eef2f7;
padding:30px;
}

.container{
max-width:1100px;
margin:auto;
background:#fff;
padding:25px;
border-radius:15px;
box-shadow:0 5px 20px rgba(0,0,0,0.1);
}

h1{
text-align:center;
margin-bottom:25px;
color:#1e3a8a;
}

.form-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:15px;
}

input,select{
padding:12px;
border:1px solid #ccc;
border-radius:8px;
font-size:15px;
}

button{
padding:12px;
border:none;
background:#2563eb;
color:white;
border-radius:8px;
cursor:pointer;
font-size:15px;
}

button:hover{
background:#1d4ed8;
}

table{
width:100%;
margin-top:25px;
border-collapse:collapse;
}

th{
background:#2563eb;
color:white;
padding:12px;
}

td{
padding:12px;
border-bottom:1px solid #ddd;
text-align:center;
}

.status{
padding:5px 12px;
border-radius:20px;
color:white;
font-size:13px;
}

.pending{
background:orange;
}

.approved{
background:green;
}

.rejected{
background:red;
}

.summary{
display:flex;
gap:20px;
margin-top:25px;
margin-bottom:20px;
flex-wrap:wrap;
}

.card{
flex:1;
min-width:200px;
padding:20px;
border-radius:10px;
color:white;
text-align:center;
}

.blue{
background:#2563eb;
}

.green{
background:#16a34a;
}

.orange{
background:#ea580c;
}
</style>
</head>

<body>

<div class="container">

<h1>HR Leave Management System</h1>

<div class="summary">

<div class="card blue">
<h2 id="totalRequests">0</h2>
<p>Total Requests</p>
</div>

<div class="card green">
<h2 id="approvedCount">0</h2>
<p>Approved</p>
</div>

<div class="card orange">
<h2 id="pendingCount">0</h2>
<p>Pending</p>
</div>

</div>

<div class="form-grid">

<input type="text" id="employeeName" placeholder="Employee Name">

<select id="leaveType">
<option value="">Select Leave Type</option>
<option>Sick Leave</option>
<option>Casual Leave</option>
<option>Earned Leave</option>
<option>Work From Home</option>
</select>

<input type="date" id="startDate">

<input type="date" id="endDate">

<button onclick="applyLeave()">Apply Leave</button>

</div>

<table>

<thead>
<tr>
<th>Employee</th>
<th>Leave Type</th>
<th>Start Date</th>
<th>End Date</th>
<th>Days</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody id="leaveTable">
</tbody>

</table>

</div>

<script>

let leaveData =
JSON.parse(localStorage.getItem("leaveData")) || [];

function calculateDays(start,end){
let s = new Date(start);
let e = new Date(end);

let diff =
(e-s)/(1000*60*60*24)+1;

return diff;
}

function applyLeave(){

let employee =
document.getElementById("employeeName").value;

let type =
document.getElementById("leaveType").value;

let start =
document.getElementById("startDate").value;

let end =
document.getElementById("endDate").value;

if(!employee || !type || !start || !end){
alert("Please fill all fields");
return;
}

let days =
calculateDays(start,end);

leaveData.push({
employee,
type,
start,
end,
days,
status:"Pending"
});

saveData();
renderTable();

document.getElementById("employeeName").value="";
document.getElementById("leaveType").value="";
document.getElementById("startDate").value="";
document.getElementById("endDate").value="";
}

function saveData(){
localStorage.setItem(
"leaveData",
JSON.stringify(leaveData)
);
}

function approve(index){
leaveData[index].status="Approved";
saveData();
renderTable();
}

function reject(index){
leaveData[index].status="Rejected";
saveData();
renderTable();
}

function renderTable(){

let table =
document.getElementById("leaveTable");

table.innerHTML="";

let approved=0;
let pending=0;

leaveData.forEach((leave,index)=>{

if(leave.status==="Approved")
approved++;

if(leave.status==="Pending")
pending++;

table.innerHTML += `
<tr>
<td>${leave.employee}</td>
<td>${leave.type}</td>
<td>${leave.start}</td>
<td>${leave.end}</td>
<td>${leave.days}</td>
<td>
<span class="status ${leave.status.toLowerCase()}">
${leave.status}
</span>
</td>
<td>
<button onclick="approve(${index})">
Approve
</button>

<button style="background:red"
onclick="reject(${index})">
Reject
</button>
</td>
</tr>
`;
});

document.getElementById("totalRequests")
.innerText = leaveData.length;

document.getElementById("approvedCount")
.innerText = approved;

document.getElementById("pendingCount")
.innerText = pending;
}

renderTable();

</script>

</body>
</html>