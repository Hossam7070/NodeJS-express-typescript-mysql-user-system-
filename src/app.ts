import express, { Application } from 'express';
import { Request , Response ,NextFunction} from 'express';
import {connection ,tablePlot } from './db'
import userRoutes from './routes/user'
import productsRoutes from './routes/products'
import * as dotenv from "dotenv";
class App {
    private app: Application;

    constructor(private port?:number){
        this.app = express();
        this.settings();
        this.middleware();
        this.routes()
        this.errorHandler();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    middleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
    routes(){
        this.app.get('/', (req:Request, res:Response) => {
            console.log("welcome")
        })
        this.app.use('/user',userRoutes)
        this.app.use('/products',productsRoutes)
    }
    errorHandler(){
        this.app.use((err:Error , req:Request, res:Response,next:NextFunction)=>{
            res.status(500).json({
                
                message: err.message
            })
        })
    }

    async listen() {
        await this.app.listen( this.app.get('port'));
        console.log( `server started at http://localhost:${ this.app.get('port') }` );
    }
}

async function start() {
    const app = new App(3000);
    await app.listen();
    tablePlot();
    dotenv.config();
}

start();


