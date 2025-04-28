import './MainInfo.css'
import FullLogo from './fulllogo.png'
import gamepad from './gamepad.png'

function MainInfo() {
  return (
    <div className="Main-Info">
        <div className='info-about'>
            <span className='info-head-text'>КИБЕРСПОРТИВНЫЙ КЛУБ</span>
            <span className='info-head-text'>В СГТУ! <img className='info-gamepad' alt='info-gamepad' src={gamepad}></img></span>
            <span className='info-about-text'>
            НАШ КЛУБ ОБЪЕДИНЯЕТ БОЛЬШОЕ КОЛИЧЕСТВО СТУДЕНТОВ
            СГТУ И ШКОЛЬНИКОВ, КОТОРЫЕ ЗАИНТЕРЕСОВАНЫ В КИБЕРСПОРТЕ! 
            </span>
            <hr />
            <span className='info-about-text'>
            МЫ СОЗДАЕМ ПЛОЩАДКУ, НА КОТОРОЙ НАЧИНАЮЩИЕ ИГРОКИ И 
            ПОЛУПРОФЕССИОНАЛЬНЫЕ КИБЕРСПОРТА СМОГУТ ПРОЯВИТЬ СЕБЯ! 
            </span>
        </div>
        <div className='info-loog'>
        <img src={FullLogo} alt='fullLogo' className='full-logo'/>
        </div>
        <div className='info-achiv'>
            <ul>
                <li className='info-achiv-text'>БОЛЕЕ 400 УЧАСТНИКОВ</li>
                <li className='info-achiv-text'>ПОЛИГОН НА БАЗЕ УНИВЕСИТЕТА</li>
                <li className='info-achiv-text'>11 ДИСЦИПЛИН</li>
                <li className='info-achiv-text'>РЕГУЛЯРНЫЕ ТУРНИРЫ С ПРИЗАМИ</li>
            </ul>
        </div>
    </div>
  );
}

export default MainInfo;
