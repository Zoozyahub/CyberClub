import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from './logo2.png';
import login from './login.png';
import './Header.css';

function Header({ isLogIn, setIsLogIn }) {
  const [navbarTransparent, setNavbarTransparent] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const isOpaquePage = ['/disciplines', '/registration', '/tournaments', '/teams', '/profile', '/reg-for-prac', '/auth'];
    const isPageOpaque = isOpaquePage.some((path) => location.pathname.startsWith(path));

    const handleScroll = () => {
      const isNavbarTransparent = window.scrollY < 100 && !isPageOpaque;
      setNavbarTransparent(isNavbarTransparent);
    };

    handleScroll(); // Вызываем функцию непосредственно перед добавлением обработчика события

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const navClick = () => {
    window.scrollTo({ top: 0 });
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo'); // Удаляем данные пользователя
    setIsLogIn(false); // Обновляем состояние
  };

  return (
    <header className={navbarTransparent ? 'navbar-transparent' : 'navbar-opaque'}>
      <nav>
        <div className="header-container">
          {navbarTransparent ? (
            <div className="empty-block" />
          ) : (
            <Link className="logo" to="/" onClick={navClick}>
              <img src={logo} alt="Logo" />
            </Link>
          )}
          <ul className="nav-links">
            <li>
              <NavLink
                to="/news#top"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'pending-news'
                    : isActive
                    ? 'active-news'
                    : 'pending-news'
                }
                onClick={navClick}
              >
                НОВОСТИ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/disciplines"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'pending-disciplines'
                    : isActive
                    ? 'active-disciplines'
                    : 'pending-disciplines'
                }
                onClick={navClick}
              >
                ДИСЦИПЛИНЫ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reg-for-prac"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'pending-registration'
                    : isActive
                    ? 'active-registration'
                    : 'pending-registration'
                }
                onClick={navClick}
              >
                ЗАПИСЬ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tournaments"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'pending-tournaments'
                    : isActive
                    ? 'active-tournaments'
                    : 'pending-tournaments'
                }
                onClick={navClick}
              >
                ТУРНИРЫ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/teams"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'pending-teams'
                    : isActive
                    ? 'active-teams'
                    : 'pending-teams'
                }
                onClick={navClick}
              >
                КОМАНДЫ
              </NavLink>
            </li>
            <li>
              <div className="btns_reg_and_profile">
                {!isLogIn ? (
                  <NavLink to={'/auth'}>
                    <img src={login} alt="Profile" />
                  </NavLink>
                ) : (
                  <>
                    <p>{JSON.parse(localStorage.getItem('userInfo')).nickname}</p>
                    <button className="logout-btn" onClick={handleLogout}>
                      Выйти
                    </button>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
