import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from './pages/Home';
import Activites from './pages/Activites';
import Escalade from "./pages/Escalade";
import Compte from "./pages/Compte";
import Ski from "./pages/Ski";
import Articles from "./pages/Articles";
import Contact from "./pages/Contact";
import Randonnee from "./pages/Routes";
import Deconnexion from "./components/Deconnexion";

export default function App() {

    const style = `

    html {
        height: 100%;
    }

    body{
        min-height: 100%;
        margin: 0px;
        padding: 0px;
        font-family: monospace;
        color: white;
        position: relative;
        padding-bottom: 250px;
    }

    a{
        color: white;
        text-decoration: none;
    }
    
    ul{
        list-style: none;
    }
    
    #root{
        margin: 0px;
        padding: 0px;
    }`;

    return (
        <div>
            <style>{style}</style>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/activites" element={<Activites />}></Route>
                    <Route path="/randonnee" element={<Randonnee />}></Route>
                    <Route path="/escalade" element={<Escalade />}></Route>
                    <Route path="/ski" element={<Ski />}></Route>
                    <Route path="/blog" element={<Articles />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/account" element={<Compte />}></Route>
                    <Route path="/deconnexion" element={<Deconnexion />}></Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

