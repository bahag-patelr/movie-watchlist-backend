import express from 'express';
import cors from 'cors';
import "dotenv/config"
import sequelize from "./db/db.js";

const app = express();
const PORT  = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {console.log(`server is listening on PORT ${PORT}`)});