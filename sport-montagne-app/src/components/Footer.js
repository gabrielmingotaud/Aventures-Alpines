import Icon from '@mdi/react';
import { mdiInstagram, mdiTwitter } from '@mdi/js';

export default function Footer() {

    // Style du composant
    const style = `
    footer {
        height: 250px;
        background-color: rgb(54, 54, 54);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0
    }
    
    footer div ul{
        padding: 0px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row;
    }`;

    return (
        <footer>
            <style>{style}</style>
            <div>
                <h2>Suivez nous :</h2>
                <ul>
                    <li><a target='blank' href='https://www.instagram.com/'><Icon path={mdiInstagram} size={2} /></a></li>
                    <li><a target='blank' href='https://twitter.com/'><Icon path={mdiTwitter} size={2} /></a></li>
                </ul>
            </div>
        </footer>
    );
}
