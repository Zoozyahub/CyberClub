import { useNavigate } from 'react-router-dom';
import './NewsBlock.css'
import { useEffect, useState } from 'react';

const AllNews = () => {
  
    const [news, setNews] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
      fetch('http://localhost:8080/get-all-news',{
      }).then(res=>res.json()).then(res=>{
        setNews(
          res.sort((a, b) => new Date(b.date) - new Date(a.date))
        )
      });
    },[])

    const truncateTitle = (title) => {
      if (title.length > 50) {
        return title.slice(0, 50) + '...';
      }
      return title;
    };
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(news.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);
  
    const changePage = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleNavigateNewsPage = (id) => {
      navigate('/news/'+id)
    }

    return (
      <div className="pagination">
      <div className='block-news'>
        <span className='news-text-head' id='top'>НОВОСТИ</span>
        <div className="news-container">
          {currentNews.map((item) => (
            <div key={item.id} className="news-item" onClick={() => handleNavigateNewsPage(item.id)}>
                <img src={item.image} alt={item.title} />
                <span className='news-title'>{truncateTitle(item.title)}</span>
                <span className='news-date'>{item.date}</span>
            </div>
          ))}
        </div>
        </div>
        <div className='pages'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => changePage(index + 1)}
              className={currentPage === index + 1 ? 'active-page' : 'non-active-page'}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default AllNews;
  