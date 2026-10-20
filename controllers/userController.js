
const { estNonVide, estEmailValide } = require("../utils/validators");
let users = [
    {
        id: 1,
        name: "Aya",
        email: "aya@example.com",
        role: "admin"
    },
    {
        id: 2,
        name: "Omar",
        email: "omar@example.com",
        role: "user"
    }
];

let prochainId = 3;

// GET : récupérer tous les utilisateurs
const getAllUsers = (req, res) => {
    const { role } = req.query;
    let resultat = users;

    if (role) {
        resultat = users.filter(u => u.role === role);
    }

    res.status(200).json({
        total: resultat.length,
        users: resultat
    });
};

// GET : récupérer un utilisateur par son ID
const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            error: `Utilisateur ${id} introuvable`
        });
    }

    res.status(200).json(user);
};

// POST : créer un utilisateur

const createUser = (req, res) => {
    const { name, email } = req.body;

    if (!estNonVide(name)) {
        return res.status(400).json({
            error: "Le nom est obligatoire et ne doit pas etre vide"
        });
    }

    if (!estEmailValide(email)) {
        return res.status(400).json({
            error: "L'adresse email est invalide"
        });
    }

    const nouvelUser = {
        id: prochainId++,
        name: name.trim(),
        email: email.trim(),
        role: "user"
    };

    users.push(nouvelUser);

    res.status(201).json({
        message: "Utilisateur créé",
        user: nouvelUser
    });
};

// DELETE : supprimer un utilisateur
const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const existe = users.some(u => u.id === id);

    if (!existe) {
        return res.status(404).json({
            error: `Utilisateur ${id} introuvable`
        });
    }

    users = users.filter(u => u.id !== id);

    res.status(200).json({
        message: `Utilisateur ${id} supprimé avec succès`
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
};