import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import languageRoutes from "./src/routes/language.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000; //no se si se podia cambiar el puerto, pero no me andaba el 3000
app.use("/api/languages", languageRoutes);

// importar las rutas
sequelize.sync().then(() => {
  console.log("Base de datos conectada correctamente");
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
