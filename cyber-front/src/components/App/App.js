import './App.css';
import { Routes, Route } from 'react-router-dom';
import Tournaments from '../Tournaments/Tournaments';
import TournamentReg from '../TournamentReg/TournamentReg';
import Registration from '../Registration/Registration';
import Auth from '../Registration/Auth';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useEffect, useState } from 'react';
import RegForPrac from '../RegForPrac/RegForPrac';
import Home from '../../pages/Home'
import Anchor from '../../components/anchor/Anchor'
import Teams from '../../pages/Teams'
import News from '../../pages/News'
import Admin from '../Admin/Admin';
import FormNews from '../Admin/FormNews'
import FormTournament from '../Admin/FormTournament'
import NotFound from '../NotFound/NotFound';
import NewsDetails from '../../components/news-details/NewsDetails'
import Disciplines from '../../pages/disciplines';

function App() {
  const [isLogIn, setIsLogIn] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setIsLogIn(true);
      setNickname(userInfo.nickname); // Устанавливаем никнейм
    }
  }, []);

  return (
    <div className='App'>
      <Header isLogIn={isLogIn} setIsLogIn={setIsLogIn} nickname={nickname} />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/tournaments'} element={<Tournaments />} />
        <Route path={'/disciplines'} element={<Disciplines img='../../img/bg.png' />} />
        <Route path={'/tournament-reg/:id'} element={<TournamentReg />} />
        <Route
          path={'/auth'}
          element={<Auth isLogIn={isLogIn} setIsLogIn={setIsLogIn} setNickname={setNickname} />}
        />
        <Route path={'/registration'} element={<Registration />} />
        <Route path={'/reg-for-prac'} element={<RegForPrac />} />
        <Route path={'/teams'} element={<Teams />} />
        <Route path={'/news'} element={<News />} />
        <Route path={'/news/:id'} element={<NewsDetails />} />
        <Route path={'/admin'} element={<Admin />} />
        <Route path={'/add-news'} element={<FormNews />} />
        <Route path={'/add-tournament'} element={<FormTournament />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
      <Anchor />
      <Footer />
    </div>
  );
}

export default App;

