import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

export default function Modal(unModal) {
    
    // Style du composant
    const style = `

    .overlay{
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
    
    }

    .modal{
        min-height: 20%;
        width: 40%;
        background-color: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .modal img{
        width: 100%;
    }
    
    .modal svg {
        position: absolute;
        top: 0px;
        right: 0px;
    }

    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .credit{
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: row;
    }
    `;

    return (
        <div className="overlay">
            <style>{style}</style>
            <div className="modal">
                <Icon path={mdiClose} size={1} onClick={unModal.toggleModal} />
                {unModal.img ? (<img src={"http://localhost:5000/images/" + unModal.img} alt=""></img>) : null}
                <div className='container'>
                    <h2>{unModal.nom}</h2>
                    <p>{unModal.description}</p>
                    {unModal.niveauDifficulte ? (<p>Niveau de difficulté: <span>{unModal.niveauDifficulte}</span></p>) : null}
                    {unModal.enneigement ? (<p>Conditions d'enneigement: <span>{unModal.enneigement}</span></p>) : null}
                    {unModal.emplacement ? (<p>Emplacement: <span>{unModal.emplacement}</span></p>) : null}
                </div>
                {unModal.datePublication || unModal.auteur ?
                    (<div className='credit'>
                        {unModal.auteur ? (<p>Publié par: <span>{unModal.auteur}</span></p>) : null}
                        {unModal.datePublication ? (<p>Publié le: <span>{unModal.datePublication}</span></p>) : null}
                    </div>) : null
                }
            </div>
        </div>
    );
}