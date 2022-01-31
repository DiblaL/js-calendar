const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const calendar = document.getElementById('calendar');
const display = document.getElementById('display');
const settimana = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
let monthIndex = 0;

render();

function render() {
    const date = new Date();
    date.setMonth(new Date().getMonth() + monthIndex);

    const month = date.getMonth(); // Gennaio = 0
    const day = date.getDate(); // getDay() => Giovedì
    const year = date.getFullYear();

    // Task: capire che giorno della settimana inizia il mese
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // quanti spazi vanno inseriti prima del box con 1 nel calendario?
    // spazi = paddingDays
    const dateString = firstDayOfMonth.toLocaleDateString('it', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    const giorno = dateString.split(' ')[0]; // sabato
    const paddingDays = settimana.indexOf(giorno); // ad es. 6
    
    const monthText = date.toLocaleDateString('it', {
        month: 'long'
    });
    display.innerText = monthText + " " + year;

    // Creazione calendar
    calendar.innerHTML = "";
    for(let i = 1; i <= daysInMonth + paddingDays; i++) {
        let box = document.createElement('div');
        box.classList.add('day');

        // giorno vuoto o vero?
        if (i <= paddingDays) { // padding
            box.classList.add('padding');
        } else { // giorno effettivo
            /*
            es. padding = 6
            i = 7
            giorno del mese? 
            */
            box.innerText = i - paddingDays;

            if (i - paddingDays == day && monthIndex == 0) {
               box.id = 'currentDay'; 
            }
        }

        calendar.appendChild(box);
    }
}

function handleNext(){
    monthIndex = monthIndex + 1;
    // monthIndex += 1;
    // monthIndex++;
    render();
}
function handleBack(){
    monthIndex = monthIndex - 1;
    // monthIndex -= 1;
    // monthIndex--;
    render();
}

