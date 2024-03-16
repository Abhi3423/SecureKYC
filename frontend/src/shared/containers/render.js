import Countdown, { zeroPad } from "react-countdown";
export const renderer = ({ hours, minutes, seconds }) => {
    return (
        <span>
            {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
    );
};