let problems = {};

export let collections = {
  "_Math": {
    "_Arithmetic": {
      "Exponents and compound interest": {"math": ["e1"]}
    },
    "_Algebra": {
      "Simultaneous equations": {"alg": ["simult1"]},
      "Simple linear equations": {"alg": ["l1", "l2"]},
      "Factoring quadratics": {"alg": ["factor"]}
    },
    "_Calculus": {
      "Simple integration": {"calc": ["c1"]}
    }
  },
  "_Physics": {
    "Thermal physics": {"physics": ["thermal1"]}
  }
}
let importCache = [];

export async function getIdList(path) {
  let dependencyObject = collections;
  for (let component of path.split("/")) {
    dependencyObject = dependencyObject[component];
  }
  let idList = [];
  await Promise.all(Object.entries(dependencyObject).map(async ([dependency, ids]) => {
    idList.push(...ids);
    if (importCache.indexOf(dependency) === -1) {
      problems = {...problems, ...(await import(`./problems/${dependency}.js`)).default}
      importCache.push(dependency);
    }
  }));
  return idList;
}

let problemHistory = {};
export function honeypotHistory() {
  let tmp = problemHistory;
  problemHistory = {};
  return () => {
    problemHistory = tmp;
  }
}
// Returns true if successful, false if already in problemHistory
function tryAddToHistory(id, q) {
  // TODO: This only looks at today's problemHistory, it should look at all problemHistory
  // If this problem id doesn't exist in problemHistory, create it
  if (!(id in problemHistory)) {
    problemHistory[id] = {};
  }
  
  // Check for a matching q object in this id's history
  let qAsString = JSON.stringify(q);
  for (let date in problemHistory[id]) {
    for (let entry of problemHistory[id][date]) {
      if (JSON.stringify(entry) === qAsString) {
        // If there's a match, return false without adding the duplicate q
        return false;
      }
    }
  }
  
  // If there's no entry for today, create one
  let today = dateToString(new Date());
  if (!(today in problemHistory[id])) {
    problemHistory[id][today] = [];
  }
  // If no duplicates were found, go ahead and add it
  problemHistory[id][today].push(q);
  return true;
}
// Removes the oldest item from the specified id's history if the turnover has been reached
function trimHistory(id) {
  let sum = 0;
  let oldest = new Date();
  let date;
  for (let dateString in problemHistory[id]) {
    date = stringToDate(dateString)
    if (date < oldest) {
      oldest = date;
    }
    sum += problemHistory[id][dateString].length;
  }
  if (sum > problems[id].turnover) {
    // shift() removes the first entry, which is the oldest since they are added with push()
    problemHistory[id][dateToString(oldest)].shift();
  }
}
// Removes all entries from problemHistory that are older than 3 weeks
export function cleanHistory() {
  let now = new Date();
  for (let id in problemHistory) {
    for (let dateString in problemHistory[id]) {
      // If entry is more than 3 weeks old, delete it
      if (now - stringToDate(dateString) > 3 * 7 * 24 * 60 * 60 * 1000) {
        delete problemHistory[id][dateString]
      }
    }
  }
}

function dateToString(date) {
  let m = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  let d = (date.getDate() < 10 ? "0": "") + date.getDate();
  return `${date.getFullYear()}${m}${d}`;
}

function stringToDate(string) {
  let ys = parseInt(string.slice(0, 4));
  let ms = parseInt(string.slice(4, 6)) - 1;
  let ds = parseInt(string.slice(6, 8));
  return new Date(ys, ms, ds)
}

// Returns a new problem object if possible
// Returns null if unable to create a unique problem not already in problemHistory
export function newProblem(id) {
  let data = newProblemData(id);
  let result = problems[id].format(data);
  // If an id property hasn't been defined, make a unique one
  if (result.id === undefined) {
    result.id = JSON.stringify(data.q) + id;
  }
  return result;
}
// Tries to create a unique problem object. If it fails, it will fall back on a recent problem
function newProblemData(id) {
  let data;
  // Generate up to 200 problems, before deciding that all possibilities are exhausted and we should just return an old problem
  for (let count = 0; count < 200; count++) {
    data = problems[id].generate();
    if (tryAddToHistory(id, data.q)) {
      return data;
    } else {
      trimHistory(id);
    }
  }
  console.warn(`Unable to create unique problem (id: ${id}, data: ${data})`);
  return data;
}