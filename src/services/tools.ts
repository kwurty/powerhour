export function isoConvert(isoString: string): timeObject {
  let iso8601DurationRegex =
    /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;

  let matches = isoString.match(iso8601DurationRegex);
  if (!matches) {
    throw new Error("Invalid ISO8601 duration string");
  }

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

export interface timeObject {
  sign?: string;
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
export function convertToSeconds(timeObject: timeObject) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = timeObject;
  return (
    years * 365 * 24 * 60 * 60 +
    months * 30 * 24 * 60 * 60 +
    weeks * 7 * 24 * 60 * 60 +
    days * 24 * 60 * 60 +
    hours * 60 * 60 +
    minutes * 60 +
    seconds
  );
}

export function setLocalStorage(name: string, data: object) {
  // check for existing playlist...
  // not sure if we need to account for it or not yet
  if (localStorage.getItem(name)) {
    // overwrite
    localStorage.setItem(name, JSON.stringify(data));
  } else {
    // create
    localStorage.setItem(name, JSON.stringify(data));
  }
}

export function getLocalStorage(name: string) {
  // check for existing playlist...
  if (localStorage.getItem(name)) {
    const localJSON = localStorage.getItem(name);
    if (localJSON) {
      return JSON.parse(localJSON);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function deleteLocalStorage(name: string) {
  if (localStorage.getItem(name)) {
    localStorage.removeItem(name);
  }
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
