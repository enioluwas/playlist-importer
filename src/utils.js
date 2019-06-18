/**
 * @param {string} timeStr
 * @return {number}
 */
function timeStringToSeconds(timeStr) {
  // add error handling for NaN parse
  const [minutes, seconds] = timeStr.split(':');
  const minutesNum = parseInt(minutes);
  const secondsNum = parseInt(seconds);
  const timeNum = (minutesNum * 60) + secondsNum;
  return timeNum;
}

/**
 *
 * @param {string} target
 * @param {string|RegExp} pattern
 * @param {string} replacement
 * @return {string}
 */
function replaceAll(target, pattern, replacement) {
  return target.replace(new RegExp(pattern, 'g'), replacement);
}

/**
 *
 * @param {string} target
 * @param {RegExp} regex
 * @param {number} start
 * @return {number}
 */
function indexOfRgx(target, regex, start) {
  const indexOf = target.substring(start || 0).search(regex);
  return (indexOf >= 0) ? (indexOf + (start || 0)) : indexOf;
}

function replaceAt(target, index, original, replacement) {
  return `${target.substr(0, index)}${replacement}${target.substr(index + original.length)}`;
}

module.exports = {
  timeStringToSeconds,
  replaceAll,
  indexOfRgx,
  replaceAt,
};
