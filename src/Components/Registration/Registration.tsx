import '../../App.css';
import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface usersPageType {
    userName: null | string,
    userSurname: null | string,
    userPhone: null | string,
    userPhoto: null | string
}

interface propsRegister {
    usersPage: usersPageType,
    createUser: (newUser: object) => void    
}

interface User{
    email: string | null,
    password: string | null,
    name: string | null,
    surname: string | null,
    phone: string | null
}

let Registration:React.FC<propsRegister> = (props)=>{
    
    const navigate = useNavigate();
    const [eyes, setEyes] = useState(false);
    const [newUser, setNewUser] = useState<User>({
        email: null,
        password: null,
        name: null,
        surname: null,
        phone: null
    })
    const [email, setEmail] = useState<string | null>("")
    const [password, setPassword] = useState<string | null>("")
    const [name, setName] = useState<string | null>("")
    const [surname, setSurname] = useState<string | null>("")
    const [phone, setPhone] = useState<string | null>('')
    const [emailDirty, setEmailDirty] = useState<boolean>(false)
    const [passwordDirty, setPasswordDirty] = useState<boolean>(false)
    const [nameDirty, setNameDirty] = useState<boolean>(false)
    const [surnameDirty, setSurnameDirty] = useState<boolean>(false)
    const [phoneDirty, setPhoneDirty] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>("Email не может быть пустым")
    const [passwordError, setPasswordError] = useState<string>("Password не может быть пустым")
    const [nameError, setNameError] = useState<string>("Имя не может быть пустым")
    const [surnameError, setSurnameError] = useState<string>("Фамилия не может быть пустым")
    const [phoneError, setPhoneError] = useState<string>("Номер телефона не может быть пустым")
    const [isValid, setIsValid] = useState<boolean>(false)

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case 'email': 
                setEmailDirty(true)
            case 'password':
                setPasswordDirty(true) 
            case 'name': 
                setNameDirty(true)
            case 'surname':
                setSurnameDirty(true)
            case 'phone':
                setPhoneDirty(true)
        }
    }


    const emailHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setNewUser(prev => ({...prev, email: e.target.value}))
        const re = /^\w{7,}@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Некорректный Email, логин должен содержать больше 6 символов");
        } else {
            setEmailError('');
        }
    }
    

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setNewUser(prev => ({...prev, password: e.target.value}))
        if(e.target.value.length < 6 || e.target.value.length > 15){
            setPasswordError("Пароль должен быть длиннее 6 и меньше 15")
            if(!e.target.value){
                setPasswordError('Пароль не должен быть пустым')
            }
        }   
        else{
            setPasswordError('')
        }
    }

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(prev => ({...prev, name: e.target.value}))
        setName(e.target.value)
        if(!e.target.value){
            setNameError('Имя не должен быть пустым')
        }
        else{
            setNameError('')   
        }
    }

    const surNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value){
            setSurnameError('Фамилия не должно быть пустым')
        }
        else{
            setSurnameError('')
        }
        setSurname(e.target.value)
        setNewUser(prev => ({...prev, surname: e.target.value}))
    }

    const phoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
        setNewUser(prev => ({...prev, phone: e.target.value}))
        const rePhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if(!rePhone.test(String(e.target.value).toLowerCase())){
            setPhoneError("Некорректный номер телефона")
        }
        else{
            setPhoneError('')
        }
    }

    useEffect(()=>{
        if(emailError || passwordError || nameError || surnameError || phoneError ) {
            setIsValid(false)
        }
        else{
            setIsValid(true)
        }
    },[emailError, passwordError, nameError, surnameError, phoneError])
    

    let createToUser = ()=>{
        fetch('http://192.168.0.102/register', {
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
            console.log(data); 
            props.createUser(data);
            localStorage.setItem('user', JSON.stringify({...data.user, accessToken: data.accessToken}))
            navigate("/");
        })
        .catch(error => {
            console.error("Произошла ошибка:", error);
        });
    }
    return(
        <div className='registration'>
                <div className="registration_icon"><img src='./img/logo_reg.png'></img></div>
                <form action='' className="form">
                    <h1>Регистрация</h1>
                    {(emailDirty && emailError) && <div className='warning-auth' style={{color: 'red', fontSize: '14px', display: 'flex', justifyContent: 'start', width: '60%'}}>{emailError}</div>}
                    <input onBlur={ e => blurHandler(e)} value={email || ''} name='email' type="text" placeholder="Email" onChange={e => emailHandler(e)} />
                    {(passwordDirty &&passwordError) && <div className='warning-auth' style={{color: 'red', fontSize: '14px', display: 'flex', justifyContent: 'start', width: '65%', marginLeft: '15px'}}>{passwordError}</div>}
                    <div className='input_password'>
                        <input className='input_svg' onBlur={ e => blurHandler(e)} value={password || ''} name='password' type={eyes ? "text" : "password"} placeholder="Password" autoComplete='off' onChange={e => passwordHandler(e)} />
                        {
                            eyes ? (
                                <span onClick={()=>(setEyes(false))}><FaEye /></span>
                            )
                            :
                            (
                                <span onClick={()=>(setEyes(true))}><FaEyeSlash /></span>
                            )

                        
                        }
                    </div>
                    {(nameDirty && nameError) && <div className='warning-auth' style={{color: 'red', fontSize: '14px', display: 'flex', justifyContent: 'start', width: '60%'}}>{nameError}</div>}
                    <input onBlur={ e => blurHandler(e)} value={name || ''} type="text" name='name' placeholder="Имя" onChange={e => nameHandler(e) } />
                    {(surnameDirty && surnameError) && <div className='warning-auth' style={{color: 'red', fontSize: '14px', display: 'flex', justifyContent: 'start', width: '60%'}}>{surnameError}</div>}
                    <input onBlur={ e => blurHandler(e)} value={surname || ''} type="text" name='surname' placeholder="Фамилия" onChange={e => surNameHandler(e)} />
                    {(phoneDirty && phoneError) && <div className='warning-auth' style={{color: 'red', fontSize: '14px', display: 'flex', justifyContent: 'start', width: '60%'}}>{phoneError}</div>}
                    <input onBlur={ e => blurHandler(e)} value={phone || ''} type="number" name='phone' placeholder="Номер Телефона" onChange={e => phoneHandler(e)}/>
                    <button type="button" disabled={!isValid} className="btn" onClick={createToUser}>Создать аккаунт</button>
                    <Link to='/login'>У меня есть аккаунт</Link>
                </form>
        </div>
    )
}
export default Registration;