export function getReadableDateTime(timestamp: number): string {
  const now = new Date();
  const targetDate = new Date(timestamp * 1000);

  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffTime < 0) {
    return "Now";
  } else if (diffDays <= 0 && now.getDay() === targetDate.getDay()) {
    return "Today, " + formatTime(targetDate);
  } else if (diffDays <= 1 && now.getDay() + 1 === targetDate.getDay()) {
    return "Tomorrow, " + formatTime(targetDate);
  } else if (diffDays < 6 && diffDays > 0) {
    return (
      targetDate.toLocaleDateString(undefined, { weekday: "long" }) +
      ", " +
      formatTime(targetDate)
    );
  }

  if (diffDays > 6) {
    return formatDate(targetDate) + ", " + formatTime(targetDate);
  }

  return targetDate.toLocaleDateString() + ", " + formatTime(targetDate);
}

export function getFormattedDate(timestamp: number): string {
  const date = new Date(timestamp);

  return formatDate(date);
}

export function getFormattedTime(timestamp: number): string {
  const date = new Date(timestamp);

  return formatTime(date);
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}
