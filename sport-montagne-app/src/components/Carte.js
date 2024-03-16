export default function Carte(uneCarte) {

    // Style du composant
    const style = `
    .carte{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column; 
        width: 30%;
        padding: 2%;
    }

    .carte h3{
        margin: 0;
    }

    .carte p{
        text-align: center;
    }

    .carte ul{
        list-style-type: circle;
    }
    `;

    return (
        <div className="carte">
            <style>{style}</style>
            <h3>{uneCarte.nom}</h3>
            {uneCarte.description ? (<p>{uneCarte.description}</p>) : null}
            {uneCarte.liste ? (<ul>{uneCarte.liste.map((l, index) => (<li key={index}>{l}</li>))}</ul>) : null}
            {uneCarte.source ? (<a target="blank" href={uneCarte.source}>Sources</a>) : null}
        </div>
    );
}