import React from "react";
import Car from "./Car";
import axios from "axios";

class ListCars extends React.Component {
    constructor() {
        super()
        this.state = {
            cars: [],
            carsAvailibility: [],
            bestCarsOnly: false,
            isLoaded: false
          };
      }
  

  getCars ()  {
    axios
      .get(`http://localhost:3001/cars.json`)
      .then(response => response.data)
      .then(data => {
        this.setState({ cars: data , isLoaded: true});
      });
  };

  componentDidMount() {
    this.getCars();
  }

  deleteCar(i) {
    this.state.cars.splice(i, 1);
    this.setState({ cars: this.state.cars });
  };

  bestcarswitch() {
    this.setState({ bestcarsOnly: !this.state.bestcarsOnly });
  }

  getCarWithAvailibility() {
    const availibility = [];
      this.state.cars.map((car, i = 0) => {
          availibility.push(car.availability)
      })
      const array = [];
      return availibility.filter(car=> car.maxDuration <= 30 )
       
  }

  render() {
    console.log(this.getCarWithAvailibility())
    return (
      <>
        {/* <Link className="title" to="/">
          <h1>Home</h1>
        </Link> */}

        <button className="RatingButton" onClick={() => this.bestcarswitch()}>
          {this.state.bestcarsOnly ? "All cars" : "Best cars Only"}
        </button>

        <div className="carsGlobal">
          {this.state.isLoaded ? (
            this.state.cars
              .filter(car => !this.state.bestcarsOnly || car.rating >= 4.5)
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
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </>
    );
  }
}

export default ListCars;

