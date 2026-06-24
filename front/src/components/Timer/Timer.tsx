import { useTimer } from "../../hooks/useTimer";
import { formatTime } from "../../utils/formatTime";

export default function Timer() {
  const { time, status } = useTimer();

  return (
    <div>
      <div>
        { formatTime(time) }
      </div>
      <div>
        { status }
      </div>
    </div>
  );
}