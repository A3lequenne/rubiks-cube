import { useTimer } from "../../hooks/useTimer";
import { formatTime } from "../../utils/formatTime";

export default function Timer() {
  const { time, status, ready } = useTimer();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className={`
        text-7xl font-mono select-none
        ${ready ? "text-green-500" : ""}
        ${status === "armed" && !ready ? "text-red-500" : ""}
        ${status === "running" ? "text-white" : ""}
        ${status === "idle" ? "text-white" : ""}
      `}>
        { formatTime(time) }
      </div>
      <div>
        { status }
      </div>
    </div>
  );
}