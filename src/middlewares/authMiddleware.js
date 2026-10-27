
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Vérification cryptographique de la signature avec le secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Récupération de l'utilisateur associé (exclusion du mot de passe)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          message: 'Non autorisé, utilisateur introuvable'
        });
      }

      // Passage au middleware ou contrôleur suivant
      return next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: 'Votre session a expire, veuillez vous reconnecter'
        });
      }

      return res.status(401).json({
        message: 'Non autorisé, token invalide ou expiré'
      });
    }
  }

  // Si aucun en-tête Authorization n'est fourni
  return res.status(401).json({
    message: 'Non autorisé, aucun token fourni'
  });
};

// 2. Contrôle d'accès basé sur les rôles (RBAC) : réservé aux administrateurs
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({
    message: 'Accès refusé : droits administrateur requis'
  });
};

module.exports = { protect, adminOnly };
