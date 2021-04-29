import React from "react";
import {random, fmt, Katex, K, FracN, algebra} from "./utils";

let problems = {
  "l1": {
    name: "solving simple linear equations",
    generate() {
      let a = random.nonZeroInt(-10, 10);
      let b = random.nonZeroInt(-10, 10);
      return {
        q: [a, b],
        a: b - a
      }
    },
    format({q, a}) {
      return {
        question: <span>
          <Katex>{algebra.formatExpression("x", q[0])}={q[1]}</Katex>
          <br/>
          Solve for <K m="x"/>
        </span>,
        answer: <Katex>x = {a}</Katex>,
        explanation: <span>
          To get only <K m="x"/> on the left side, we can subtract <K m={q[0]}/> from both sides.
          <br/>
          This gives us <Katex>{q[1]} - {q[0]}</Katex> on the right-hand-side: <K m={a}/>.
        </span>
      }
    },
    turnover: 200,
    documented: false,
    calculator: false
  },
  "l2": {
    name: "solving simple linear equations with multiplication",
    generate() {
      let coefficient = random.sign() * random.int(3, 25);
      let rhs = random.sign() * random.int(1, 10);
      return {
        q: [coefficient, coefficient * rhs],
        a: rhs
      }
    },
    format({q, a}) {
      return {
        question: <span>
          <Katex>{q[0]}x = {q[1]}</Katex>
          <br/>
          Solve for <K m="x"/>
        </span>,
        answer: <Katex>x = {a}</Katex>
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
        question: <span>
          {name} {variant ? "buys" : "deposits"} {currency}<K m={fmt.toNPlaces(q[0], 2)}/> {variant ? "worth of stock" : ""} in {variant ? `${fmt.indArticle(noun)} ${noun} company` : "a bank"}. Every year, their {variant ? "stock price" : "balance"} {q[1] ? "increases" : "decreases"} by <K m={q[2]}/>%. After <K m={q[3]}/> years, how much money is {variant ? "the stock worth" : "in their bank account"}?
        </span>,
        answer: <span>{currency}<K m={fmt.toNPlaces(answer, 2)}/></span>,
        explanation: <span>
          {name}'s {variant ? "stock price" : "balance"} {q[1] ? "increases" : "decreases"} by <K m={q[2]}/>% per year, so each year its value changes by a factor of <K m={multiplier}/>.
          <br/>
          Repeatedly multiplying by <K m={multiplier}/>, <K m={q[3]}/> times, is the same as taking <K m={multiplier}/> to the power of <K m={q[3]}/>, which is <K m={fmt.round(Math.pow(multiplier, q[3]), 3)}/>.
          <br/>
          Multiplying this by the initial amount gives us <K m={fmt.round(answer, 3)}/>.
        </span>
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
  },
  "c1": {
    name: "integration",
    generate() {
      return {
        q: [random.int(1, 9), random.int(2, 10)]
      }
    },
    format({q}) {
      const [n, d] = algebra.simplifyFraction(q[0], q[1]+1);
      return {
        question: <span>
          Work out the indefinite integral:
          <br/>
          <Katex display={true}>\int {q[0]}x^{`{${q[1]}}`}dx</Katex>
        </span>,
        answer: <span>
          <FracN n={n} d={d}/><Katex>x^{`{${q[1]+1}}`}</Katex>
        </span>
      }
    },
    turnover: 30,
    documented: false,
    calculator: false
  }
};
let collections = {
  "Algebra": ["l1", "l2"],
  "Exponents and compound interest": ["e1"],
  "Calculus": ["c1"]
}

let problemHistory = {};
function honeypotHistory() {
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

export {newProblem, newProblemData, problems, cleanHistory, collections, random, honeypotHistory};