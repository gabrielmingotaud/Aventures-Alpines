export default function Contact() {
    
    // Style de la page
    const style = `

    .contact{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 2%;
        color: black;
    }

    form{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 60%;
        padding: 2%;
    }

    input{
        font-size: larger;
        width: 60%;
        border: none;
        border-bottom: solid 1px black;
        outline: none;
        transition: transform 0.1s;
        background-color: transparent;
        margin: 2%;
    }

    textarea{
        border: solid 1px black;
        border-radius: 10px;
    }

    .submit{
        width: 20%;
        margin: 2%;
    }

    .position{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    .position iframe{
        border: 0;
    }
    `;

    return (
        <div className="contact">
            <style>{style}</style>
            <h2>Nous contacter</h2>
            <form>
                <input type='text' placeholder='Email'></input>
                <textarea rows="20" cols="100" placeholder='Message'></textarea>
                <button className='submit'>Envoyer</button>
            </form>
            <hr />
            <div className="position">
                <h2>Nous trouver</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d94794.96874989872!2d6.070684693713091!3d45.843911610623586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1708537918323!5m2!1sfr!2sfr" width="80%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="gfdsz"></iframe>
            </div>

        </div>
    );
}