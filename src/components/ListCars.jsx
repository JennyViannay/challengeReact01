import React from "react";
import Car from "./Car";
import axios from "axios";
import './style.css';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class ListCars extends React.Component {
  constructor() {
    super()
    this.state = {
      cars: [],
      carsAvailibility: [],
      bestCarsOnly: false,
      isLoaded: false,
      valueDay: 10,
      valueKm: 50,
    };
  }


  getCars() {
    axios
      .get(`http://localhost:3001/cars.json`)
      .then(response => response.data)
      .then(data => {
        this.setState({ cars: data, isLoaded: true });
      });
  };

  componentDidMount() {
    this.getCars();
  }

  deleteCar(i) {
    this.state.cars.splice(i, 1);
    this.setState({ cars: this.state.cars });
  };

  bestcarswitch(a,b) {
    this.setState({ bestCarsOnly: !this.state.bestCarsOnly });
    const cars = this.state.cars
    const newArray = [];
    for(let i=0; i < cars.length; i++){
      if(cars[i].availability.maxDuration <= a && cars[i].availability.maxDistance <= b){
        console.log(cars[i])
        newArray.push(cars[i])
        
      } 
    }
    this.setState({carsAvailibility : newArray})
    console.log(this.state.carsAvailibility)
  }

  renderData(){
    const allCars = this.state.cars
      .map((car, i) => (
        <Car key={car.id}
          id={car.id}
          brand={car.brand}
          model={car.model}
          pricePerDay={car.pricePerDay}
          pricePerKm={car.pricePerKm}
          index={i}
          delete={() => this.deleteCar(i)}
        />
      ))

    const carsAvailable = this.state.carsAvailibility
    .map((car, i) => (
      <Car key={car.id}
        id={car.id}
        brand={car.brand}
        model={car.model}
        pricePerDay={car.pricePerDay}
        pricePerKm={car.pricePerKm}
        index={i}
        delete={() => this.deleteCar(i)}
      />
    ))

    if(this.state.isLoaded && this.state.bestCarsOnly == false){
      return allCars;
    }
    if(this.state.isLoaded && this.state.bestCarsOnly == true){
      return carsAvailable;
    }
  }

  render() {
    console.log(this.state.carsAvailibility)
    
    return (
      <>
        <div className="carsGlobal">
        
          <InputRange
            maxValue={30}
            minValue={1}
            formatLabel={value => `${value} jours`}
            value={this.state.valueDay}
            onChange={value => this.setState({ valueDay: value })} />

          <InputRange
            maxValue={10000}
            minValue={50}
            step={50}
            formatLabel={value => `${value} km`}
            value={this.state.valueKm}
            onChange={value => this.setState({ valueKm: value })} />
        </div>

        <button 
          className="RatingButton" 
          onClick={() => this.bestcarswitch(this.state.valueDay, this.state.valueKm)}>
            {this.state.bestCarsOnly ? "All cars" : "Best cars Only"}
        </button>

        <div className="carsGlobal">
        {this.renderData()}
        </div>
        
      </>
    );
  }
}

export default ListCars;

