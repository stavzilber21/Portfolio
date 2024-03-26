const express = require('express');
const cors = require("cors");
// const session = require('express-session'); 
const connectDB = require('./configs/db');
const {checkRemainingActions,addActionToUserInJson} = require("./service/userService");
const fs = require('fs');
const app = express();
const port = 8000;

// // Middleware for session management
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true
// }));


// will parse JSON sent in the body request
app.use(express.json());
app.use(cors());
const authController = require("./controllers/authController");

app.use("/auth", authController);

app.use(async(req,res,next)=>{
    let ans = true;
    const headers = req.headers;
    const userId = headers['id'];

    const path = req.url;
    const method = req.method;
    switch(true){
        case path === "/employees": //display employees table || addEmployee
            ans =await numOfAction(userId,path);
            break;
        case path.startsWith("/employees/delete/"): //delete employee
            ans =await numOfAction(userId,path);
            break;
        case path.startsWith("/employees/update/"): //update employee
            ans =await numOfAction(userId),path;
            break;
        case path.includes("/changeDepartment"): //change department of employee
            ans =await numOfAction(userId,path);
            break;
        case path === "/departments": //display departments table || addDepartment
            if (method === "GET" || method === "POST") {
                ans =await numOfAction(userId,path);    
            }
            break;
        case path.startsWith("/departments"): //delete department ||update department
            if (method === "PUT" || method === "DELETE") {
                ans =await numOfAction(userId,path); 
            }
            break;
        case path.startsWith("/shifts"): //add department ||update shift
            if (method === "PUT" || method === "POST") {
                ans =await numOfAction(userId,path);
            }
            break
        case path === "/users": //display users table
            ans =await numOfAction(userId,path);
            break;
    }

    // Check if ans is false - Actions are over for the day
    if (ans==false) {
        return res.send(false); 
    } else {
        // if this is the users page
        if(path === "/users"){
            // Pass numAction as a parameter to next()
            req.numAction = ans.numAction;
            req.name = ans.name;
            next();
        }
        else{
            next();
        }  
         
    }  

    
})

async function numOfAction(userId,path){
    //chack if remain actions today.
    try {
        const resp = await checkRemainingActions(userId);
        if(resp.allowed){ //if I have another action to do -true
             //add line to json
             await addActionToUserInJson(userId,resp.remainingActions);
             if(path === "/users"){
                return {ans: true , numAction : resp.remainingActions, name: resp.fullname};
             }
             else{
                return true; 
             }            
        }
        else{
            return false;
        }    
    }catch(e) {
        console.log(e.message)
    }
   
}



connectDB();

const employeesController = require("./controllers/employeeController");

const shiftsController = require("./controllers/shiftsController");
const departmentController = require("./controllers/departmentController");
const employeeShiftController = require("./controllers/employeeShiftController");
const userController = require("./controllers/userController");


app.use("/employees", employeesController);
app.use("/shifts", shiftsController);
app.use("/users", userController);
app.use("/departments", departmentController);
app.use("/employeeShift", employeeShiftController);

app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
