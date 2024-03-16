export default function Activite(uneActivite) {

    // Style du composant
    const style = `
    .carteActivite{
        height: 400px;
        width: 300px;
        border-radius: 20px;
        transition: transform 0.1s;
        background-color: #ffffff;
        box-shadow: rgb(32, 32, 32) 0px 5px 15px;
    }
    
    .carteActivite:hover{
        transform: scale(1.1);
    }
    
    .carteActivite img{
        height: 200px;
        width: 300px;
        border-radius: 20px 20px 0px 0px;
        border-bottom: solid 1px black;
    }
    
    .carteActivite div p{
        height: 200px;
        text-align: center;
    }`;

    return (
        <div>
            <style>{style}</style>
            <div className='carteActivite'>
                <img src={"http://localhost:5000/images/" + uneActivite.img} alt=""></img>
                <div>
                    <h3>{uneActivite.nom}</h3>
                    <p>{uneActivite.description}</p>
                </div>
            </div>
        </div>
    );
}