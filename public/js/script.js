const vehicleDatas = {
  "Maruti Suzuki Alto": { speed: 140, fuelEfficiency: 22.05, tankCapacity: 35, maxRange: 771.75 },
  "Hyundai i20": { speed: 180, fuelEfficiency: 20.35, tankCapacity: 37, maxRange: 753.05 },
  "Tata Nexon": { speed: 180, fuelEfficiency: 17.57, tankCapacity: 44, maxRange: 772.68 },
  "Honda City": { speed: 180, fuelEfficiency: 17.8, tankCapacity: 40, maxRange: 712.00 },
  "Mahindra Thar": { speed: 155, fuelEfficiency: 15.2, tankCapacity: 57, maxRange: 866.40 },
  "Toyota Innova Crysta": { speed: 179, fuelEfficiency: 11.25, tankCapacity: 55, maxRange: 618.75 },
  "Kia Seltos": { speed: 170, fuelEfficiency: 16.8, tankCapacity: 50, maxRange: 840.00 },
  "Renault Kwid": { speed: 150, fuelEfficiency: 22.3, tankCapacity: 28, maxRange: 624.40 },
  "Ford EcoSport": { speed: 182, fuelEfficiency: 15.9, tankCapacity: 52, maxRange: 826.80 },
  "Tata Tiago": { speed: 150, fuelEfficiency: 23.84, tankCapacity: 35, maxRange: 834.40 }
};

document.getElementById('calcBtn').addEventListener('click', () => {
  // getting input
  const selectedVehicle = document.getElementById('vehicle');
  const travelDistance = document.getElementById('totalDistance');
  const vehicle = selectedVehicle.value;
  const distance = parseFloat(travelDistance.value);

  // checking error
  const errorMessage = document.getElementById('errorMessage');
  const result = document.getElementById('result');
  const comparison = document.getElementById('comparison');
  errorMessage.innerHTML = '';
  result.innerHTML = '';
  comparison.innerHTML = '';

  if(vehicle === 'select') {
    errorMessage.innerHTML = '* Please select a vehicle!';
    return;
  }
  if(isNaN(distance) || distance <= 0) {
    errorMessage.innerHTML = '* Please enter a valid distance!';
    return;
  }
  // calculations
  const { speed, fuelEfficiency, tankCapacity, maxRange } = vehicleDatas[vehicle];
  const travelTime = distance / speed;
  const fuelConsumption = distance / fuelEfficiency;

  result.innerHTML = `
    <p>Travel Time:<b>${travelTime.toFixed(2)} hours</b></p>
    <p>Fuel Consumption:<b> ${fuelConsumption.toFixed(2)} liters</b></p>
    ${distance > maxRange ? '<p style="color:red;"> <b>* Out of range  ^_^</b></p>' : ''}
    <br><hr class="col-11">
  `;

  comparison.innerHTML = '<h3>Comparing with other vehicles:</h3> <br>';
  for (let data in vehicleDatas) {
    if (data !== vehicle) {
      const { speed: calcSpeed, fuelEfficiency: calcFuelEfficiency, maxRange: calcMaxRange } = vehicleDatas[data];
      const calcTravelTime = distance / calcSpeed;
      const calcFuelConsumption = distance / calcFuelEfficiency;
      comparison.innerHTML += `
        <p>Vehicle: <b>${data}</b></p>
        <p>Travel Time: ${calcTravelTime.toFixed(2)} hours</p>
        <p>Fuel Consumption: ${calcFuelConsumption.toFixed(2)} liters</p>
        ${distance > calcMaxRange ? '<p style="color:red;"><b> * Out of range </b></p>' : ''}
        <br>
      `;
    }
  }
});