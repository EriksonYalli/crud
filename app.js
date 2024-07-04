const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;
const fs = require("fs");
const ip = "34.237.70.103";

app.use(express.static(path.join(__dirname)));
app.use(cors({ origin: "http://&{ip}:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const conexion = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "registro",
  user: "erikson",
  password: "42011dias",
});

app.post("/crear", (req, res) => {
  const { nombre, email, password } = req.body;
  const hashedPassword = require("crypto")
    .createHash("sha256")
    .update(password)
    .digest("hex"); // Hash de la contraseña
  const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";

  conexion.execute(sql, [nombre, email, hashedPassword], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al crear el usuario");
    } else {
      res.status(200).send("Nuevo registro creado exitosamente");
    }
  });
});

app.get("/usuarios", (req, res) => {
  const sql = "SELECT * FROM usuarios";

  conexion.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener los usuarios");
    } else {
      res.status(200).json(results);
    }
  });
});

app.put("/actualizar", (req, res) => {
  const { id, nombre, email, password } = req.body;
  const hashedPassword = require("crypto")
    .createHash("sha256")
    .update(password)
    .digest("hex"); // Hash de la contraseña
  const sql =
    "UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?";

  conexion.execute(sql, [nombre, email, hashedPassword, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al actualizar el usuario");
    } else {
      res.status(200).send("Registro actualizado exitosamente");
    }
  });
});

app.delete("/eliminar/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuarios WHERE id = ?";

  conexion.execute(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al eliminar el usuario");
    } else {
      res.status(200).send("Registro eliminado exitosamente");
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://${ip}:${port}`);
});
