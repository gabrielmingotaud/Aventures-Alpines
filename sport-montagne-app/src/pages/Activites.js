import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Activite from '../components/Activite';
import Modal from '../components/Modal';
import Loader from '../components/Loader';

export default function Activites() {

    // Style de la page
    const style = `
    .activites{
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .activite{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    .activites > div > div{
        margin: 2%;
        
    }`;

    const [activites, setActivites] = useState([]); // Tableau qui contient les activités
    const [loading, setLoading] = useState(true); // Chargement de la page
    useEffect(() => {

        // Effectuer une requête GET vers votre API pour récupérer la liste des activités

        const fetchActivites = async () => {
            await axios({
                method: "get",
                baseURL: "http://localhost:5000/api",
                url: "activites",
            }).then(response => {
                setActivites(response.data);
                setLoading(false);
            }).catch(error => {
                console.error('Erreur lors de la récupération des activités :', error);
                setLoading(false);
            });
        };
        fetchActivites();
    }, [activites]);

    let [isModal, setModal] = useState(false); // Affichage de la PopUp Modal
    const [selectedActivite, setSelectedActivite] = useState([]); // Tableau contenant les  données de l'activité sélectionnée

    const toggleModal = (uneActivite) => {
        setSelectedActivite(uneActivite);
        setModal(!isModal);
    };

    return (
        <div className="activites">
            <style>{style}</style>
            <h2>Liste des Activités</h2>
            {loading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <div className='activite'>
                    {
                        activites.map(activite => (
                            <div key={activite.id} onClick={() => toggleModal(activite)}><Activite key={activite.id} nom={activite.nom} description={activite.description} img={activite.image_url} ></Activite></div>
                        ))
                    }
                </div>
            )}
            {isModal &&
                <Modal key={selectedActivite.id} nom={selectedActivite.nom} description={selectedActivite.description} img={selectedActivite.image_url} isModal={isModal} toggleModal={toggleModal} />
            }
        </div>
    );
};