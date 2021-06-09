const api = require("axios")
const inquirer = require("inquirer");

require('dotenv').config();

console.log("///////////////////////////////////////////");
console.log("Welcome the Near Earth Object Tracker.");
console.log("Find what asteroids will be close to Earth on a specific date");
console.log("///////////////////////////////////////////");

let inputDate;

inquirer.prompt([
    {
        type: "input",
        name: "date",
        message: "Please enter a date (format: YYYY-MM-DD)"
    }
])
.then(ans => {
    inputDate = ans["date"];

    getNEOs();
})

function getNEOs() {
    const key = process.env.NASA_API_KEY;

    const BASE_URL = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" 
    + inputDate + "&end_date=" + inputDate + "&api_key=" + key;

    api.get(BASE_URL).then(res => {
        let NEO = res.data.near_earth_objects[inputDate];

        for(let i = 0; i < NEO.length; i++) {
            let maxSize = NEO[i].estimated_diameter.miles.estimated_diameter_max
            let closestApproach = NEO[i].close_approach_data[0].miss_distance.miles;
            let isThreat = NEO[i].is_potentially_hazardous_asteroid;

            console.log("///////////////////////////////////////////");
            console.log("Name: " + NEO[i].name);
            console.log("Estimated Maximum Size (miles): " + maxSize);
            console.log("Closest Approach (miles): " + closestApproach);
            console.log("Threat to Earth? " + isThreat + "\n");
            
        }
    })
}