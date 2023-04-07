//Imports
import express from "express";
import cors from "cors";
import deliverableRouter from "./routers/deliverable-router.js";
import profilesRouter from "./routers/profile-router.js"
import usersRouter from "./routers/users-router.js"
//Configuration server.
const app = express();
//Configure middleware
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


 
app.use('/api/deliverables', deliverableRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/users', usersRouter);
// *Start Server

export default app;