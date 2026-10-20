
console.log(" Exercice 2 : JavaScript Moderne (ES6+)");


console.log("\n Déstructuration ");

const utilisateur = {
  nom: "Ali"
};

const { nom, role: statut = "Etudiant" } = utilisateur;

console.log("Nom :", nom);
console.log("Statut :", statut);



console.log("\n Immutabilite avec Spread ");

const matieres = ["JavaScript", "Node.js", "Express"];

const nouvellesMatieres = [...matieres, "MongoDB"];

console.log("Tableau original :", matieres);
console.log("Nouveau tableau :", nouvellesMatieres);

console.log("\n Tableaux ");

const etudiants = [
  { nom: "Ali", note: 12 },
  { nom: "Sarra", note: 16 },
  { nom: "Youssef", note: 18 },
  { nom: "Aya", note: 14 },
  { nom: "Amine", note: 15 }
];

const notesElevees = etudiants.filter(etudiant => etudiant.note >= 15);

const nomsMajuscules = notesElevees.map(etudiant => etudiant.nom.toUpperCase());

console.log("Etudiants avec une note >= 15 :", notesElevees);
console.log("Noms en majuscules :", nomsMajuscules);



console.log("\n Asynchronisme ");

async function recupererDonnees() {
  try {
    console.log("Chargement des donnees...");

    await new Promise(resolve => setTimeout(resolve, 2000));

    const donnees = ["Ali", "Sarra", "Youssef"];

    console.log("Donnees recuperees :", donnees);
  } catch (erreur) {
    console.log("Une erreur est survenue :", erreur.message);
  }
}

recupererDonnees();
