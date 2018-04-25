import moment from 'moment'
import {
  MILLISECONDS_IN_SECOND,
  SECONDS_MINUTE,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
  MAX_DAYS_IN_MONTH,
  MAX_DAYS_YEAR
} from './constants/datetime';

const MILLISECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_MINUTE * MILLISECONDS_IN_SECOND;
const MILLISECONDS_IN_DAY = HOURS_IN_DAY * MILLISECONDS_IN_HOUR;
const MAX_MILLISECONDS_IN_MONTH = MAX_DAYS_IN_MONTH * MILLISECONDS_IN_DAY;
const MAX_MILLISECONDS_IN_YEAR = MAX_DAYS_YEAR * MAX_MILLISECONDS_IN_MONTH;

export const getDisplayDateTime = ({ timestamp, prefix, suffix }) => {
  const currentTimeStamp = moment().unix() * 1000;
  const timestampDiff = currentTimeStamp - timestamp;

  if (timestampDiff < MILLISECONDS_IN_HOUR) {
    return `${prefix}few moments${suffix}`;
  }
  if (timestampDiff < MILLISECONDS_IN_DAY) {
    const hours = Math.round(timestampDiff / MILLISECONDS_IN_HOUR);
    const hourSuffix = hours > 1 ? 's' : '';
    return `${prefix}${hours} hour${hourSuffix}${suffix}`;
  }
  if (timestampDiff < MAX_MILLISECONDS_IN_MONTH) {
    const days = Math.round(timestampDiff / MILLISECONDS_IN_DAY);
    const daysSuffix = days > 1 ? 's' : '';
    return `${prefix}${days} day${daysSuffix}${suffix}`;
  }
  if (timestampDiff < MAX_MILLISECONDS_IN_YEAR) {
    const months = Math.round(timestampDiff / MAX_MILLISECONDS_IN_MONTH);
    const monthsSuffix = months > 1 ? 's' : '';
    return `${prefix}${months} month{monthsSuffix}${suffix}`;
  }
  const years = Math.round(timestampDiff / MAX_MILLISECONDS_IN_YEAR);
  const yearsSuffix = years > 1 ? 's' : '';
  return `${prefix}${years} year${yearsSuffix}${suffix}`;
}
