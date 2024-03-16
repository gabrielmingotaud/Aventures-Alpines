import React, { useState } from 'react';
import Modal from './Modal';

export default function Tableau(unTableau) {

    // Style du composant
    const style = `

    .tableau{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: black;
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
      
      td a{
        color: black;
        text-decoration: underline;
      }
      `;

    const [search, setSearch] = useState(""); // Valeure recherchée par l'utilisateur

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    let [isModal, setModal] = useState(false); // Visibilité de la PopUp Modal
    let [selectedTab, setSelectedTab] = useState([]); // Tableau qui contient les données de laligne sélectionnée

    const toggleModal = (tab) => {
        setSelectedTab(tab);
        setModal(!isModal);
    };

    return (
        <div className='tableau'>
            <style>{style}</style>
            <h2>{unTableau.titre}</h2>
            <input type='text' value={search} onChange={handleSearch} placeholder="Rechercher"></input>
            <table>
                <thead>
                    <tr>
                        {unTableau.colonnes.map((c, index) => (
                            <th key={index}>{c}</th>
                        ))}
                        <th>Voir plus</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        unTableau.data.filter(tab => tab.nom.includes(search) || tab.valeur.includes(search)).map(tab => (
                            <tr key={tab.id}>
                                <td>{tab.nom}</td>
                                <td>{tab.valeur.substr(0, 50)}</td>
                                {tab.datePublication ? (<td>{new Date(tab.datePublication).toLocaleString()}</td>) : null}
                                {tab.emplacement ? (<td><a target='blank' href={"https://www.google.fr/maps/place/" + tab.emplacement}>{tab.emplacement}</a></td>) : null}
                                <td><button onClick={() => toggleModal(tab)}>Voir plus</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {isModal &&
                <Modal key={selectedTab.id} img={selectedTab.img} nom={selectedTab.nom} description={selectedTab.description} auteur={selectedTab.auteur} datePublication={selectedTab.datePublication} enneigement={selectedTab.enneigement} emplacement={selectedTab.emplacement} niveauDifficulte={selectedTab.niveauDifficulte} toggleModal={toggleModal} />
            }
            {unTableau.data.filter(tab => tab.nom.includes(search) || tab.valeur.includes(search)).length === 0 ?
                <span><h2>Aucun résultat(s)</h2></span> : null
            }
        </div>
    );
}