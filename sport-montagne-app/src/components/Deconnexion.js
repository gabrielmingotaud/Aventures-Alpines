import  { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
    if(!window.localStorage.getItem('Token')){
        navigate("/");
    }
    window.localStorage.removeItem('Token');
    navigate("/");
}

