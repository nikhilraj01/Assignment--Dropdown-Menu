import React from "react";
var hospitalList = [];
var matchingHosp = [];
var matchingHosp2 = [];
var matchingCities = [];
class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specialities: [],
      cities: [],
      hospitals: [],
      selectedSpeciality: "--Choose Speciality--",
      selectedCity: "--Choose City--",
    };
    this.changeSpeciality = this.changeSpeciality.bind(this);
    this.changeCity = this.changeCity.bind(this);
  }

  componentDidMount() {
    var allHospitals = [
      {
        healthGroups: "MMM",
        hospitals: [
          {
            name: "MMM1",
            city: "Chennai",
            speciality: ["Diabetes", "Fertility", "Cardio"],
          },
          {
            name: "MMM2",
            city: "Mumbai",
            speciality: ["Ortho", "Spine", "Diabetes", "Fertility", "Cardio"],
          },
          {
            name: "MMM3",
            city: "Pune",
            speciality: ["Ortho", "Spine", "Diabetes", "Fertility", "Cardio"],
          },
        ],
      },
      {
        healthGroups: "Apollo",
        hospitals: [
          {
            name: "Apollo1",
            city: "Chennai",
            speciality: ["Diabetes", "Fertility", "Cardio"],
          },
          {
            name: "Apollo2",
            city: "Hydrebad",
            speciality: ["Ortho", "Spine", "Diabetes", "Fertility", "Cardio"],
          },
          {
            name: "Apollo3",
            city: "Cochin",
            speciality: ["Ortho", "Spine", "Diabetes", "Fertility", "Cardio"],
          },
        ],
      },
      {
        healthGroups: "Christ",
        hospitals: [
          {
            name: "Christ1",
            city: "Chennai",
            speciality: ["Diabetes", "Fertility", "Cardio"],
          },
          {
            name: "Christ",
            city: "Hydrebad",
            speciality: ["Ortho", "Spine", "Diabetes", "Fertility", "Cardio"],
          },
          {
            name: "Christ3",
            city: "Delhi",
            speciality: ["Ortho", "Spine", "Diabetes", "Fertility", "Cardio"],
          },
        ],
      },
    ];

    //Array containing all the hospitals for simpler iteration
    for (var i = 0; i < allHospitals.length; i++) {
      hospitalList = hospitalList.concat(allHospitals[i].hospitals);
    }
    this.setState({ hospitals: hospitalList });
  }

  changeSpeciality(event) {
    this.setState({ selectedSpeciality: event.target.value });
    this.setState({ selectedCity: "--Choose from below--" });
    matchingHosp = [];
    matchingCities = [];

    //Filtering hospitals with selected speciality, and getting cities for the hospitals
    for (var i = 0; i < hospitalList.length; i++) {
      if (hospitalList[i].speciality.includes(this.state.selectedSpeciality)) {
        matchingHosp = matchingHosp.concat(hospitalList[i]);
        matchingCities.push(hospitalList[i].city);
      }
    }

    //Removing duplicate values in matching cities
    matchingCities = new Set(matchingCities);
    matchingCities = [...matchingCities];
    this.setState({ hospitals: matchingHosp });

    //for checking purpose-
    console.log(this.state.selectedSpeciality);
    console.log(matchingCities);
    console.log(matchingHosp);
    //console.log(this.state.hospitals);
  }

  changeCity(event) {
    this.setState({ selectedCity: event.target.value });
    matchingHosp2 = [];

    //Filtering hospitals based on selected city
    for (var i = 0; i < matchingHosp.length; i++) {
      if (matchingHosp[i].city === this.state.selectedCity) {
        matchingHosp2.push(matchingHosp[i]);
      }
    }
    this.setState({ hospitals: matchingHosp2 });

    //for checking purpose-
    console.log(matchingHosp2);
  }

  render() {
    return (
      <div className="dropdown-container">
        <h1>Select your options:</h1>
        <label>Choose Speciality:</label>
        <select
          name="speciality"
          id="speciality"
          value={this.state.selectedSpeciality}
          onChange={this.changeSpeciality}
        >
          <option>--Choose from below--</option>
          <option value="Ortho">Ortho</option>
          <option value="Spine">Spine</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Fertility">Fertility</option>
          <option value="Cardio">Cardio</option>
        </select>
        <br />
        <br />
        <label>Choose City:</label>
        <select
          name="city"
          value={this.state.selectedCity}
          onChange={this.changeCity}
        >
          <option>--Choose from below--</option>
          {matchingCities.map((e, key) => {
            return <option key={key}>{e}</option>;
          })}
        </select>
        <br />
        <br />
        <label>Choose Hospital:</label>
        <select placeholder="Hospital">
          <option>--Choose hospital--</option>
          {matchingHosp2.map((e, key) => {
            return <option key={key}>{e.name + ", " + e.city}</option>;
          })}
        </select>

        <br />
      </div>
    );
  }
}

export default Dropdown;
