const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");  //  add this
const middlewares = require("./src/middlewares/middlewares.js");
const loginRoute = require("./src/Controllers/loginAPI.js");
const PerformanceRoute=require("./src/Controllers/Performance/PerformanceHome.js")
const MouldRoute=require("./src/Controllers/Mould/MouldSummary.js")

const app = express();



app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

//app.use(limiter);   

// app.use("/api", limiter);
app.use(express.json());

app.use("/api/login", loginRoute);


app.use("/api/PerformanceHome",PerformanceRoute );
app.use("/api/MouldSummary",MouldRoute );


const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/api/status", (request, response) => {
  middlewares.standardResponse(response, null, 200, "running");
});
