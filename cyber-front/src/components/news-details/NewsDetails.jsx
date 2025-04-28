import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetails.css'

const NewsDetails = () => {
  const { id } = useParams(); 
  const [news, setNews] = useState(null); 
  const is_admin = JSON.parse(localStorage.getItem('userInfo'))?.is_admin;
  useEffect(() => {

    fetch(`http://localhost:8080/get-news-by-id`,{
      method: 'POST',
      body: JSON.stringify({id}),
      headers: {'content-type': "application/json"}
    }).then(res=>res.json()).then(res=>{
      if(!res.error){
        setNews(res)
      }else{
        setNews(null)
      }
    }).catch((error) => setNews(null))
  }, [id])

  if (!news) {
    return <div>Loading...</div>; 
  }

  const deleteNews = () => {
    fetch(`http://localhost:8080/delete-news`,{
      method: 'POST',
      body: JSON.stringify({id}),
      headers: {'content-type': "application/json"}
    }).then(res=>res.text()).then(res=>console.log(res))
  }

  return (
    <div className='news-details'>
      <div className='news-full-container'>
        <span className='news-full-title'> {news.title}</span>
        <span className='news-full-date'>{news.date}</span>
        <img className='news-full-image' src={news.image} alt='News Image'/>
        <span className='news-content'>{news.description}</span>
        {is_admin && <button onClick={deleteNews}>Удалить новость</button>}
      </div>
    </div>
  );
};

export default NewsDetails;

