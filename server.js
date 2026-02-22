require('dotenv').config(); 
const express =require('express');
const app =express();
app.use(express.json());  
const db = require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());


const registerformRouter=require('./Router/registrationRouter');
app.use('/register',registerformRouter);
app.use('/',registerformRouter)
const adminPendingRegistrationRouter=require('./Router/admin/amin_pending_registration');
app.use('/',adminPendingRegistrationRouter);
const outincrequestRouter=require('./Router/outingRequest');
app.use('/',outincrequestRouter);

const outingRequestRouterAdmin=require('./Router/admin/OutingRequestStatus');
app.use('/',outingRequestRouterAdmin);



app.listen(500,()=>{
    console.log("server starting");
    
})
