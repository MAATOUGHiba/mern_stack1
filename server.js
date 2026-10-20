const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Bonjour, je suis l'API du blog"
    });
});

const users = [
    {
        id: 1,
        name: "Aya",
        email: "aya@example.com"
    },
    {
        id: 2,
        name: "Omar",
        email: "omar@example.com"
    },
    {
        id: 3,
        name: "Youssef",
        email: "youssef@example.com"
    }
];

app.get("/api/users", (req, res) => {
    const { name } = req.query;

    if (name) {
        const filteredUsers = users.filter(u => u.name === name);
        return res.json(filteredUsers);
    }

    res.json(users);
});
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            error: `Utilisateur ${id} introuvable`
        });
    }

    res.json(user);
});


app.get("/about", (req, res) => {
    res.json({
        app: "Mon API Blog",
        student: "MAATOUG Hiba",
        version: "1.0.0"
    });
});

app.post("/contact", (req, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({
            error: "Email et message sont obligatoires"
        });
    }

    res.status(200).json({
        message: "Merci, votre message a bien été reçu"
    });
});

app.listen(PORT, () => {
    console.log(`Serveur disponible sur http://localhost:${PORT}`);
});