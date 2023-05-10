import express, { urlencoded } from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { PORT } from "./config.js";
import { connectionDb } from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productsRoutes.js";

const app = express();
connectionDb();

//settings

//middlewares
app.use(express.json());
app.use(express.text());
app.use(urlencoded({extended: false}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './usersImg',
}));

app.use(morgan('tiny'));

//routes

app.use(userRoutes);
app.use(productRoutes);

//listen
app.listen(PORT);

console.log("the server is connected in port:", PORT);