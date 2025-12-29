import express from 'express'
import router from './Routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app= express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true, // allow cookies
  })
);
app.use('/api/v1',router);


app.listen(3000,()=>{
    console.log("listinig to port 3000");
    
})