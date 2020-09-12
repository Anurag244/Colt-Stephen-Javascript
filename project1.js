class Timer {
    constructor(durationInput,StartButton,PauseButton,callbacks)
    {
        this.durationInput = durationInput;
        this.StartButton = StartButton;
        this.PauseButton = PauseButton;

        if(callbacks)
        {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.StartButton.addEventListener('click',this.start);
        this.PauseButton.addEventListener('click',this.pause);
    }
    
    start = () => {
        if(this.onStart)
        {
           this.onStart(); 
        }
        this.tick();
        this.timer = setInterval(this.tick,1000);
    };      
     
    pause = () =>
    {
        clearInterval(this.timer);
    };

    tick = () => {
      //  console.log('tick');
      const timeRemaining = parseFloat(this.durationInput.value);

      if(this.timeRemaining <=0)
      {
          this.pause();
      }
      else
      {
        this.durationInput.value = timeRemaining - 1;
        if(this.onTick) 
        {
            this.onTick();
        }
      }
      
    };

    get timeRemaining() 
    {
        return parseFloat(this.durationInput.value);
  
    }

    set timeRemaining(time)
    {
        this.durationInput.value= time;
    }


    start() {
       // console.log('Time to start the Timer');
       //console.log(this);
       this.importantMethodToCall();
    }
     importantMethodToCall() {
         console.log('important thing was done!!!')
     }
}

const durationInput = document.querySelector('#duration');
const StartButton = document.querySelector('#start');
const PauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput,StartButton,PauseButton,{
    onStart() 
    {
    console.log('Timer Started');
    },
    onTick()
    {
    console.log('Timer just Ticked down');
    },

    onComplete()
    {
    console.log('Timer is Completed');
    }
    
  });




//both this r same
const colors = {
printColor() {
console.log(this);
const printThis = () => {

    console.log(this);
}
printThis();
}
}

colors.printColor();


// Bind(),Call() and Apply()

  //inside an arrow function this is going to be a colors object.if we do not apply call,bind and apply.
   const printThis = function() {
    console.log(this);
  
}

printThis.call({color: 'red'});


/*const colors = {
    printColor() {
        console.log(this);
    }
};*/

const randomObject = {
    a:1
};
//3rd case
randomObject.printColor = colors.printColor;

randomObject.printColor();


