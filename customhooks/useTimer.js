import { useEffect, useState } from 'react';

const useTimer = (initialMinutes = 0, initialSeconds = 0) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [finished, setFinished] = useState(false);

    let myInterval;

    useEffect(() => {
        myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setFinished(true);
                    clearInterval(myInterval);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => {
            clearInterval(myInterval);
        };
    }, [seconds]);

    const stop = () => {
        clearInterval(myInterval);
    };

    const restart = () => {
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
        setFinished(false);
    };

    const formatTime = (minutes, seconds) => {
        let min_string = minutes + '';
        let sec_string = seconds + '';
        if (min_string.length < 2) {
            minutes = `0${min_string}`;
        }
        if (sec_string.length < 2) {
            seconds = `0${sec_string}`;
        }
        return [minutes, seconds];
    };

    return [
        ...formatTime(minutes, seconds),
        finished,
        restart
    ];
};

export default useTimer;