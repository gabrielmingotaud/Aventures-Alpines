import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tableau from '../components/Tableau';
import Loader from '../components/Loader';

export default function Escalade() {

    // Style de la page
    const style = `
    .escalade{
        color: black;
        overflow: hidden;
    }

    .escalade > div{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        padding: 2%;
    }

    iframe{
        height: 100vh;
        width: 100%;
    }

    .titre{
        padding: 0px;
        background-color: #517441;
        color: white;
    }

    .infos{
        width: 100%;
        padding: 0;
    }

    .infos ul{
        list-style-type: circle;
    }

    .infos div{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row;
        width: 100%;
    }

    input{
        font-size: larger;
        width: 30%;
        border: none;
        border-bottom: solid 1px black;
        outline: none;
        transition: transform 0.1s;
        color: black;
        background-color: transparent;
        margin: 2%;
    }
    
    input::placeholder{
        color: black;
    }
    
    input:focus{
        border-color: rgb(43, 85, 24);
    }
    

    table {
        border-collapse: collapse;
        width: 80%;
      }
      
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
    `;

    const [sitesEscalade, setSitesEscalade] = useState([]); // Tableau contenant les 
    const [loading, setLoading] = useState(true); // Chargement de la page

    useEffect(() => {

        // Effectuer une requête GET vers votre API pour récupérer la liste des activités

        const fetchActivites = async () => {
            await axios({
                method: "get",
                baseURL: "http://localhost:5000/api",
                url: "escalade"
            }).then(response => {
                setSitesEscalade(response.data);
                setLoading(false);
            }).catch(error => {
                console.error('Erreur lors de la récupération des activités :', error);
                setLoading(false);
            });
        };
        fetchActivites();

    }, [sitesEscalade]);

    const tabPropTableau = []; // Tableau contenant les données pour le composant Tableau
    sitesEscalade.map(s => tabPropTableau.push({ id: s.id_site, nom: s.nom_site, valeur: s.niveau_difficulte, img: s.image_url, emplacement: s.emplacement, niveauDifficulte: s.niveau_difficulte }));

    return (
        <div className="escalade">
            <style>{style}</style>
            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/7q8bdbuulb0?si=pthXWBePlkyTYgOe" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <div className='infos'>
                <h2>Informations importantes</h2>
                <div>
                    <ul>
                        <h3>Sécurité</h3>
                        <li>Toujours s'accrocher</li>
                    </ul>
                    <ul>
                        <h3>Conseils pour débutant</h3>
                        <li>Bien apprendre les règles de sécurité</li>
                    </ul>
                </div>
            </div>
            <hr />
            {loading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <div>
                    <Tableau titre="Liste des sites d'escalade" colonnes={["Nom", "Niveau de difficulté", "Emplacement"]} data={tabPropTableau} />
                </div>
            )}
        </div>
    );
}