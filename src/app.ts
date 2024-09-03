import express, {NextFunction, Request, Response} from 'express'
import {json} from 'body-parser'
import todoRoutes from './routes/todos'
import userRoutes from './routes/user-routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(json())

// bodyparser
// cors

app.use('/todos', todoRoutes)
app.use('/user', userRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
})

mongoose.connect(`${process.env.DB_URI}`).then(() => {
    app.listen(3000, () => {
        console.log("Example app listening on 3000")
    })
})

// app.listen(3000)