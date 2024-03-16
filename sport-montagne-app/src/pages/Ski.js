import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carte from '../components/Carte';
import Tableau from '../components/Tableau';
import Loader from '../components/Loader';

export default function Ski() {

    // Style de la page
    const style = `
    .ski{
        color: black;
        overflow: hidden;
    }

    .ski a{
        color: black;
        text-decoration: underline;
    }

    .ski > div{
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

    .disciplines{
        width: 80%;
        padding: 0;
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
    }
    `;

    const disciplines = [{ // Données pour le composant Carte
        nom: "Ski de fond",
        description: "Le ski de fond se pratique en terrain plat ou vallonné. Il fait partie de la famille d'activités du ski nordique, qui inclut aussi le combiné nordique et le biathlon. Il constitue le sport d'hiver d'endurance par excellence."
    },
    {
        nom: "Ski hors piste",
        description: `Skier ou surfer hors-piste consiste à arpenter les pentes non balisées, non surveillées et non damées. Cette pratique procure davantage de sensations que le ski sur piste, mais elle est également plus dangereuse. Alors pensez à prendre vos précautions et à recourir à un guide.`,
    },
    {
        nom: "Descente",
        description: "C'est la discipline la plus rapide et ses parcours sont les plus longs des épreuves de ski alpin. La descente combine la vitesse à l'état pur, une maîtrise technique et un courage à toute épreuve.",
    },
    {
        nom: "Slalom et slalom géant",
        description: `Les parcours de slalom sont les plus courts, mais ils comportent le plus grand nombre de portes et les portes les plus étroites.
            Le slalom géant requiert une grande précision, un bon sens du rythme et une bonne puissance pour aborder au mieux chaque virage.
            Comme son nom l'indique, le parcours d'un slalom géant est plus long que celui d'un slalom. Les portes sont également plus espacées, ce qui donne des virages plus larges.`,
    },
    {
        nom: "Super G",
        description: `C'est un compromis entre la descente et le slalom géant. La dénivellation en super-G est légèrement inférieure à celle de la descente, mais le parcours est préparé à peu près de la même façon.
            Contrairement à la descente, les compétiteurs ne peuvent pas essayer le parcours avant la course officielle. Comme ils disposent d'un temps de reconnaissance restreint, ils doivent savoir mémoriser rapidement tous les paramètres physiques de la course.`,
    },
    {
        nom: "Saut à ski",
        description: `Sport d'hiver dans lequel les skieurs descendent une pente sur une rampe pour décoller (le tremplin) essayant d'aller aussi loin que possible.
            En plus de la longueur, les juges attribuent des points au style en vol et à l'atterrissage du sauteur. Les skis utilisés sont longs et larges.`,
    },
    {
        nom: "Combiné",
        description: `Désormais, le combiné est une discipline à part entière puisque les participants doivent réaliser une manche de descente, puis une manche de slalom dans la même journée.
            Cette épreuve permet de mettre en valeur les skieurs polyvalents qui savent jouer de leur vitesse dans la descente et rivaliser d'adresse et de technique dans le slalom.`,
    },
    ];

    const [stationsSki, setStationsSki] = useState([]); // Tableau contenant les stations de ski
    const [loading, setLoading] = useState(true); // Chargement de la page
    useEffect(() => {

        // Effectuer une requête GET vers votre API pour récupérer la liste des activités

        const fetchStations = async () => {
            await axios({
                method: "get",
                baseURL: "http://localhost:5000/api",
                url: "stationSki"
            }).then(response => {
                setStationsSki(response.data);
                setLoading(false);
            }).catch(error => {
                console.error('Erreur lors de la récupération des stations de ski :', error);
                setLoading(false);
            });
        };
        fetchStations();
    }, [stationsSki]);

    const tabPropTableau = []; // Tableau contenant les données pour le composant Tableau
    stationsSki.map(s => tabPropTableau.push({id: s.id_station, nom: s.nom_station, valeur: s.conditions_enneigement, img: s.image_url, enneigement: s.conditions_enneigement, emplacement: s.emplacement}));

    return (
        <div className="ski">
            <style>{style}</style>
            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/wQxXugXeSFc?si=y049aPo6YcVkrYAq" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <div>
                <h2>Disciplines de ski en montagne</h2>
                <div className='disciplines'>
                    {
                        disciplines.map((discipline, index) => (
                            <Carte key={index} nom={discipline.nom} description={discipline.description} />
                        ))
                    }
                </div>
                <a target='blank' href='https://www.skiset.com/lexique/disciplines-ski-glisse.html'>Sources</a>
            </div>
            <hr/>
            {loading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <div>
                    <Tableau titre="Liste des stations de ski partenaires" colonnes={["Stations", "Conditions enneigement", "Emplacement"]} data={tabPropTableau} />
                </div>
            )}
        </div>
    );
}