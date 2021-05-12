import React from 'react';
import SuccessfulRegist from '../image/SuccessfulRegist.svg';
import TryAgainRegist from '../image/TryAgainRegist.svg';

function InfoTooltip(){
    return(
        <div className={'popup popup_opened'} >
        <div className="popup__wrapper">
          <div className="popup__container">
              <img className="popup__register-img" src={SuccessfulRegist} alt="Картинка регистрации"/>
              <h2 className="popup__register-title">Вы успешно зарегистрировались!</h2>
          </div>
          <button className="popup__exit" type="button"/> 
        </div>
      </div>
    )
}

export default InfoTooltip;