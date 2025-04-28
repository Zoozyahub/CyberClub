import AllNews from "../components/news/AllNews";
import './News.css'

function News() {
    return (
      <div className="News-page">
        <div className="News-page-block">
        <AllNews />
        </div>
      </div>
    );
  }
  
  export default News;