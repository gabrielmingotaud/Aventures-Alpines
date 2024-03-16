import Slider from '../components/Slider';
import Carte from '../components/Carte';
import image1 from '../images/Randonnee/image1.jpg';
import image2 from '../images/Randonnee/image2.jpg';
import image3 from '../images/Randonnee/image3.jpg';

const images = [image1, image2, image3]; // Images pourle Slider

export default function Randonnee() {

    // Style de la page
    const style = `
    .randonnee{
        color: black;
        overflow: hidden;
    }

    .randonnee a{
        color: black;
        text-decoration: underline;
    }

    .container{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        padding: 2%;
    }

    .titre{
        padding: 0px;
        background-color: #517441;
        color: white;
    }

    .infos{
        width: 80%;
        padding: 0;
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .map{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 2%;
        width: 100%;
    }

    .map iframe{
        border: 0;
    }
    `;

    const infos = [{ // Données pour le composant Carte
        nom: "Niveaux de difficulté",
        liste: ["Randonnée facile : moins de 500 mètres de dénivelé et entre 2 et 4 heures de randonnée", "Randonnée moyenne : entre 500 et 800 mètres de dénivelé pour 3 à 5 heures de marche", "Randonnée difficile : de 800 à 1500 mètres de dénivelé et entre 4 et 8 heures de marche", "Randonnée très difficile : au delà de 1500 mètres de dénivelé dans la journée et parfois entre 10 et 12 heures de randonnée"],
        source: "https://www.randozone.com/static/niveau-difficulte.php",
    },
    {
        nom: "Équipement recommandé",
        liste: ["Un sac à dos", "Une gourde", "Les papiers d’identité", "Poche plastifiée étanche"],
        source: "https://www.hikamp.com/materiel-de-randonnee-que-prendre-dans-son-sac/",
    },
    ];

    return (
        <div className="randonnee">
            <style>{style}</style>
            <div>
                <Slider images={images} />
            </div>
            <div className='container'>
                <h2>Informations</h2>
                <div className='infos'>
                    {
                        infos.map((info, index) => (
                            <Carte key={index} nom={info.nom} description={info.description} liste={info.liste} source={info.source} />
                        ))
                    }
                </div>
            </div>
            <hr />
            <div className='map'>
                <h2>Carte des randonnées</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3747159.7409058395!2d1.5023850579049889!3d46.775622775837824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1srandonn%C3%A9e%20france%20montagne!5e0!3m2!1sfr!2sfr!4v1708631259174!5m2!1sfr!2sfr" title='dqsf' width="80%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
}