export function formatTime(ms: number) {
  const total_seconds = ms / 1000;
  const minutes = Math.floor(total_seconds / 60);
  const seconds = Math.floor(total_seconds % 60);
  const centis = Math.floor((ms % 1000) / 10);

  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${centis.toString().padStart(2, "0")}`;
  }

  return (
    `${seconds}.${centis.toString().padStart(2, "0")}`
  );
}