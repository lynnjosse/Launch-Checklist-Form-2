
window.addEventListener("load", () => {
    
    let button = document.querySelector("button");
    let pilotName = document.querySelector("input[name=pilotName]");
    let copilotName= document.querySelector("input[name=copilotName]"); 
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");
    
    let pilotStatus = document.querySelector("#pilotStatus");
    let copilotStatus = document.querySelector("#copilotStatus");
    let fuelStatus = document.querySelector("#fuelStatus");
    let cargoStatus = document.querySelector("#cargoStatus");
    
    let faultyItems = document.querySelector("#faultyItems")
    let launchStatus = document.querySelector("#launchStatus");
    
    let missionTartget = document.querySelector("#missionTarget");
    
    //console.log(button.value, pilotName.value, copilotName.value, fuelLevel.value, cargoMass.value)
    
    //fetch destination info
    fetch("https://handlers.education.launchcode.org/static/planets.json").then((response) => {
        response.json().then((json_obj) => {
            //get random destination
            let randomVar = Math.floor(Math.random()*json_obj.length);
            destination_obj = json_obj[randomVar];
            
            missionTarget.innerHTML =  `<h2>Mission Destination</h2>
                                        <ol>
                                            <li>Name: ${destination_obj.name}</li>
                                            <li>Diameter: ${destination_obj.diameter}</li>
                                            <li>Star: ${destination_obj.star}</li>
                                            <li>Distance from Earth: ${destination_obj.distance}</li>
                                            <li>Number of Moons: ${destination_obj.moons}</li>
                                        </ol>
                                            <img src="${destination_obj.image}">`; 
        })
    })
    
    
    button.addEventListener("click", (event) => {
        event.preventDefault();

        //input valitdation
        if(!pilotName.value | !copilotName.value | !fuelLevel.value | !cargoMass.value) {
            window.alert("Please finish filling out the form.")
        } else if ( !isNaN(pilotName.value) | !isNaN(copilotName.value)){
            //"R2D2" is valid name input, "222" is not 
            window.alert("Names cannot be a number");
        }
        
        // set ready status
        pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch!`;
        copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch!`;
        launchStatus.innerHTML = "Shuttle is ready for launch!";
        launchStatus.style.color = "green";
        faultyItems.style.visibility = "hidden";   
        
        //if fuel is high enough
        if(fuelLevel.value < 10000) {
            fuelStatus.innerHTML = "There is not enough fuel for the journey";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            faultyItems.style.visibility = "visible";   
        } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch!";
        }

        //if cargo is low enoguh 
        if(cargoMass.value > 10000) {
            cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            faultyItems.style.visibility = "visible";   
        } else {
            cargoStatus.innerHTML = "Cargo mass low enough for launch!";
        }             

    })
    
})