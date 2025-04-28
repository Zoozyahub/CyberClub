import MainInfo from "../components/in-home-page/MainInfo";
import OtherInfo from "../components/in-home-page/OtherInfo";
import NewsBlock from "../components/news/NewsBlock";
import './Home.css'

function Home() {
    return (
      <div className="Home">
        <MainInfo />
        <OtherInfo />
        <NewsBlock />
      </div>
    );
  }
  
  export default Home;