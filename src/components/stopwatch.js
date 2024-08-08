import React from "react";
import { useState ,useEffect} from "react";
import { FaPlayCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { PiFlagPennantFill } from "react-icons/pi";
import { FaPauseCircle } from "react-icons/fa";
import Lap from "./laps.js";
const Stopwatch=()=>{
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [miliSeconds, setMiliSeconds] = useState(0);
    const [laps, setLaps] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const formatWithLeadingZero = (number) => {
        if (number < 10) return "0" + number;
        else return number.toString();
    };

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setMiliSeconds((miliSeconds) => {
                    if (miliSeconds >= 99) {
                        setSeconds((seconds) => {
                            if (seconds >= 59) {
                                setMinutes((minutes) => {
                                    if (minutes >= 59) {
                                        setHours((prevHours) => prevHours + 1);
                                        return 0;
                                    } else {
                                        return minutes + 1;
                                    }
                                });
                                return 0;
                            } else {
                                return seconds + 1;
                            }
                        });
                        return 0;
                    } else {
                        return miliSeconds + 1;
                    }
                });
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleLap = () => {
        const lapTime =
            formatWithLeadingZero(hours) +
            ":" +
            formatWithLeadingZero(minutes) +
            ":" +
            formatWithLeadingZero(seconds) +
            "." +
            formatWithLeadingZero(miliSeconds);
        setLaps((prevLaps) => [...prevLaps, lapTime]);
    };

    const handleReset = () => {
        setIsRunning(false);
        setMiliSeconds(0);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setLaps([]);
    };
    return(
        <div className="timerbox">
        {/* for timer */}
        <div className="timer">
          {formatWithLeadingZero(hours)} : {formatWithLeadingZero(minutes)} : {" "}
          {formatWithLeadingZero(seconds)} : {formatWithLeadingZero(miliSeconds)}
        </div>


        <div className="buttons">
            <button
                className = "btn"
                onClick={handleStart}
                disabled = {isRunning}
                style={{cursor : isRunning ? "not-allowed" : "pointer"}}
                >
                    <FaPlayCircle/>
            </button>

            <button
            className="btn"
            onClick={handlePause}
            >
                <FaPauseCircle/>
            </button>
            <button
            onClick={handleLap}
            className="btn">
                <PiFlagPennantFill/>
            </button>
            <button
            onClick={handleReset}
            className ="btn"
            >
                <GrPowerReset/>
            </button>
        </div>
        <Lap laps={laps} />
      </div>
    )
}






export default Stopwatch;