import React, { useState } from 'react'
import './FormTournament.css'

const FormTournament = () => {

    const [logo, setLogo] = useState('dota2_logo.svg');

    const handleSelectChange = (event) => {
        setLogo(event.target.value);
        console.log(event.target.value);
    };

    const addTournament = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const start_date = e.target.elements.start_date.value;
        const end_date = e.target.elements.end_date.value;
        const number_of_teams = e.target.elements.number_of_teams.value;
        const number_of_players_in_one_team = e.target.elements.number_of_players_in_one_team.value;
        const tournament = {name, logo, start_date, end_date, number_of_teams, number_of_players_in_one_team};
        console.log(tournament);
        fetch('http://localhost:8080/add-tournament',{
            method: 'POST',
            body: JSON.stringify(tournament),
            headers: {'content-type': "application/json"}
        }).then(res=>res.text()).then(res=>console.log(res))
    }

  return (
    <div className='form-tournament-container'>
        <form onSubmit={addTournament}>
            <input type="text" placeholder='Название турнира' name='name'/>
            <select value={logo} onChange={handleSelectChange}>
                <option value="dota2_logo.svg">DOTA2</option>
                <option value="lol_logo.svg">LOL</option>
                <option value="valorant_logo.svg">VALORANT</option>
            </select>
            <p>Дата начала турнира</p>
            <input type="date" name='start_date'/>
            <p>Дата окончания турнира</p>
            <input type="date" name='end_date'/>
            <input type="number" placeholder='количество команд на турнире' name='number_of_teams'/>
            <input type="number" placeholder='количество игроков в одной команде' name='number_of_players_in_one_team'/>
            <button>Добавить турнир</button>
        </form>
    </div>
  )
}

export default FormTournament