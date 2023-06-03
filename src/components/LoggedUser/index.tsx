import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth-service.ts'
import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token.ts';

export default function LoggedUser()
{
    const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);
    const navigate = useNavigate();

    function handleLogoutClick(event: any)
    {
        authService.logout();
        setContextTokenPayload(undefined);
        navigate("/login");
        
    }

    return (
        contextTokenPayload && authService.isAuthenticated() ?
            (
                <div className="dsc-logged-user">
                    <p>{contextTokenPayload.user_name}</p>
                    <span onClick={handleLogoutClick}>Sair</span>
                </div>
            )
            :
            (
                <Link to="/login">
                    Entrar
                </Link>
            )
    );
}