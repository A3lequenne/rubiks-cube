import { useTimer } from "../../hooks/useTimer";
import { formatTime } from "../../utils/formatTime";

export default function Timer() {
  const { time, status } = useTimer();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className={`
        text-7xl font-mono select-none
        ${status === "idle" ? "text-blue-300" : ""}
        ${status === "armed" ? "text-red-500" : ""}
        ${status === "ready" ? "text-green-500" : ""}
        ${status === "running" ? "text-white" : ""}
      `}>
        { formatTime(time) }
        { `\n ${ status } `}
      </div>
      <div>
        { status }
      </div>
    </div>
  );
}