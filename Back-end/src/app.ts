import express from "express";
import Routes from "./Routes/routes"
import "dotenv/config";
import connectDB from "./DBconnection/connect";
import cookieparser from "cookie-parser";
import fileUpload from "express-fileupload";

const db = new connectDB();
const router = new Routes().router;

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.middleware()
        this.routes();
        this.connection();
    }

    private middleware(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(fileUpload())
        this.app.use(cookieparser())
        this.app.use(express.static("public"));
    }

    private routes(): void {
        this.app.use("/", router)
    }

    private connection(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server Listining at ${process.env.PORT}.....`);
        })
    }
}

export default new App().app