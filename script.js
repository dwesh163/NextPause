let pauseList = JSON.parse(localStorage.getItem("nextPause"))

function getNewTime(pauseList, dateActuelle){
    
    newDateActuelle = dateActuelle

    for (let time of pauseList) {
        let [hours, minutes] = time.split(":").map(parseFloat);
        let newDateActuelle = new Date(dateActuelle);
        
        newDateActuelle.setHours(hours);
        newDateActuelle.setMinutes(minutes);
    
        console.log("dateActuelle:", dateActuelle);
        console.log("newDateActuelle:", newDateActuelle);
    
     
        if (newDateActuelle > dateActuelle) {
            return time.split(":")
        }
    }
}

function update(){

    var dateActuelle = new Date();   

    newTime = getNewTime(pauseList, dateActuelle)

    hour = newTime[0]
    minute = newTime[1]

    console.log(newTime);

    var heureASoustraire = new Date();
    heureASoustraire.setHours(hour - 1);
    heureASoustraire.setMinutes(minute);
    heureASoustraire.setSeconds(0);

    var resultat = new Date(heureASoustraire - dateActuelle);

    console.log("Résultat: ", resultat.toLocaleTimeString());

    document.getElementById("h1").innerHTML = resultat.toLocaleTimeString()

}

setInterval(() => {
    update()
}, 1000);
