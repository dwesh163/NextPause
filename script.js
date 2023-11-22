let choice = JSON.parse(localStorage.getItem('nextPause'));

function getNewTime(pauseList, dateActuelle) {
	newDateActuelle = dateActuelle;

	for (let time of pauseList) {
		let [hours, minutes] = time.split(':').map(parseFloat);
		let newDateActuelle = new Date(dateActuelle);

		newDateActuelle.setHours(hours);
		newDateActuelle.setMinutes(minutes);

		if (newDateActuelle > dateActuelle) {
			return time.split(':');
		}
	}
}

function update() {
	var dateActuelle = new Date();

	pauseList = JSON.parse(localStorage.getItem('NextPauseData'))[localStorage.getItem('NextPauseChoice')];

	newTime = getNewTime(pauseList, dateActuelle);

	if (newTime == undefined) {
		document.getElementById('h1').innerHTML = '...';
		return;
	}

	hour = newTime[0];
	minute = newTime[1];

	var heureASoustraire = new Date();
	heureASoustraire.setHours(hour - 1);
	heureASoustraire.setMinutes(minute);
	heureASoustraire.setSeconds(0);

	var resultat = new Date(heureASoustraire - dateActuelle);

	document.getElementById('h1').innerHTML = resultat.toLocaleTimeString();
}

async function fetchData() {
	const response = await fetch('data.json');
	const data = await response.json();
	localStorage.setItem('NextPauseData', JSON.stringify(data));
	return data;
}

async function setOption() {
	let data = await fetchData();
	let choice = '';

	for (let school in data) {
		var option = document.createElement('option');
		option.text = school;
		option.value = school;
		var select = document.getElementById('selectBox');
		if (localStorage.getItem('NextPauseChoice') && localStorage.getItem('NextPauseChoice') == school) {
			option.selected = true;
		}
		select.appendChild(option);

		if (choice == '') {
			choice = school;
		}
	}

	if (!localStorage.getItem('NextPauseChoice')) {
		localStorage.setItem('NextPauseChoice', choice);
	}

	update();
}

setOption();

$(document).ready(function () {
	$('#selectBox').change(async function () {
		localStorage.setItem('NextPauseChoice', $(this).find('option:selected').attr('value'));
	});
});

setInterval(() => {
	update();
}, 1000);
