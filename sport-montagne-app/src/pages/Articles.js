import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tableau from '../components/Tableau';
import Loader from '../components/Loader';

export default function Articles() {

    // Style de la page
    const style = `
    .articles > div{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        padding: 2%;
    }

    .addArticle{
        color: black;
    }

    .addArticle > form{
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 60%;
        gap: 5px;
    }
    `;

    const [articles, setArticles] = useState([]); // Tableau contenant les articles
    const [loading, setLoading] = useState(true); // Chargement de la page
    const [newTitreArticle, setNewTitreArticle] = useState(""); // Nom d'utilisateur renseigné
    const [newContenuArticle, setNewContenuArticle] = useState(""); // Mdp renseigné

    const handleNewTitre = (e) => {
        setNewTitreArticle(e.target.value);
    };

    const handleNewContenu = (e) => {
        setNewContenuArticle(e.target.value);
    };

    const addArticle = async (event) => { // Fonction qui envoi les données pour se connecter
        event.preventDefault();

        await axios({
            method: 'post',
            baseURL: "http://localhost:5000/api",
            url: 'addArticle',
            data: {
                titre: newTitreArticle,
                contenu: newContenuArticle,
                token: window.localStorage.getItem('Token')
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.status === 201){
                setNewTitreArticle("");
                setNewContenuArticle("");
                fetchArticles();
            }
        }).catch(error => {
            console.error("Erreur lors de l'ajout de l'article :", error);
        });

    };

    const fetchArticles = async () => {
        await axios({
            method: "get",
            baseURL: "http://localhost:5000/api",
            url: "blog"
        }).then(response => {
            setArticles(response.data);
            setLoading(false);
        }).catch(error => {
            console.error('Erreur lors de la récupération des articles :', error);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchArticles();
    }, [articles]);

    const tabPropTableau = []; // Tableau contenant les données pour le composant Tableau
    articles.map(a => tabPropTableau.push({ id: a.id, nom: a.titre, valeur: a.contenu, auteur: a.nom_utilisateur, datePublication: a.date_publication, description: a.contenu }));

    return (
        <div className='articles'>
            <style>{style}</style>
            {
                window.localStorage.getItem('Token') ?
                    <div className='addArticle'>
                        <h3>Créer un article</h3>
                        <form>
                            <input type='text' maxLength="40" value={newTitreArticle} onChange={handleNewTitre} placeholder="Titre de l'article" required="required"></input>
                            <textarea maxLength="1000" cols="60" rows="10" value={newContenuArticle} onChange={handleNewContenu} placeholder="Contenu de l'article" required="required"></textarea>
                            <button className='submit' onClick={addArticle}>Ajouter</button>
                        </form>
                    </div>
                    :
                    null
            }

            {loading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <div>
                    <Tableau titre="Articles" colonnes={["Titre", "Contenu", "Date de publication"]} data={tabPropTableau} />
                </div>
            )
            }
        </div>
    );
}

