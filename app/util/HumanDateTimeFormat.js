/**
 * Human date format utility
 */

const millisecondsPerDay = 24 * 60 * 60 * 1000;

export const getHumanDateTimeString = timestamp => {
  var sixDaysAgo = getSixDaysAgo();
  var yesterday = getYesterday();
  var today = getToday();
  var tomorrow = getTomorrow();
  var twoDaysLater = getTwoDaysLater();
  var sevenDaysLater = getSevenDaysLater();

  var date = new Date(timestamp);
  if (date >= sixDaysAgo && date < yesterday) {
    console.log('6 days ago ~ 2 days ago');
    // If locale omitted, current locale would be used
    return date.toLocaleString(undefined, {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    });
  } else if (date >= yesterday && date < today) {
    console.log('yesterday');
    // If locale omitted, current locale would be used
    return 'Yesterday ' + date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
  } else if (date >= today && date < tomorrow) {
    console.log('today');
    // If locale omitted, current locale would be used
    return date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
  } else if (date >= tomorrow && date < twoDaysLater) { // Probably time was wrong
    console.log('tomorrow');
    // If locale omitted, current locale would be used
    return 'Tomorrow ' + date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
  } else if (date >= twoDaysLater && date < sevenDaysLater) { // Probably time was wrong
    console.log('2 days later ~ 7 days later');
    // If locale omitted, current locale would be used
    return date.toLocaleTimeString(undefined, {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
  /**
   * In case that timestamp is prior than 6 days ago, or next than 7 days later
   */
  // If locale omitted, current locale would be used
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

getSixDaysAgo = () => {
  var today = getToday();
  return new Date(today.valueOf() - 6 * millisecondsPerDay);
}

getYesterday = () => {
  var today = getToday();
  return new Date(today.valueOf() - millisecondsPerDay);
}

getToday = () => {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

getTomorrow = () => {
  var today = getToday();
  return new Date(today.valueOf() + millisecondsPerDay);
}

getTwoDaysLater = () => {
  var today = getToday();
  return new Date(today.valueOf() + 2 * millisecondsPerDay);
}

getSevenDaysLater = () => {
  var today = getToday();
  return new Date(today.valueOf() + 7 * millisecondsPerDay);
}
