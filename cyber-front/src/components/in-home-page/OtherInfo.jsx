import './OtherInfo.css'

function OtherInfo() {
    return (
      <div className="OtherInfo">
        <div className='info-for-school'>
            <div className='other-info-head'>
                <span className='other-info-head-text'>ДЛЯ ШКОЛЬНИКОВ</span>
                <span className='other-info-head-text-blue'>Погрузись в захватывающий мир игр
                                             и соревнований в нашем детском отделении!</span> 
            </div>
            <div className='other-info-about'>
                <span className='other-info-about-head-school'>За один месяц научим:</span>
                <ul>
                <li className='info-other-li'>Разбираться в киберспортивных дисциплинах</li>
                <li className='info-other-li'>актическим навыкам CS:GO</li>
                <li className='info-other-li'>Управлению эмоциями и командному геймингу</li>
                </ul>
                <span className='info-other-li'>В финале - внутригрупповой чемпионат! </span>
            </div>
            <div className='other-info-blue'>
            <span className='other-info-blue-text'>
                Хватить нубить! Этим летом ты станешь топовым игроком!
                ДКШ приглашает тебя в Школу киберспорта!
            </span> 
            </div>
            <button className='other-info-button'>Подробнее</button> 
        </div>
        <hr/>
        <div className='info-for-student'>
            <div className='other-info-head'>
                <span className='other-info-head-text'>ДЛЯ СТУДЕНТОВ</span>
                <span className='other-info-head-text-blue'>Стань частью нашей дружной
                         киберспортивной команды и зарядись энергией соревнований!</span>  
            </div>
            <div className='other-info-about'>
                <span className='other-info-about-student'>Получи доступ к нашему современному
                 кибер полигону с профессиональным оборудованием и комфортной игровой средой! </span>
                <span className='other-info-about-student'>Участвуй в наших организованных
                 турнирах и покажи свои навыки перед другими студентами-игроками! </span>
            </div>
            <div className='other-info-blue'>
            <span className='other-info-blue-text'>
            Прокачивай свои навыки и стратегии с
             помощью индивидуальных тренировок и совместных практик с командой!
            </span>
            </div>
            <button className='other-info-button'>Подробнее</button> 
        </div>
      </div>
    );
  }
  
  export default OtherInfo;