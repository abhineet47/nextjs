import React, {useEffect, useState} from 'react';








const TimerComp = (props) => {

    const [timer, setTimer]=useState(59);



    useEffect(() => {
        let startIntervat = setTimeout(() => {
            let localTimer = Number(timer)
            if(localTimer-1>=10){
              setTimer(localTimer-1)
            }
            else if (timer-1<10 && timer-1>0){
              localTimer = localTimer-1;
              localTimer = `0${localTimer}`
              setTimer(localTimer)
            }
            else{
                clearInterval(startIntervat)
              props.setTimerOver(true);
              
            }
        
            
          }, 1000);
      });





    return (
        <>
      
                 
        <span>{timer}</span>
                 
       </>
       )
}





export default TimerComp;


