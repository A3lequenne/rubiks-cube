export function formatTime(ms: number) {
  const seconds = ms / 1000;

  return (seconds.toFixed(2));
}