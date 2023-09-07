export function formatDurationHMS(start: Date, end: Date): string {
  const diff = Math.abs(start.getTime() - end.getTime());
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  return `${hours}:${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;
}

export function formatDateYMDHM(date: Date): string {
  const dateString = formatDateYMD(date);
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${dateString} ${hour}:${minute}`;
}

export function formatDateYMD(date: Date, relative: boolean = false): string {
  // Extract date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  if (relative) {
    // Relative mode returns a string like "Today (12:34)" or "Yesterday"
    const today = new Date();
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      return `Today (${hour}:${minute})`;
    } else if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate() - 1
    ) {
      return "Yesterday";
    }
  }

  return `${year}/${month}/${day}`;
}
