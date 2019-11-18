import React from "react"
import './style.css'

const Car = (props) => {
    return (
      <div className="carCard">
         <h2>{props.brand}</h2>
         <h3>Model : {props.model}</h3>
         <h4>Price Per Day : {props.pricePerDay}</h4>
         <h4>Price Per Km : {props.pricePerKm}</h4>
         <p>id: {props.id}</p>
         <button className="DeleteButton" type="button" onClick={props.delete} >Delete Me!</button>
      </div>
    );
  };
  

export default Car