import React from "react";
import { useState ,useEffect} from "react";
import { FaPlayCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { PiFlagPennantFill } from "react-icons/pi";
import { FaPauseCircle } from "react-icons/fa";
const Stopwatch=()=>{
    const [seconds,setseconds] =  useState(0);
    const [minutes,setminutes] = useState(0);
    const [hours,sethours] = useState(0);
    const [miliseconds,setmiliseconds] = useState(0);
    const [laps,setlaps] = useState([]);
    const [isrunning,setisrunning] = useState(false);


    const format=(num)=>{
        if(num < 10){
            return "0" + num;
        }
        else{
            return num.toString();
        }
    };


    useEffect(()=>{
        let intv;
        if(isrunning){
            intv = setInterval(() => {
                setmiliseconds((miliseconds)=>{
                    if(miliseconds >= 99){
                        setseconds((seconds)=>{
                            if(seconds >= 59){
                                setminutes((minutes)=>{
                                    if(minutes >= 59){
                                        sethours((prevhour)=>prevhour+1);
                                        return 0;
                                    }
                                    else{
                                        return minutes + 1;
                                    }
                                });
                            }
                            else{
                                return seconds + 1;
                            }
                        });
                        return 0;
                    }
                    else{
                        return miliseconds + 1;
                    }
                })
            }, 10);
        }
        return ()=> clearInterval(intv);
    },[isrunning]);

    const handelst=()=>{
        setisrunning(true);
    };

    const handlepause =()=>{
        setisrunning(false);
    };

    const handellap =()=>{
        const laptime =
        format(hours) +
        ":" + 
        format(minutes) +
        ":" + 
        format(seconds) +
        ":" +
        format(miliseconds);

        setlaps((prevlap)=>[...prevlap,laptime]);
    }

    const handelreset=()=>{
        setisrunning(false);
        sethours(0);
        setseconds(0);
        setmiliseconds(0);
        setminutes(0);
        setlaps([]);
    };
    return(
        <div className="timerbox">
        {/* for timer */}
        <div className="timer">
          Timer
        </div>
        {/* for lap time */}
        <div className="bottom">

        <div className="lap">
        <button> <PiFlagPennantFill/></button>
        </div>
        {/* for starting the time */}
        <div className="start">
         <button><FaPlayCircle/></button> 
        </div>
        {/* for pause */}
        <button className="pause"><FaPauseCircle/></button>

        {/* for reset */}
        <div className="reset">
          <button><GrPowerReset/></button>
        </div>
        </div>
      </div>
    )
}






export default Stopwatch;