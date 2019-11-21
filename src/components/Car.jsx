import React from "react"
import './style.css'

const Car = (props) => {
  
    function getPriceByKm ()  {
      return props.selectedKm * props.pricePerKm
    }
    function getPriceByDay ()  {
      return props.selectedDay * props.pricePerDay
    }

    function getPriceByKmPromo() {
      if(props.selectedKm <= 1 && props.selectedKm <= 4) {
        return props.selectedKm * props.pricePerKm * 0,9;
      }
      if(props.selectedKm <= 5 && props.selectedKm <= 10) {
        return props.selectedKm * props.pricePerKm * 0,9;
      }
      if(props.selectedKm > 10 ) {
        return props.selectedKm * props.pricePerKm * 0,2;
      }
    }

    function getPriceByDayPromo() {
      if(props.selectedDay <= 1 && props.selectedDay <= 4) {
        return props.selectedDay * props.pricePerDay * 0,9;
      }
      if(props.selectedDay <= 5 && props.selectedDay <= 10) {
        return props.selectedDay * props.pricePerDay * 0,7;
      }
      if(props.selectedDay <= 5 && props.selectedDay <= 10) {
        return props.selectedDay * props.pricePerDay * 0,9;
      }
      if(props.selectedDay > 10) {
        return props.selectedDay * props.pricePerDay * 0,2;
      }
    }

    return (
      <div className="Car__card">
        <div className="Car__header">
          <div className="Car__brand">{props.brand}</div>
        </div>
          <img className="Car__img" src={props.image} alt="Car-official"></img>
        <div className="Car__title">{props.model}</div>
        <div className="Car__footer">
          <div className="Car__release">{props.pricePerDay} € / jour </div>
          <div className="Car__release">{props.pricePerKm} € / km </div>
          <hr/>
          Selon vos critères : 
          <div className="Car__release">
            {getPriceByKm()} € <br/>
            Promo : {getPriceByKmPromo()} €
          </div>
          <div className="Car__release">
            {getPriceByDay()} € <br/>
            Promo : {getPriceByDayPromo()} €
          </div>
        </div>
      </div>
    );
  };
  
export default Car;