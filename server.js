const express = require("express");
const fs = require("fs");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

// Route d'accueil
app.get("/", (req, res) => {
    res.json({
        message: "API du Blog - Serveur Modulaire Operationnel (SoC)"
    });
});

// Routes des articles (montées uniquement si le fichier existe)
const articleRoutesPath = path.join(__dirname, "routes", "articleRoutes.js");
if (fs.existsSync(articleRoutesPath)) {
    const articleRoutes = require(articleRoutesPath);
    app.use("/api/articles", articleRoutes);
}

// Routes des utilisateurs
app.use("/api/users", userRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(
        `Serveur modulaire en ecoute sur http://localhost:${PORT}`
    );
});
