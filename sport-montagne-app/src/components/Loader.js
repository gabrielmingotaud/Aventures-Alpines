export default function Loader() {

    // Style du composant
    const style = `
    .load{
        width: 100%;
        color: black;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        padding: 0px;
    }

    .loader {
        width: 50px;
        height: 50px;
        border: 5px solid rgb(54, 54, 54);
        border-bottom-color: #FFF;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
    
    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    } 
    }`;

    return (
        <div className="load">
            <style>{style}</style>
            <span className="loader"></span>
            <span>Chargement ...</span>
        </div>
    );
}
