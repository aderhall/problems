let problems = {
  "l1": {
    name: "solving simple linear equations",
    generate() {
      // Question: x + a = b
      // Answer: x = b - a
      // Random integer between -10 and 10
      let a = Math.floor(21*random.random()) - 10;
      let b = Math.floor(21*random.random()) - 10;
      return {
        q: [a, b],
        a: b - a
      }
    },
    format({q, a}) {
      return {
        question: `x + ${q[0]} = ${q[1]}\nSolve for x`,
        answer: `x = ${a}`,
        explanation: `To get only x on the left side, we can subtract ${q[0]} from both sides.
        This gives us ${q[1]} - ${q[0]} on the right-hand-side: ${a}.`
      }
    },
    turnover: 200,
    documented: false,
    calculator: false
  },
  "l2": {
    name: "solving simple linear equations with multiplication",
    generate() {
      let coefficient = random.int(3, 25);
      let rhs = random.int(1, 10)
      return {
        q: [coefficient, coefficient * rhs],
        a: rhs
      }
    },
    format({q, a}) {
      return {
        question: `${q[0]}x = ${q[1]}\nSolve for x`,
        answer: `x = ${a}`
      }
    }
  },
  "e1": {
    name: "calculating exponential growth",
    generate() {
      let variant = random.bool();
      return {
        q: [random.int(15, 10000), random.bool(), random.int(1, 10) / 2, random.int(3, 20)],
        name: random.name(),
        noun: variant ? random.noun() : 0,
        currency: random.currency(),
        variant: variant
      }
    },
    format({q, name, noun, currency, variant}) {
      let multiplier = 1 + (q[1] ? 0.01 : -0.01) * q[2];
      let answer = q[0] * Math.pow(multiplier, q[3]);
      return {
        question: `${name} ${variant ? "buys" : "deposits"} ${currency}${fmt.toNPlaces(q[0], 2)} ${variant ? "worth of stock" : ""} in ${variant ? `${fmt.indArticle(noun)} ${noun} company` : "a bank"}. Every year, their ${variant ? "stock price" : "balance"} ${q[1] ? "increases" : "decreases"} by ${q[2]}%. After ${q[3]} years, how much money is ${variant ? "the stock worth" : "in their bank account"}?`,
        answer: `${currency}${fmt.toNPlaces(answer, 2)}`,
        explanation: `${name}'s ${variant ? "stock price" : "balance"} ${q[1] ? "increases" : "decreases"} by ${q[2]}% per year, so each year its value changes by a factor of ${multiplier}.\nRepeatedly multiplying by ${multiplier}, ${q[3]} times, is the same as taking ${multiplier} to the power of ${q[3]}, which is ${fmt.round(Math.pow(multiplier, q[3]), 3)}.\nMultiplying this by the initial amount gives us ${fmt.round(answer, 3)}.`
      }
    },
    turnover: 1000,
    documented: false,
    calculator: true
  },
  "dummy": {
    name: "dummy",
    generate() {
      return {
        q: 1
      }
    },
    format({q}) {
      return {
        question: `${q}`,
        answer: `${q}`
      }
    },
    turnover: 0,
    documented: false,
    calculator: false
  }
};
let collections = {
  "Algebra": ["l1", "l2"],
  "Exponents and compound interest": ["e1"]
}
let problemHistory = {};
function honeypotHistory() {
  let tmp = problemHistory;
  problemHistory = {};
  return () => {
    problemHistory = tmp;
  }
}

let random = {
  names: {
    male: ["Bill", "Bob", "Jebediah", "Mohamed", "Karim", "Habib", "Santiago", "Gabriel", "Jayden", "Liam", "Noah", "James", "Ali", "Omar", "Yusif", "Wei", "Jie", "Hao", "Arjun", "Reyansh", "Ayaan", "Ori", "Ahmad", "Haruki", "Riku", "Lucas", "Nathan", "Stefan", "Leonardo", "Francesco", "Alessandro", "Leo", "Jack", "Sergei", "Taika"],
    female: ["Valentina", "Roxanne", "Lola", "Fatima", "Mariam", "Rowan", "Mariana", "Lucia", "Camila", "Olivia", "Charlotte", "Emma", "Leyla", "Zeynab", "Salma", "Jing", "Ying", "Yan", "Aadya", "Diya", "Saanvi", "Sarah", "Jana", "Honoka", "Akari", "Anna", "Sophia", "Yasmine", "Ginevra", "Beatrice", "Aurora", "Stella", "Lucy", "Anastasia", "Mia"]
  },
  nouns: ["shoe", "car", "carpet", "rocket", "microscope", "tambourine", "guitar", "envelope", "jetpack", "parachute", "donut", "vegetable"],
  currencies: ["$", "€", "￡"],
  newRandomSeed() {
    // Random Uint32
    return (Math.random() * (-1>>>0))>>>0;
  },
  initialize(seed) {
    // Initialize the first 96 bits of the seed
    // First 11 digits of PI, E, and PHI
    let a = 31415926535;
    let b = 71828182845
    let c = 16180339887;
    if (seed === undefined) {
      seed = this.newRandomSeed();
    }
    // sfc32 (short fast counter) PRNG algorithm
    // Produces uniformly-distributed floats between 0 and 1, with 32 bits of precision
    this.random = function() {
      a >>>= 0; b >>>= 0; c >>>= 0; seed >>>= 0; 
      let t = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = c + (c << 3) | 0;
      c = ((c << 21) | (c >>> 11));
      seed = seed + 1 | 0;
      t = t + seed | 0;
      c = c + t | 0;
      // Divide by max Uint32 to get a float between 0 and 1
      return (t >>> 0) / 4294967296;
    }
    // Since the first 96 bits of the seed were fixed initially, run the generator a few times to mix everything up
    for (let i = 0; i < 15; i++) this.random();
  },
  random() {
    // This function will be reassigned when this.initialize() is called
    throw new Error("PRNG has not been initialized.");
  },
  int(min, max) {
    return Math.floor((1 + max - min) * this.random()) + min;
  },
  bool() {
    return this.random() >= 0.5;
  },
  float(min, max, places) {
    let result = this.random() * (max - min) + min;
    if (places === undefined) {
      return result;
    }
    return fmt.round(result, places);
  },
  choice(arr) {
    return arr[Math.floor(arr.length * this.random())];
  },
  name() {
    return this.choice(this.names.male.concat(this.names.female));
  },
  nameAndGender() {
    let allNames = this.names.male.concat(this.names.female);
    let index = Math.floor(allNames.length * this.random());
    return [
      allNames[index],
      index >= this.names.male.length // true if female, false if male
    ]
  },
  noun() {
    return this.choice(this.nouns);
  },
  currency() {
    return this.choice(this.currencies);
  },
  money(min, max) {
    return this.float(min, max, 2);
  }
}
let fmt = {
  indArticle(word) {
    if (word[0] in ["a", "e", "i", "o", "u"]) {
      return "an";
    } else {
      return "a";
    }
  },
  round(number, places) {
    return Math.round(number * Math.pow(10, places)) / Math.pow(10, places);
  },
  toNPlaces(number, places) {
    let s = this.round(number, places).toString();
    if (places > 0) {
      let pointIndex = s.indexOf(".")
      if (pointIndex === -1) {
        s += ".";
        pointIndex = s.length - 1;
      }
      let remainingZeros = places - (s.length - 1 - pointIndex)
      for (let i = 0; i < remainingZeros; i++) {
        s += "0";
      }
    }
    return s;
  }
}

//function logProblem(problem) {
//  for (let prop in problem) {
//    console.log(`${prop}: `, problem[prop]);
//  }
//}

// Returns a new problem object if possible
// Returns null if unable to create a unique problem not already in problemHistory
function newProblem(id) {
  return problems[id].format(newProblemData(id));
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
function cleanHistory() {
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

//function testHistory() {
//  let problem;
//  for (let i = 0; i < 3; i++) {
//    problem = newProblem("dummy");
//    if (problem === null) {
//      console.log("null");
//    } else {
//      logProblem(problem);
//    }
//  }
//}

//logProblem(newProblem("expgr1"));

export {newProblem, newProblemData, problems, cleanHistory, collections, random, honeypotHistory};