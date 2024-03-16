import React, { useState } from 'react';

import Connexion from "../components/Connexion";
import Inscription from "../components/Inscription";

export default function Compte() {
    // Style de la page
    const style = `
    .compte{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .compte > div{
        width: 40%;
        border: solid 1px black;
    }

    .buttons{

    }

    button{
        width: 50%;
        padding: 2%;
    }
    `;

    const [loginOrSignin, setLoginOrSignin] = useState(true); // true: Composant Connexion / false: composant Inscription

    const toggleLogin = () => {
        setLoginOrSignin(true);
    };

    const toggleSignin = () => {
        setLoginOrSignin(false);
    };

    return (
        <div className='compte'>
            <style>{style}</style>
            <div>
                <div className='buttons'>
                    <button onClick={toggleLogin}>Se connecter</button>
                    <button onClick={toggleSignin}>S'inscrire</button>
                </div>
                {loginOrSignin ?
                    (<Connexion />)
                    :
                    (<Inscription />)
                }
            </div>
        </div>
    );
}