// src/utils/formatTime.js
import { formatDistanceToNow } from 'date-fns';

export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true }); // "5 months ago"
};