import React, { useState } from 'react';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiEye, mdiEyeClosed } from '@mdi/js';
import  { useNavigate } from 'react-router-dom'


export default function Connexion() {   

    const navigate = useNavigate();

    if(window.localStorage.getItem('Token')){
        navigate("/");
    }

    // Style du composant
    const style = `
    .connexion{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    form{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    input{
        font-size: larger;
        width: 60%;
        border: none;
        border-bottom: solid 1px black;
        outline: none;
        transition: transform 0.1s;
        color: black;
        background-color: transparent;
        margin: 2%;
    }

    .mdp{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        width: 100%;
    }

    .mdp input{
        width: 60%;
    }

    .submit{
        width: 100%;
    }
    `;

    const [nomUtilisateur, setNomUtilisateur] = useState(""); // Nom d'utilisateur renseigné
    const [mdp, setMdp] = useState(""); // Mdp renseigné
    const [isVisible, setVisible] = useState(false); // false: mdp caché / true: mdp visible

    const handleNomUtilisateur = (e) => { 
        setNomUtilisateur(e.target.value);
    };

    const handleMdp = (e) => {
        setMdp(e.target.value);
    };

    const toggleVisibleMdp = () => {
        setVisible(!isVisible);
    };


    const connexion = async (event) => { // Fonction qui envoi les données pour se connecter
        event.preventDefault();

        await axios({
            method: 'get',
            baseURL: "http://localhost:5000/api",
            url: 'connexion',
            params: {
                unNomUtilisateur: nomUtilisateur,
                unMdp: mdp,
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            const repToken = response.data;
            window.localStorage.setItem('Token', repToken);
            navigate("/");
        }).catch(error => {
            console.error("Erreur lors de la connexion :", error);
        });

        setMdp("");
    };

    return (
        <div className='connexion'>
            <style>{style}</style>
            <form>
                <input type='text' maxLength="20" value={nomUtilisateur} onChange={handleNomUtilisateur} placeholder="Nom d'utilisateur" required="required"></input>
                <div className='mdp'><input type={isVisible ? 'text' : 'password'} value={mdp} onChange={handleMdp} placeholder="Mot de passe" required="required"></input><Icon color="black" onClick={toggleVisibleMdp} path={isVisible ? mdiEye : mdiEyeClosed} size={1} /></div>
                <button className='submit' onClick={connexion}>Se connecter</button>
            </form>
        </div>
    );
    
}