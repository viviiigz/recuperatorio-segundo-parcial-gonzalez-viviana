import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// importar las rutas
sequelize.sync().then(() => {
  console.log("Base de datos conectada correctamente");
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
