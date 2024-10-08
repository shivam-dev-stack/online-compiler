import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {router} from './router/compilerRoutes.js'
import { adminRouter } from './router/adminRouter.js'
import { postRoutes } from './router/postRouter.js'
import cookieParser from 'cookie-parser'
import { api } from './config/config.js'


dotenv.config(
    {
        path:'./.env'
    } 
)

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(cookieParser())

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(cors(
    {
        credentials:true
    }
));

app.use(api.compile.url ,router);
app.use(api.admin.url,adminRouter);
app.use(api.post.url,postRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})