import Express from "express";
import deliverablesrouter from "./routes/deliverables-router.js";
import cors from "cors";
const app = Express();
const PORT = process.env.PORT || 3000;
app.use(cors());
//Configure rputes
app.use('/api/deliverables', deliverablesrouter);
app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)});