import express from 'express'
import router from './Routes/index.js'
import cookieParser from 'cookie-parser'

const app= express();

app.use(express.json());
app.use('/api/v1',router);
app.use(cookieParser());

app.listen(3000,()=>{
    console.log("listinig to port 3000");
    
})