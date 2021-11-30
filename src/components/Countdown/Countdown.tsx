import { dateHelpers } from '../../helpers/dateHelpers';
import React, { useEffect, useState } from 'react';

type CountdownProps = {
    prefix?: string;
    date: string;
    onEnd?: Function;
};

export const Countdown = (props: CountdownProps) => {
    const { date: dateFromProps, prefix = '', onEnd } = props;
    const date = new Date(dateFromProps);
    const { days = 0, hours = 0, minutes = 0, seconds = 60 } = dateHelpers.timeLeft(date);
    const [time, setTime] = useState([days, hours, minutes, seconds]);
    const [dys, hrs, mins, secs] = time;

    const reset = () =>
        setTime([
            parseInt(days.toString(), 10),
            parseInt(hours.toString(), 10),
            parseInt(minutes.toString(), 10),
            parseInt(seconds.toString(), 10)
        ]);

    const tick = () => {
        if (dys === 0 && hrs === 0 && mins === 0 && secs === 0) {
            reset();
        } else if (hrs === 0 && mins === 0 && secs === 0) {
            setTime([dys - 1, 23, 59, 59]);
        } else if (mins === 0 && secs === 0) {
            setTime([dys, hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([dys, hrs, mins - 1, 59]);
        } else {
            setTime([dys, hrs, mins, secs - 1]);
        }
    };

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);

        return () => clearInterval(timerId);
    });

    if (dys < 0 || hrs < 0 || mins < 0 || secs < 0 || (!dys && !hrs && !mins && !secs)) {
        if (typeof onEnd === 'function') {
            onEnd();
        }

        return null;
    }

    const timeString = `${dys ? `${dys.toString().padStart(2, '0')}d` : ''}${
        dys || hrs ? `${dys ? ' · ' : ''}${hrs.toString().padStart(2, '0')}h` : ''
    }${dys || hrs || mins ? `${dys || hrs ? ' · ' : ''}${mins.toString().padStart(2, '0')}m` : ''}${
        dys || hrs || mins || secs ? `${dys || hrs ? ' · ' : ''}${secs.toString().padStart(2, '0')}s` : ''
    }`;

    return <>{`${prefix ? `${prefix} ` : ''}${timeString}`}</>;
};
