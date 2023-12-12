import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import nutriplannerLogo from "./../../assets/imgs/logo.svg"
import { PrivateRoute } from "../../PrivateRoute";

function Login() {
    const navigate = useNavigate();

    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async(e) => {
        e.preventDefault();
        console.log(pin);

        try{
            const response = await axios.post('https://teste-deploy-nutriplanner2.vercel.app/login', 
                JSON.stringify({pin}),
                {
                    headers:{ 'Content-Type': 'application/json'}
                }
            );
            console.log(response.data);
            setUser(response.data);
            navigate('/home');
        }catch (error){
            if(!error?.response){
                setError('Error');
            }else if (error.response.status == 401){
                setError('Pin inválido!');
            }
        }
    }

    return (
        <div className="login-page">
            <div className="login-form-wrap">
                {user == null ? 
                (
                    <div>
                        <div className="header-nutriplanner">
                            <img src={nutriplannerLogo} className="logo-image" />
                        </div>
                        <div className="login-form-container">
                            <h2 className="login-welcome">Bem-vindo!</h2>
                                <form className="login-form">
                                    <input type="pin" 
                                            name="pin" 
                                            placeholder="Pin de acesso" 
                                            className="login-input"
                                            required
                                            onChange={(e) => setPin(e.target.value)}
                                            />
                                    <button type="submit" 
                                        className="btn-login"
                                        onClick={(e) => handleLogin(e)}>Entrar</button>
                                </form>
                                
                                <p>{error}</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>logado</p>
                    </div>
                )}
                <div className="login-footer">
                    <p className="footer-title">Universidade de Brasília</p>
                    <h3 className="footer-team">Guardiões do Bem e do Leite ©️ 2023</h3>
                </div>   
            </div>

        </div>
    );
}

export default Login;