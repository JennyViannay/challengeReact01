import React from "react";
import Car from "./Car";
import axios from "axios";
import InputRange from 'react-input-range';
import './style.css';

class ListCars extends React.Component {
  constructor() {
    super()
    this.state = {
      cars: [],
      valueDay: 2,
      valueKm: 100,
      count: 0
    };
  }

  getCars() {
    axios
      .get(`http://localhost:3001/cars.json`)
      .then(response => response.data)
      .then(data => {
        this.setState({
          cars: data,
          count : data.length
        });
      });
  };

  getCarsFilter(duration, distance) {
    axios
      .get(`http://localhost:3001/cars.json?duration=${duration}&distance=${distance}`)
      .then(response => response.data)
      .then(data => {
        this.setState({
          cars: data,
          count: data.length
        });
      });
  };

  componentDidMount() {
    this.getCars();
  }

  render() {
    console.log(this.state)
    const count = this.state.count
    return (
      <div className="Car__container">
        <div className="Car__container_title">
          <h3>RECHERCHER UN VEHICULE</h3>
        </div>
        <div className="CarList__btns">
          <div className="range">
            <InputRange
              maxValue={30}
              minValue={1}
              formatLabel={value => `${value} jour(s) `}
              value={this.state.valueDay}
              onChange={value => this.setState({ valueDay: value })}
              className="range"
            />
          </div>
          <div className="range">
            <InputRange
              maxValue={10000}
              minValue={50}
              step={50}
              formatLabel={value => `${value} km`}
              value={this.state.valueKm}
              onChange={value => this.setState({ valueKm: value })} />
          </div>
          <div>
            <button className="CarList__btn" onClick={() => this.getCarsFilter(this.state.valueDay, this.state.valueKm)}>Search cars</button>
          </div>
          <hr/>
          <div className="Car_result">
            {count} résultat(s) trouvé(s)
          </div>
        </div>

        <div className="CarList">
          {
            this.state.cars.map((car, i) => (
              <Car
                key={i}
                brand={car.brand}
                model={car.model}
                image={car.picturePath}
                pricePerDay={car.pricePerDay}
                pricePerKm={car.pricePerKm}
                selectedKm={this.state.valueKm}
                selectedDay={this.state.valueDay}
              />
              ))
          }
        </div>
      </div>

    );
  }
}

export default ListCars;

