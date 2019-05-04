window.addEventListener('load', () =>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature .degree');
    let locationTimezone = document.querySelector('.location-timezone');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long  = position.coords.longitude;
            lat  = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/2824b9a68068d7405b94bbbf96773253/${lat},${long}`;
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const { temperature , summary , icon  } = data.currently ;
                const  { timezone }   = data;
                let temperatureOK = (temperature-32) * 5/9;
                // Set DOM elements form API
                temperatureDegree.textContent = temperatureOK;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = timezone;
                // Set Icon
                setItem(icon , document.getElementById('icon'));
            })
        });
    }
//    end if 


function setItem(icon, iconID){
    const skycons = new Skycons( { color : "white" })
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}


});