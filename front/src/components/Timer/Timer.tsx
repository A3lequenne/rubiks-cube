import { useTimer } from "../../hooks/useTimer";

export default function Timer() {
  const { time, status } = useTimer();

  return (
    <div>
      <div>
        { time }
      </div>
      <div>
        { status }
      </div>
    </div>
  );
}