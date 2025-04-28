import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './TournamentReg.css'
import line from '../../assets/line.svg'
const TournamentReg = () => {

    const {id} = useParams();
    const [numberPlayersInOneTeam, setNumberPlayersInOneTeam] = useState([]);

    // получение количества игроков для отрисовки формы
    useEffect(() => {
      const array = [];
      fetch('http://localhost:8080/get-number-of-players',{
        method: 'POST',
        body: JSON.stringify({id}),
        headers: {'content-type': "application/json"}
      }).then(res => res.text()).then(res=>{
        for(let i=2; i<=parseInt(res); i++){
          array.push(i);
        }
        setNumberPlayersInOneTeam(array);
      })
    }, [id])

    // добавление команды и игроков в неё
    const addTeam = (e) => {
      e.preventDefault();
      const players = []
      const teamName = e.target.elements.team_name.value;

      // получение полей капитана
      const captainFirstname = e.target.elements.captain_firstname.value
      const captainLastname = e.target.elements.captain_lastname.value
      const captainPatronymic = e.target.elements.captain_patronymic.value
      const captainNickname =  e.target.elements.captain_nickname.value
      const captainPhone = e.target.elements.captain_phone.value

      // добавление объекта капитана в массив игроков
      players.push({team_name: teamName, player_firstname: captainFirstname, player_lastname: captainLastname, player_patronymic: captainPatronymic, player_nickname: captainNickname, player_phone: captainPhone})

      // получение инпутов для последующего использования для заполнения объектами игроков массива игроков
      const inputs = e.target.elements;

      // массива для всех отдельных значений инпутов остальных игроков
      const playerFirstnames = [];
      const playerLastnames = [];
      const playerPatrymics = [];
      const playerNicknames = [];

      // получение всех полей остальных игроков
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input.name === 'player_firstname') {
          playerFirstnames.push(input.value);
        }
        if (input.name === 'player_lastname'){
          playerLastnames.push(input.value);
        }
        if (input.name === 'player_patronymic'){
          playerPatrymics.push(input.value);
        }
        if (input.name === 'player_nickname'){
          playerNicknames.push(input.value);
        }
      }

      // добавление остальных объектов игроков в массив игроков
      for(let i=0; i<playerFirstnames.length; i++){
        players.push({team_name: teamName, player_firstname: playerFirstnames[i], player_lastname: playerLastnames[i], player_patronymic: playerPatrymics[i], player_nickname: playerNicknames[i], player_phone: ''})
      }

      // добавление команды в бд
      fetch('http://localhost:8080/add-team',{
        method: 'POST',
        body: JSON.stringify({name: teamName}),
        headers: {'content-type': "application/json"}
      }).then(res => res.text()).then(res => console.log(res))

      // добавление команды на турнир в бд
      fetch('http://localhost:8080/add-team-in-tournament',{
        method: 'POST',
        body: JSON.stringify({tournament_id: id, name: teamName}),
        headers: {'content-type': "application/json"}
      }).then(res => res.text()).then(res=>console.log(res))

      // добавление игроков из команды в бд
      fetch('http://localhost:8080/add-players',{
        method: 'POST',
        body: JSON.stringify({players: players}),
        headers: {'content-type': "application/json"}
      }).then(res=>res.text()).then(res=>console.log(res))
    }

  return (
    <div className='tournament_reg-container'>
      <h2>
        <span>РЕГИСТРАЦИЯ</span>
        <span> НА ТУРНИР</span>
      </h2>
      <img src={line} alt='line'></img>
      {/* <div className='btns__filter__teams__forms'>
        <button>Добавить команду</button>
        <button>Найти команду</button>
      </div> */}
      <form className='form__add__team' onSubmit={addTeam}>
        <input type="text" placeholder='название команды' name='team_name' required/>
        <p>Капитан</p>
        <div>
          <input type="text" placeholder='Фамилия' name='captain_lastname' required/>
          <input type="text" placeholder='Имя' name='captain_firstname' required/>
          <input type="text" placeholder='Отчество' name='captain_patronymic' required/>
          <input type="text" placeholder='Никнейм' name='captain_nickname' required/>
          <input type="text" placeholder='Телефон' name='captain_phone' required/>
        </div>
        {numberPlayersInOneTeam.map((player) => (
          <div key={player}>
            <p>{player + ' игрок'}</p>
            <input type="text" placeholder='Фамилия' name='player_lastname' required/>
            <input type="text" placeholder='Имя' name='player_firstname' required/>
            <input type="text" placeholder='Отчество' name='player_patronymic' required/>
            <input type="text" placeholder='Никнейм' name='player_nickname' required/>
          </div>
        ))}
        <button>Отправить</button>
      </form>
    </div>
  )
}

export default TournamentReg