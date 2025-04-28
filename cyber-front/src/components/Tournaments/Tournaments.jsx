import React, { useEffect, useState } from 'react'
import './Tournaments.css'
import { useNavigate } from 'react-router-dom';


const Tournaments = () => {

    const navigate = useNavigate();
    const dota2_logo = 'https://s3-alpha-sig.figma.com/img/7aaa/7414/2398e410a185aabd6f59f280d195bd97?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZPNBCe5d7gfi0EaFtisJ4ZlSUr3jcN7lWAAsVyBxbP~lZZyIuPw7alQhjNEsJCzB8IP8QvBZ8g8fumvmolp8o0au8r~szbaVo1eE1L~tDR8HYQz9odz4Z-nm7O6P2G5RkzlrQfD1XSmbXPhV0DeM6GfB0uFFv21oKrt7aLf5vdGfgTR05LFLhb8GXmRUUzTCTh2etTRBvjsVptvI5h9aKOVpQvyqqlYOgghzmnz2R-7MGseul9AoA3qlFr9935yVwqnZmqDh9Wx424SFTJcjWJyOcc80uZYagzTpFfILjBb600nhxB3qdz9-9Fv6CfsSS~ST1mWrz409En82qY0JFw__'
    const valorant_logo = 'https://s3-alpha-sig.figma.com/img/9443/d38e/50bb61f89615c67963113fc74f58575a?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WN9KM~KNk53GTxTTWK-w5p0~4SacHlhSzn9630FALFTGX2DHZc2ORYkQPuWAA8I5OvSYeD8Bv2WR3LwQip~Z8Z--Fq6Ak-oQciXSUiTm5iYDkRiWVSXMX2S6z7AmoHzRmxolFEEWg9Eaom8R8-eccIazavaqb0dkLiC~EQ6fCL-jEZISP0gshMqz-2Rhwb9boOi9rznQwUyAtg3IK71XI9f-m~iVOQluR4gRwEGUUNUp8iOK5eeZqIc1Y8tj~hyOZjtp9JEKG0aweQmTBeIyY-aTWZfNBQvrI3bcTWJCISGuo1cgRa6VodQrl-kTy16nXKQ4BNF2rr5S29ItFL5s4Q__'
    const lol_logo = 'https://s3-alpha-sig.figma.com/img/4a13/c7a3/6c6c22fc67125d698737f8683a6e103d?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F8IjrnHo2glhFC~bIsEXJaP9dcapSvliWtWXpyH-yCz5zb1nBPCofCdXLNtMMA3YbywXsp-vreMDv72B3fizE7wUHCwcmgzjrCJVyMghQFygBMMLVFkrmDM84HzEPQKpMX6~bSxlwhfgweIEloWuDVctOZ7wwFk24AdSzUMEy6A9LzXuDS1K73hqVGqkDLS9PInYJlckPPydEGvdxw-oDLX9XgsCW0zMiRsXTl42tcqzTpQoZvNibgDLSnedpyr01SDb9M5Tt2H5wEIdDmlf9JLpctl2gk-bRBYypS~ltK6UyBHD2FgqSLr6p-wJzX-wwuXqtAdmJQ6oNxu5mfQPCg__'
    
    const logoMap = {
        'dota2_logo.svg': dota2_logo,
        'valorant_logo.svg': valorant_logo,
        'lol_logo.svg': lol_logo,
      };

    //стейтовые переменные
    const [selectedButton, setSelectedButton] = useState('upcoming');
    const [tournaments, setTournaments] = useState([]);
    const [filteredTournaments, setFilteredTournaments] = useState([]);

    //получение всех турниров и их изначальная фильтрация
    useEffect(() => {
        const currentDateTime = new Date();
        fetch('http://localhost:8080/get-all-tournaments', {
        }).then(res => res.json()).then(res => {
            setTournaments(res);
            setFilteredTournaments(
                res.filter(tournament => {
                    const startDate = new Date(tournament.start_date);
                    return startDate > currentDateTime;
                })
            )
        })
    }, [])

    //переключение цвета кнопки выбранного турнира и фильтрация
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        const currentDateTime = new Date();
        if(buttonName === 'upcoming'){
            setFilteredTournaments(
                tournaments.filter(tournament => {
                    const startDate = new Date(tournament.start_date);
                    return startDate > currentDateTime;
                })
            )
        }
        if(buttonName === 'current'){
            setFilteredTournaments(
                tournaments.filter(tournament => {
                    const startDate = new Date(tournament.start_date);
                    const endDate = new Date(tournament.end_date);
                    return startDate <= currentDateTime && endDate >= currentDateTime;
                })
            )
        }
        if(buttonName === 'past'){
            setFilteredTournaments(
                tournaments.filter(tournament => {
                    const endDate = new Date(tournament.end_date);
                    return endDate < currentDateTime;
                })
            )
        }
        console.log(filteredTournaments);
    };

    const handleNavigateTournamentReg = (id) => {
        navigate('/tournament-reg/'+ id)
    }

  return (
    <div className='tournaments-container'>
        <h2>ТУРНИРЫ</h2>
        <div className='tournament-filters'>

            <button 
                className={selectedButton === 'upcoming' ? 'selected-filter' : ''} 
                onClick={() => handleButtonClick('upcoming')}
            >
                ПРЕДСТОЯЩИЕ ТУРНИРЫ
            </button>

            <button 
                className={selectedButton === 'current' ? 'selected-filter' : ''}
                onClick={() => handleButtonClick('current')}
            >
                ТЕКУЩИЕ ТУРНИРЫ
            </button>

            <button 
                className={selectedButton === 'past' ? 'selected-filter' : ''}
                onClick={() => handleButtonClick('past')}
            >
                ПРОШЕДШИЕ ТУРНИРЫ
            </button>

        </div>
        <div className='tournaments'>
            {filteredTournaments.map((tournament) => (
                <div key={tournament.id} className='tournament'>
                        <img 
                          src={logoMap[tournament.logo] || dota2_logo}  // Используем маппинг, если tournament.logo не найден, по умолчанию отображаем dota2_logo
                          alt="game_logo"
                        />
                    <p>{tournament.start_date}</p>
                    <a href='/'>Информация о турнире</a>
                    {selectedButton === 'upcoming' && <button onClick={() => handleNavigateTournamentReg(tournament.id)}>ЗАПИСАТЬСЯ</button>}
                    {selectedButton === 'past' && <button>РЕЗУЛЬТАТЫ</button>}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Tournaments