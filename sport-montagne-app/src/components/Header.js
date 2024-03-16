import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

export default function Header() {

    // Style du composant
    const style = `
    header{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(43, 85, 24);
        color: white;
    }
    
    nav{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
    }
    
    nav ul{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
    }
    
    nav ul li a{
        padding: 10px;
        font-size: large;
    }
    
    nav ul li a:hover{
        text-decoration: underline;
    }
    
    header div{
        padding-right: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
    }
    
    header div h2{
        margin-right: 50px;
    }`;
    
    return (
        <header>
            <style>{style}</style>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="activites">Activités</Link></li>
                    <li><Link to="randonnee">Randonnée</Link></li>
                    <li><Link to="escalade">Escalade</Link></li>
                    <li><Link to="ski">Ski</Link></li>
                    <li><Link to="blog">Blog</Link></li>
                    <li><Link to="contact">Contact</Link></li>
                </ul>
                <div>
                    <h2>Aventures Alpines</h2>
                    {
                        window.localStorage.getItem('Token') ?
                        //<Link><Icon path={mdiAccount} size={1.5} color="white" /></Link>
                        <Link to="deconnexion">Se deconnecter</Link>
                        :
                        <Link to="account">Se connecter / S'inscrire</Link>
                    }
                    
                </div>
            </nav>
        </header>
    );
}

