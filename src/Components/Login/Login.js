import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


let Login = ()=>{
    const navigate = useNavigate();
    const [eyes, setEyes] = useState(false); 
    const [newUser, setNewUser] = useState({
        email: null,
        password: null
    });
    let signIn=()=>{
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка HTTP, статус " + response.status);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('user', JSON.stringify({...data.user, accessToken: data.accessToken}))
            navigate("/");
        })
        .catch(error => {
            console.error("Произошла ошибка:", error);
        });
    }
    return (
        <div className="registration">
            <form action='' className="form login">
                <h1>Login</h1>
                <input type="text" placeholder="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                <input type={eyes ? "text" : "password"} placeholder="Password" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                {
                    eyes ? (
                        <span className="span_login" onClick={()=>(setEyes(false))}><FaEye /></span>
                    )
                    :
                    (
                        <span onClick={()=>(setEyes(true))}><FaEyeSlash /></span>
                    )

                   
                }
                <button type="button" className="btn" onClick={signIn}>Войти</button>
                <Link to='/register'>Зарегистрироваться</Link>
            </form>
        </div>
    );
}
export default Login;