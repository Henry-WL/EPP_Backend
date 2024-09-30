import express, {NextFunction, Request, Response} from 'express'
import {json} from 'body-parser'
import userRoutes from './routes/user-routes';
import eventRoutes from './routes/event-routes';
import paymentRoutes from './routes/paymentRoutes'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()


const app = express()

app.use(json())

// bodyparser
// cors
app.use(cors())

app.use('/api/user', userRoutes)
app.use('/api/events', eventRoutes)

app.use('/api/payment', paymentRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
})

mongoose.connect(`${process.env.DB_URI}`).then(() => {
    app.listen(3000, () => {
        console.log("Example app listening on 3000")
    })
})

// app.listen(3000)