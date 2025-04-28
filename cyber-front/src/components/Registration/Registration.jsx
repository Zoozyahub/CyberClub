import React from 'react'
import './Registration.css'
import { useNavigate } from 'react-router-dom'

const Registration = () => {

    const navigate = useNavigate();

    const addUser = (e) => {

        e.preventDefault();

        const lastname = e.target.elements.lastname.value;
        const firstname = e.target.elements.firstname.value;
        const patronymic = e.target.elements.patronymic.value;
        const nickname = e.target.elements.nickname.value
        const phone = e.target.elements.phone.value;
        const password = e.target.elements.password.value;
        const tg = e.target.elements.telegram.value? e.target.elements.telegram.value : '';
        const vk = e.target.elements.vk.value? e.target.elements.vk.value: '';
        const user = {team_id: null, lastname, firstname, patronymic, nickname, phone, password, tg, vk};

        fetch('http://localhost:8080/addUser', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {'content-type': "application/json"}
        }).then(res => res.json()).then(res => {
            if(!res.error){
                localStorage.setItem('userInfo', JSON.stringify(res));
                navigate('/');
            }
        }).catch((error) => {
            alert("Пользователь с таким телефоном уже зарегистрирован")
        })
    }

  return (
    <div className='registration-container'>
        <h2>РЕГИСТРАЦИЯ</h2>
        <form onSubmit={addUser}>
            <div>
                <input type="text" placeholder='Фамилия' name='lastname' required/>
                <input type="text" placeholder='Имя' name='firstname' required/>
                <input type="text" placeholder='Отчество' name='patronymic' required/>
                <input type="text" placeholder='Никнейм' name='nickname' required/>
                <input type="text" placeholder='Телефон' name='phone' required/>
                <input type="text" placeholder='Пароль' name='password' required/>
                <input type="text" placeholder='Telegram (необязательно)' name='telegram'/>
                <input type="text" placeholder='Vk (необязательно)' name='vk'/>
            </div>
            
            <button>Зарегистрироваться</button>
        </form>
    </div>
  )
}

export default Registration