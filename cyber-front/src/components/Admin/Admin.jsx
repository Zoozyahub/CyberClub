import React, { useEffect } from 'react'
import './Admin.css'
import { useNavigate } from 'react-router-dom'

const Admin = () => {

    const navigate = useNavigate();
    const handleNavigateToAddNews = () => {
        navigate('/add-news')
    }
    const handleNavigateToAddTournament = () => {
        navigate('/add-tournament')
    }

    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('userInfo'));
      if(!user || user?.is_admin === false){
        navigate('*')
      }
    },[])

  return (
    <div className='admin-container'>
        <button onClick={handleNavigateToAddNews}>Добавить новость</button>
        <button onClick={handleNavigateToAddTournament}>Добавить турнир</button>
    </div>
  )
}

export default Admin