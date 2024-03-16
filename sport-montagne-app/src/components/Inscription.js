import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Icon from '@mdi/react';
import { mdiEye, mdiEyeClosed } from '@mdi/js';
import { useNavigate } from 'react-router-dom'

export default function Inscription() {

    const navigate = useNavigate();

    if (window.localStorage.getItem('Token')) {
        navigate("/");
    }

    // Style du composant
    const style = `
    .inscription{
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

    ulStatut{
        list-style-type: circle;
    }

    .liStatut{
        color: red;
    }
    
    .submit{
        width: 100%;
    }`;

    const [email, setEmail] = useState(""); // Email renseigné
    const [nomUtilisateur, setNomUtilisateur] = useState(""); // Nom d'utilisateur renseigné
    const [mdp, setMdp] = useState(""); // Mdp renseigné
    const [verifMdp, setVerifMdp] = useState(""); // Vérification du mot de passe
    const [nbEmail, setNbEmail] = useState(5); // Nombre d'utilisateur possédant l'email renseigné (Via SQL)
    const [nbNomUtilisateur, setNbNomUtilisateur] = useState(5); // Nombre d'utilisateur possédant le nom d'utilisateur renseigné (Via SQL)
    const [isStatut, setStatut] = useState(false); // Affichage des erreurs dans le formulaire
    const [status, setStatus] = useState([]); // Erreur(s) du formulaire
    const [isVisible, setVisible] = useState(false); // Visibilité mdp
    const [isVisible2, setVisible2] = useState(false); // Visibilité vérification mdp

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleNomUtilisateur = (e) => {
        setNomUtilisateur(e.target.value);
    };

    const handleMdp = (e) => {
        setMdp(e.target.value);
    };

    const handleVerifMdp = (e) => {
        setVerifMdp(e.target.value);
    };

    const toggleVisibleMdp = () => {
        setVisible(!isVisible);
    };

    const toggleVisibleMdp2 = () => {
        setVisible2(!isVisible2);
    };

    const InscriptionData = async (event) => {
        event.preventDefault();

        let count = 0;
        let tempStatus = [];

        await axios({
            method: "get",
            baseURL: "http://localhost:5000/api",
            url: "nbEmail",
            params: {
                unEmail: email,
            }
        }).then(response => {
            setNbEmail(response.data.nbEmail);
        }).catch(error => {
            console.error("Erreur lors de la récupération du nombre d'email' :", error);
        });
        if (email.toLowerCase().match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) && nbEmail === 0) {
            count++;
        } else {
            tempStatus.push({ text: "Email invalide ou déjà utilisé" });
        }
        await axios({
            method: "get",
            baseURL: "http://localhost:5000/api",
            url: "nbNomUtilisateur",
            params: {
                unNomUtilisateur: nomUtilisateur,
            }
        }).then(response => {
            setNbNomUtilisateur(response.data.nbNomUtilisateur);
        }).catch(error => {
            console.error("Erreur lors de la récupération du nombre de nom d'utilisateur :", error);
        });

        if (nbNomUtilisateur === 0) {
            count++;
        } else {
            tempStatus.push({ text: "Nom d'utilisateur déjà utilisé" });
        }
        if (mdp.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{16,}$/)) {
            count++;
        } else {
            tempStatus.push({ text: "Mot de passe invalide" });
        }
        if (mdp === verifMdp) {
            count++;
        } else {
            tempStatus.push({ text: "Les mots de passe ne correspondent pas" });
        }

        const sel = await bcrypt.genSalt();

        if (count === 4) { // Si toutes le vérification sont validées => création du compte
            try {
                axios({
                    method: 'post',
                    baseURL: 'http://localhost:5000/api',
                    url: 'createAccount',
                    data: {
                        unEmail: email,
                        unNomUtilisateur: nomUtilisateur,
                        unMdp: await bcrypt.hash(mdp, sel),
                    }
                });
                navigate("/");
            }catch(erreur){
                console.error(erreur);
            }
        }
        setStatus(tempStatus);
        setStatut(true);
    };

    return (
        <div className='inscription'>
            <style>{style}</style>
            <form>
                <input type='email' maxLength="40" value={email} onChange={handleEmail} placeholder="Email" required="required"></input>
                <input type='text' maxLength="20" value={nomUtilisateur} onChange={handleNomUtilisateur} placeholder="Nom d'utilisateur" required="required"></input>
                <div className='mdp'><input type={isVisible ? 'text' : 'password'} minLength="16" value={mdp} onChange={handleMdp} placeholder="Mot de passe" required="required"></input><Icon color="black" onClick={toggleVisibleMdp} path={isVisible ? mdiEye : mdiEyeClosed} size={1} /></div>
                <div className='mdp'><input type={isVisible2 ? 'text' : 'password'} minLength="16" value={verifMdp} onChange={handleVerifMdp} placeholder="Vérification du mot de passe" required="required"></input><Icon color="black" onClick={toggleVisibleMdp2} path={isVisible2 ? mdiEye : mdiEyeClosed} size={1} /></div>
                {isStatut ?
                    <ul className='ulStatut'>
                        {status.map((s, index) => (
                            <li className='liStatut' key={index}>{s.text}</li>
                        ))}
                    </ul>
                    :
                    null
                }
                <button className='submit' onClick={InscriptionData}>S'inscrire</button>
            </form>
        </div>
    );
}
