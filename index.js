const workTime = document.getElementById('timeInput'); // Get User Work Time
const breakTime = document.getElementById('breakInput'); //Get User Brake Time
const startTimer = document.getElementById('startButton');
const timerContainer = document.getElementById('timerContainer');

startTimer.addEventListener('click',pomodoroTimer);

function pomodoroTimer(){

    //Error Handling for empty input
    if(!workTime.value || !breakTime.value){
        alert('Please enter a valid time');
        return;
    }

    //Get User Input in Seconds and String to numerical
    let remainingworkTime = parseInt(workTime.value,10) * 60;
    let remainingbreakTime = parseFloat(breakTime.value,10) * 60;

    //Reset variable for when brake finishes
    let resetworkTime = remainingworkTime;

    //Flag for alert to appear once
    let alerted = false;

    //Create Time update Text 
    let remainingTimeText = document.createElement('h2');

    timerContainer.appendChild(remainingTimeText);
    setInterval(function(){

        remainingworkTime--;
        if(remainingworkTime > 0){

            //Transform Seconds -- > Hours,Minutes,Seconds
            let workTimeHours = Math.floor( remainingworkTime / 1000 / 60 % 24);
            let workTimeMinutes = Math.floor(remainingworkTime / 60 % 60);
            let workTimeSeconds = Math.floor(remainingworkTime % 60);
            remainingTimeText.innerHTML = 'Remaining Time: ' +workTimeHours+' Hours ' +workTimeMinutes+ ' Minutes ' +workTimeSeconds+ ' Seconds';
            //console.log('Remaining Time: ',remainingworkTime);
        }else{

            //Alert for Brake
            if(!alerted){
                alert('Time for a break');
                alerted = true;
            }


            let breakTimeHours = Math.floor( remainingbreakTime / 1000 / 60 % 24);
            let breakTimeMinutes = Math.floor(remainingbreakTime / 60 % 60);
            let breakTimeSeconds = Math.floor(remainingbreakTime % 60);
            remainingTimeText.innerHTML = 'Remaining Break Time: ' +breakTimeHours+' Hours ' +breakTimeMinutes+ ' Minutes ' +breakTimeSeconds+ ' Seconds';
            remainingbreakTime--;
            //console.log('Break Time! Remaining Break Time: ',remainingbreakTime);
           
            //If Brake finishes Reset
            if(remainingbreakTime === 0){
                remainingworkTime = resetworkTime;
            } 
           
        }

    },1000)

}
