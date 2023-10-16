let milisec = 0;
let sec = 0;
let mins = 0;
let StartnStop = false;
let TheInterval;
let Seconds;
let Hours = 0;
let LapCounter = 0;


let Reset = false;
let Lap = true;

const FirstButton = document.querySelector('.Start');

document.querySelector('.Hours').innerHTML = ``;
document.querySelector('.forHour').innerHTML = ``;

function ResetAll(){
    clearInterval(TheInterval);
    clearInterval(Seconds);

    mins = 0;
    sec = 0;
    milisec = 0;
    Hours = 0;

    let SecTwoDigits = ("0" + sec).slice(-2);

    document.querySelector('.Sec').innerHTML = `${SecTwoDigits}`;

    let MinsTwoDigits = ("0" + mins).slice(-2);
        
    document.querySelector('.Mins').innerHTML = `${MinsTwoDigits}`;

    let formattedNumber = ("0" + milisec).slice(-2);
        
    document.querySelector('.Msec').innerHTML = `${formattedNumber}`;

    document.querySelector('.Hours').innerHTML = ``;
    document.querySelector('.forHour').innerHTML = ``;

    document.querySelector('.Start').innerHTML = 'Start';

    document.querySelector('.Lap').innerHTML = 'Lap';
}


function Time(){
    if(!StartnStop){
        TheInterval = setInterval(function Count(){
            milisec++;
            let formattedNumber = ("0" + milisec).slice(-2);
        
            document.querySelector('.Msec').innerHTML = `${formattedNumber}`;
        
            if(milisec === 60){
                milisec = 0;
                
                let formattedNumber = ("0" + milisec).slice(-2);
        
                document.querySelector('.Msec').innerHTML = `${formattedNumber}`;
        
            }
            
            localStorage.setItem('milisec', JSON.stringify(milisec));

        }, 17.572);


        Seconds = setInterval(function TheSec(){
            
            sec++

            let SecTwoDigits = ("0" + sec).slice(-2);
        
            document.querySelector('.Sec').innerHTML = `${SecTwoDigits}`;
            



            if(sec === 60){
                sec = 0;

                let SecTwoDigits = ("0" + sec).slice(-2);
        
                document.querySelector('.Sec').innerHTML = `${SecTwoDigits}`;
                

                mins++
                
                    let MinsTwoDigits = ("0" + mins).slice(-2);
        
                    document.querySelector('.Mins').innerHTML = `${MinsTwoDigits}`;

                    if(mins === 60){
                        mins = 0;

                        let MinsTwoDigits = ("0" + mins).slice(-2);
        
                        document.querySelector('.Mins').innerHTML = `${MinsTwoDigits}`;

                        Hours++

                        let HoursTwoDigits = ("0" + Hours).slice(-2);

                        document.querySelector('.Hours').innerHTML = `${HoursTwoDigits}<style>.Hours{margin-left: -36.7px}</style>`;

                        document.querySelector('.forHour').innerHTML = `:`;
                        

                    }
                    
            }

            

            setLap();
            
        }, 1000);

        
        LapCounter = 1;

        localStorage.setItem('LapCounter', JSON.stringify(LapCounter));

        document.querySelector('.Start').innerHTML = '<style>.Start{background-color: maroon}</style>Stop'
        document.querySelector('.Lap').innerHTML = 'Lap';
        Lap = false;
        Reset = true;

        StartnStop = true;
    }else{
        // This one is Stop Button:

        clearInterval(TheInterval);
        clearInterval(Seconds);

        document.querySelector('.Start').innerHTML = '<style>.Start{background-color: #2E145D}</style>Resume';
        
        document.querySelector('.Lap').innerHTML = 'Reset';
        Reset = false;

        StartnStop = false;
    }

    
}

    document.querySelector('.Start').addEventListener('click', () => 
    {
        Time();
    });

document.querySelector('.Lap').addEventListener('click', () => {
    if(!Reset){
        ResetAll();
        document.querySelector('.LapRecorded').innerHTML = "";
        document.querySelector('.Specification').innerHTML = "";
        aList = [];
        Reset = true;
        LapCounter = 0;
        Lap = true;
    }else if (!Lap){
        getLap();

        LapCounter++;

        localStorage.setItem('LapCounter', JSON.stringify(LapCounter));


    }
})

document.body.addEventListener('keydown', (event) => {
    if(event.code === 'Space'){
        Time();
        console.log('Space Bar is Pressed');
    }
})

let LapTime = {
    wins: 0,
    lose: 0
};


function Show(){
    let PrintThis = ``;

    aList.forEach(function(ArrObj){
        const {Hours, mins, sec, milisec, LapCounter} = ArrObj;

        let MilisecTwoDigits = ("0" + milisec).slice(-2);
        let SecTwoDigits = ("0" + sec).slice(-2);
        let MinsTwoDigits = ("0" + mins).slice(-2);
        let HoursTwoDigits = ("0" + Hours).slice(-2);
        
        display = `
            <div class = "TheLaps">
                <div>
                    ${LapCounter}
                </div>

                <div>
                    ${HoursTwoDigits}:${MinsTwoDigits}:${SecTwoDigits}.${MilisecTwoDigits} 
                </div>
            </div>
        `;

        

        PrintThis += display;
        
    })

    document.querySelector('.Specification').innerHTML = `Lap      Overall time`

    document.querySelector('.LapRecorded').innerHTML = PrintThis;

}

let aList = []

let abcde = 0;

function setLap(){
    localStorage.setItem('sec', JSON.stringify(sec));
    localStorage.setItem('mins', JSON.stringify(mins));
    localStorage.setItem('Hours', JSON.stringify(Hours));
};

function getLap(){
    let Getthesec = JSON.parse(localStorage.getItem('sec'));

    let GettheMins = JSON.parse(localStorage.getItem('mins'));
    
    let GettheHours = JSON.parse(localStorage.getItem('Hours'));

    let GettheMSec = JSON.parse(localStorage.getItem('milisec'));

    let GetLapCounter = JSON.parse(localStorage.getItem('LapCounter'));

    aList.push({
        Hours: GettheHours,
        mins: GettheMins,
        sec: Getthesec,
        milisec: GettheMSec,
        LapCounter: GetLapCounter
    });

    Show();
};