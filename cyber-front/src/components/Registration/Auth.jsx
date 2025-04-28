import React from 'react'
import './Auth.css'
import { useNavigate } from 'react-router-dom'

const Auth = () => {

    const navigate = useNavigate();

    const handleNavigateRegistration = () => {
        navigate('/registration')
    }

    const authUser = (e) => {
        e.preventDefault();
        const phone = e.target.elements.phone.value;
        const password = e.target.elements.password.value;
        const auth = {phone, password};
        fetch('http://localhost:8080/auth', {
        method: 'POST',
        body: JSON.stringify(auth),
        headers: { 'content-type': 'application/json' }
        })
        .then((res) => res.json())
        .then((res) => {
            if (!res.error) {
                localStorage.setItem('userInfo', JSON.stringify(res));
                navigate('/');
            }
        })
        .catch((error) => {
            alert('Неправильный телефон или пароль');
        });

    }

  return (
    <div className='auth-container'>
        <h2>АВТОРИЗАЦИЯ</h2>
        <form action="" onSubmit={authUser}>
            <input type="text" placeholder='Телефон' name='phone'/>
            <input type="text" placeholder='Пароль' name='password'/>
            <button>Отправить</button>
        </form>
        <div>
            <p>Ещё не зарегистированы?</p>
            <p onClick={handleNavigateRegistration}>Зарегистрироваться</p>
        </div>
    </div>
  )
}

export default Auth