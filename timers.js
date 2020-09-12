
/*class Timer 
{
    constructor(durationInput,startButton,pauseButton,callbacks)
    {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
 
        if(callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.OnComplete = callbacks.OnComplete;
        }
 
        this.startButton.addEventListener('click',this.start);
        this.pauseButton.addEventListener('click',this.pause);
    }
    
    start = () =>{
       // this.tick();
       // console.log('Timer started')
       if(this.onStart)
       {
           this.onStart();
       }
        this.tick();
        this.interval = setInterval(this.tick,1000);
       // clearInterval(timer);
    };
 
    pause = () => {
        clearInterval(this.interval);
    }; 
 
    tick = () => {
        //console.log('tick');
        //const timeRemaining = parseFloat(this.durationInput.value);
        //this.durationInput.value = timeRemaining - 1;
        if(this.timeRemaining <=0)
        {
          this.pause();
          if(this.OnComplete){
              this.OnComplete();
          } 
        }
 
        else{
        this.timeRemaining = this.timeRemaining - 1;
 
        if(this.OnTick){
            this.onTick();            
        }
    }
};
 
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }
 
    set timeRemaining(time) {
        this.durationInput.value = time;
    }
 
}
     
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
 
const timer = new Timer(durationInput,startButton,pauseButton, {
onStart()
{
console.log('Timer get Started');
},
 
OnTick() 
{
console.log('Timer just Ticked'); 
},
OnComplete()
{
console.log('Timer is completed')
}
});
*/


class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
      this.durationInput = durationInput;
      this.startButton = startButton;
      this.pauseButton = pauseButton;
   
      if (callbacks) {
        this.onStart = callbacks.onStart;
        this.onTick = callbacks.onTick;
        this.onComplete = callbacks.onComplete;
      }
   
      //console.log(this);
      this.startButton.addEventListener("click", this.start);
      this.pauseButton.addEventListener("click", this.pause);
    }
   
   start = () => {
      // this.tick();
   
      if (this.onStart) {
        this.onStart(this.timeRemaining);
      }
      this.tick();
      this.interval = setInterval(this.tick, 50);
      // clearInterval(timer);
    };

    tick = () => {
        if (this.timeRemaining <= 0) {
          this.pause();
          if (this.onComplete) {
            this.onComplete();
          }
        } else {
          this.timeRemaining = this.timeRemaining - 0.05;
     
          if (this.onTick) {
            this.onTick(this.timeRemaining);
          }
        }
      };
   
    pause = () => {
      clearInterval(this.interval);
    };
   
    tick = () => {
      if (this.timeRemaining <= 0) {
        this.pause();
        if (this.onComplete) {
          this.onComplete();
        }
      } else {
        this.timeRemaining = this.timeRemaining - 1;
   
        if (this.onTick) {
          this.onTick();
        }
      }
    };
   
    get timeRemaining() {
      return parseFloat(this.durationInput.value);
    }
   
    set timeRemaining(time) {
      this.durationInput.value = time.toFixed(2);
    }
  }
   
  const durationInput = document.querySelector("#duration");
  const startButton = document.querySelector("#start");
  const pauseButton = document.querySelector("#pause");
  const circle = document.querySelector('circle');

  const perimeter = circle.getAttribute('r') * 2 * Math.PI;
  circle.setAttribute('stroke-dasharray',perimeter);
   
  //let currentoffset = 0;
  let duration;
  const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
      //console.log("Timer get Started");
      duration = totalDuration;
    },
   
    onTick(timeRemaining) {
     // console.log("Timer just Ticked");
     circle.setAttribute('stroke-dashoffset',
     (perimeter * timeRemaining)/duration - perimeter)

     //currentoffset = currentoffset - 50;
    },
    onComplete() {
      console.log("Timer is completed");
    },
  });
  