import { useEffect, useState } from 'react';
import './NewsBlock.css'
import {Link, useNavigate} from 'react-router-dom'

const NewsBlock = () => {

  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/get-six-news',{
    }).then(res=>res.json()).then(res=>setNews(
      res.sort((a, b) => new Date(b.date) - new Date(a.date)
    )))
  },[])

  const truncateTitle = (title) => {
    if (title.length > 50) {
      return title.slice(0, 50) + '...';
    }
    return title;
  };

  const handleNavigateNewsPage = (id) => {
    navigate('/news/'+id)
  }

  return (
    <div className='block-news'>
      <span className='news-text-head'>НОВОСТИ</span>
      <div className="news-container">
        {news.map((item) => (
          <div key={item.id} className="news-item" onClick={() => handleNavigateNewsPage(item.id)}>
            <img src={item.image} alt={item.title} />
            <span className='news-title'>{truncateTitle(item.title)}</span>
            <span className='news-date'>{item.date}</span>
          </div>
        ))}
      </div>
      <Link to='/news#top' className='all-news-button'>ВСЕ НОВОСТИ</Link>
    </div>
  );
};

export default NewsBlock;
