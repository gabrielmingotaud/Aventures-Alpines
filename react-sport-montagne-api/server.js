const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Middleware pour parser le JSON
app.use(express.static('public'));
app.use(cookieParser());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aventures_alpines'
});

const createToken = (data) => {
    const token = jwt.sign(data, 'test', { expiresIn: "2h" });
    return token;
};

function isAuth(req) {
    
    try {
        if (req.body.token != null) {
            const token = req.body.token;
            const data = jwt.verify(token, 'test');
            return data;
        }
    } catch (erreur) {
        res.json({ message: "Token invalide" });
    }
}

app.use((req, res, next) => {
    //isAuth();
    next();
});

// Compte

app.get('/api/nbEmail', async (req, res) => {
    connection.query(`SELECT count(*) as nbEmail FROM Utilisateurs WHERE email = '${req.query.unEmail}'`, function (err, rows, fields) {
        if (err) throw err;
        res.json(rows[0]);
    });
});
app.get('/api/nbNomUtilisateur', async (req, res) => {
    connection.query(`SELECT count(*) as nbNomUtilisateur FROM Utilisateurs WHERE nom_utilisateur = '${req.query.unNomUtilisateur}'`, function (err, rows, fields) {
        if (err) throw err;
        res.json(rows[0]);
    });
});
app.get('/api/connexion', async (req, res) => {
    connection.query(`SELECT mot_de_passe FROM Utilisateurs WHERE nom_utilisateur = '${req.query.unNomUtilisateur}'`, async function (err, rows, fields) {
        if (err) throw err;
        if (await bcrypt.compare(req.query.unMdp, rows[0].mot_de_passe)) {
            connection.query(`SELECT id_utilisateur, nom_utilisateur FROM Utilisateurs WHERE nom_utilisateur = '${req.query.unNomUtilisateur}'`, function (err, rows, fields) {
                if (err) throw err;
                const token = createToken({id: rows[0].id_utilisateur, nomUtilisateur: rows[0].nom_utilisateur});
                res.json(token);
            });
        }
    });
});
app.post('/api/createAccount', (req, res) => {
    connection.query(`INSERT INTO Utilisateurs(nom_utilisateur, email, mot_de_passe, date_inscription) VALUES('${req.body.unNomUtilisateur}', '${req.body.unEmail}', '${req.body.unMdp}', now())`, function (err, rows, fields) {
        if (err) throw err;
    });
    res.status(201).json({ message: 'Compte utilisateur créée avec succès' });
});

// Activités

app.get('/api/activites', async (req, res) => {
    connection.query('SELECT * FROM Activites', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});
// app.post('/api/activites', (req, res) => {
//     const nouvelleActivite = req.body;
//     res.status(201).json({ message: 'Actvité créée avec succès' });
// });

// Escalade

app.get('/api/escalade', async (req, res) => {
    connection.query('SELECT * FROM Sites_Escalade', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

// Ski

app.get('/api/stationSki', async (req, res) => {
    connection.query('SELECT * FROM Stations_Ski', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

// Blog

app.get('/api/blog', async (req, res) => {
    connection.query('SELECT Articles_Blog.id_article, titre, contenu, date_publication, nom_utilisateur FROM Articles_Blog JOIN Utilisateurs ON Articles_Blog.id_utilisateur = Utilisateurs.id_utilisateur ORDER BY date_publication DESC', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

app.post('/api/addArticle', async (req, res) => {
    const dataToken = isAuth(req);
    connection.query(`INSERT INTO Articles_Blog (titre, contenu, date_publication, id_utilisateur) VALUES ('${req.body.titre}', '${req.body.contenu}', now(), ${dataToken.id})`, function (err, rows, fields) {
        if (err) throw err;
    });
    res.status(201).json({ message: 'Article créé avec succès' });
});

// Images

app.use('/api/images', express.static('images'));


app.listen(PORT, () => {
    console.log(`Serveur en cours d'écoute sur le port ${PORT}`)
});