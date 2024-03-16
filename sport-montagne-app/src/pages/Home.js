import image1 from "../images/Home/image1.jpg";
import image2 from "../images/Home/image2.jpg";
import image3 from "../images/Home/image3.jpg";
import Slider from "../components/Slider";

const images = [image1, image2, image3]; // Images pour  le  Slider

export default function Home() {

    // Style de la page
    const style = ` 
    #resumeDiv{
        color: black;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        padding: 5%;
    }
    
    #resumeDiv p{
        width: 40%;
        text-align: center;
    }
    `;

    return (
        <main>
            <style>{style}</style>
            <div>
                <Slider images={images}/>
            </div>
            <div id="resumeDiv">
                <h2>Aventures Alpines</h2>
                <p>Aventures Alpines est une plateforme en ligne conçue spécialement pour les amoureux du
                    sport de montagne et de l'exploration en altitude. Que vous soyez un grimpeur passionné, un
                    randonneur tranquille ou simplement fasciné par la beauté majestueuse des montagnes,
                    Aventures Alpines vous offre un espace pour vous informer, vous inspirer et partager vos
                    expériences.
                </p>
            </div>
            <span className="loader"></span>
        </main>
    );
}

