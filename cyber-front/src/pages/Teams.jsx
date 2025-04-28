import './Teams.css'

import Team from "../components/team/Team";
import { useEffect, useState } from 'react';

function Teams(){

    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/get-all-teams',{
        }).then(res=>res.json()).then(res=>setTeams(res))
        fetch('http://localhost:8080/get-all-players',{
        }).then(res=>res.json()).then(res=>setPlayers(res))
    }, [])

    return(
        <div className="teams-container">
          {teams.map((team) => (
            <Team
              key={team.id}
              name={team.name}
              image={team.logo}
              players={players.filter((player) => player.team_id === team.id)}
            />
          ))}
        </div>
      );

}

export default Teams;