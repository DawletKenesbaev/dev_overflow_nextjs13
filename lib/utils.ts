import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeStap = (createdAt: Date): string => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  }
};

export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString(); // No extension needed for numbers less than 1000
  } else if (num >= 1000 && num < 1000000) {
    // Convert to thousands with 'k' extension
    return (num / 1000).toFixed(1) + 'k';
  } else if (num >= 1000000) {
    // Convert to millions with 'm' extension
    return (num / 1000000).toFixed(1) + 'm';
  } else {
    return num.toString(); // Default to string representation if not within range
  }
};
