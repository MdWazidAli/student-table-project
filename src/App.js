import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {

const [students,setStudents] = useState([]);
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [age,setAge] = useState("");
const [editId,setEditId] = useState(null);

const addStudent = () => {

if(!name || !email || !age){
alert("All fields are required");
return;
}

const emailRegex = /\S+@\S+\.\S+/;

if(!emailRegex.test(email)){
alert("Invalid email format");
return;
}

if(editId){

setStudents(
students.map((s)=>
s.id === editId
? {id:editId,name,email,age}
: s
)
)

setEditId(null)

}else{

const newStudent = {
id: Date.now(),
name,
email,
age
}

setStudents([...students,newStudent])

}

setName("")
setEmail("")
setAge("")
}

const deleteStudent = (id) => {

if(window.confirm("Are you sure to delete this student?")){

setStudents(
students.filter((s)=>s.id!==id)
)

}

}

const editStudent = (student) => {

setName(student.name)
setEmail(student.email)
setAge(student.age)
setEditId(student.id)

}

const downloadExcel = () => {

const worksheet = XLSX.utils.json_to_sheet(students)

const workbook = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(workbook,worksheet,"Students")

const excelBuffer = XLSX.write(workbook,{
bookType:"xlsx",
type:"array"
})

const file = new Blob([excelBuffer],{
type:"application/octet-stream"
})

saveAs(file,"students.xlsx")

}

return(

<div className="container">

<h1>Students Management System</h1>

<div className="form">

<input
placeholder="Enter Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
placeholder="Enter Age"
value={age}
onChange={(e)=>setAge(e.target.value)}
/>

<button onClick={addStudent}>
{editId ? "Update Student" : "Add Student"}
</button>

<button className="excel-btn" onClick={downloadExcel}>
Download Excel
</button>

</div>

<table>

<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Age</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{students.length === 0 ? (

<tr>
<td colSpan="4">No Students Added</td>
</tr>

) : (

students.map((s)=>(
<tr key={s.id}>

<td>{s.name}</td>
<td>{s.email}</td>
<td>{s.age}</td>

<td>

<button
className="edit-btn"
onClick={()=>editStudent(s)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteStudent(s.id)}
>
Delete
</button>

</td>

</tr>
))

)}

</tbody>

</table>

</div>

)

}

export default App;