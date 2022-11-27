export function isoConvert(isoString: string) {
  let iso8601DurationRegex =
    /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;

  let matches = isoString.match(iso8601DurationRegex);
  if (matches) {
    return {
      sign: matches[1] === undefined ? "+" : "-",
      years: matches[2] === undefined ? 0 : parseInt(matches[2]),
      months: matches[3] === undefined ? 0 : parseInt(matches[3]),
      weeks: matches[4] === undefined ? 0 : parseInt(matches[4]),
      days: matches[5] === undefined ? 0 : parseInt(matches[5]),
      hours: matches[6] === undefined ? 0 : parseInt(matches[6]),
      minutes: matches[7] === undefined ? 0 : parseInt(matches[7]),
      seconds: matches[8] === undefined ? 0 : parseInt(matches[8]),
    };
  }

  return matches;
}
