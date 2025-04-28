import React, { useEffect, useState } from 'react'
import './RegForPrac.css'

const RegForPrac = () => {

    const [allRegOnPractice, setAllRegOnPractice] = useState([]);
    const [uniqueDates, setUniqueDates] = useState([]);
    const [isUserRegistered, setIsUserRegisterd] = useState(false);
    const uniqueTimes = ['8:00-9:00', '9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00', '14:00-15:00'];

    useEffect(() => {
        fetch('http://localhost:8080/get-all-reg-on-practice',{
        }).then(res=>res.json()).then(res=>{
            setAllRegOnPractice(
                res.sort((a, b) => a.id - b.id)
            );
            setUniqueDates(
                [...new Set(res.map(item => item.date))].sort((a, b) => new Date(a) - new Date(b))
            )
        })
    }, [isUserRegistered])

    const registerOnPractice = (id) => {
        console.log(id);
        const regOnPractice = allRegOnPractice.find(item => item.id === id); 
        console.log(regOnPractice)
        if(regOnPractice.number_of_computers===0){
            alert("Все компьютеры на это время уже заняты")
        }else{
            fetch('http://localhost:8080/reg-computer-on-practice',{
                method: 'POST',
                body: JSON.stringify({id}),
                headers: {'content-type': "application/json"}
            }).then(res=>res.text()).then(res=>{
                if(isUserRegistered===false){
                    setIsUserRegisterd(true)
                }else{
                    setIsUserRegisterd(false)
                }
            })
        }
    }

  return (
    <div className='reg-for-prac-container'>
        <h2>
            <span>ЗАПИСЬ НА </span>
            <span>ТРЕНИРОВКУ</span>
        </h2>
        <div>
            <div className='schedule'>
                <span>Дата</span>
                {uniqueTimes.map((time) => (<span>{time}</span>))}
            </div>
            <div className='dates'>
                {uniqueDates.map((date) => (
                    <span key={date}>{date}
                        {allRegOnPractice.filter(item => item.date === date).map((reg) => (
                            <button key={reg.id} onClick={() => registerOnPractice(reg.id)}>{reg.number_of_computers + '/5'}</button>
                        ))}
                    </span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default RegForPrac