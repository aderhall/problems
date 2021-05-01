import React, {useRef, useEffect} from "react";
import katex from "katex";
require("katex/dist/contrib/mhchem.js");

function Katex({children, display}) {
  if (display === undefined) {
    display = false;
  }
  if (Array.isArray(children)) {
    children = children.join("");
  }
  if (typeof(children) !== "string") {
    children = children.toString();
  }
  const spanRef = useRef();
  useEffect(() => {
    if (spanRef !== null) {
      katex.render(children, spanRef.current, {displayMode: display, fleqn: true});
    }
  }, [spanRef, children, display])
  return <span ref={spanRef}/>
}
function K({m}) {
  return <Katex>{m}</Katex>;
}
function FracN({n, d}) {
  [n, d] = algebra.simplifyFraction(n, d);
  if (d === 1) {
    return <K m={n} />;
  } else {
    return <Katex>\frac{`{${n}}{${d}}`}</Katex>
  }
}
function pu(m) {
  return `\\pu{${m}}`;
}
function Pu({m}) {
  return <K m={pu(m)}/>;
}

let misc = {
  range(min, max) {
    return Array(max - min).fill().map((_item, idx) => idx + min);
  }
}
let random = {
  names: {
    male: ["Bill", "Bob", "Jebediah", "Mohamed", "Karim", "Habib", "Santiago", "Gabriel", "Jayden", "Liam", "Noah", "James", "Ali", "Omar", "Yusif", "Wei", "Jie", "Hao", "Arjun", "Reyansh", "Ayaan", "Ori", "Ahmad", "Haruki", "Riku", "Lucas", "Nathan", "Stefan", "Leonardo", "Francesco", "Alessandro", "Leo", "Jack", "Sergei", "Taika"],
    female: ["Valentina", "Roxanne", "Lola", "Fatima", "Mariam", "Rowan", "Mariana", "Lucia", "Camila", "Olivia", "Charlotte", "Emma", "Leyla", "Zeynab", "Salma", "Jing", "Ying", "Yan", "Aadya", "Diya", "Saanvi", "Sarah", "Jana", "Honoka", "Akari", "Anna", "Sophia", "Yasmine", "Ginevra", "Beatrice", "Aurora", "Stella", "Lucy", "Anastasia", "Mia"]
  },
  nouns: ["shoe", "car", "carpet", "rocket", "microscope", "tambourine", "guitar", "envelope", "jetpack", "parachute", "donut", "vegetable"],
  currencies: ["$", "€", "￡"],
  variables: ["a", "b", "c", "d", "m", "n", "p", "q", "r", "t", "w", "x", "y", "z"],
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
  nonZeroInt(min, max) {
    if (min > 0 || max < 0) {
      return this.int(min, max);
    }
    let result = this.int(min, max - 1);
    if (result >= 0) {
      return result + 1;
    }
    return result;
  },
  uniqueInts(min, max, count, nonZero) {
    if (count > max - min) {
      if ((count > 1 + max - min) || (nonZero && max >= 0 && min <= 0)) {
        throw new Error("Range is too small to generate enough ints");
      }
    }
    let ints = [];
    let int;
    for (let i = 0; i < count; i++) {
      do {
        int = nonZero ? this.nonZeroInt(min, max) : this.int(min, max);
      } while (ints.indexOf(int) !== -1);
      ints.push(int);
    }
    return ints;
  },
  bool() {
    return this.random() >= 0.5;
  },
  sign() {
    return this.bool() ? 1 : -1;
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
  uniqueVariables(count) {
    let indices = this.uniqueInts(0, this.variables.length-1, count, false);
    return indices.map(index => this.variables[index]);
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
let algebra = {
  primes: (() => {
    let sqrtmax = 10;
    let index = 0;
    let primes = misc.range(2, sqrtmax**2);
    for (let i = 2; i < sqrtmax; i++) {
      primes = primes.filter(num => num === i || num % i !== 0);
    }
    let expand = () => {
      sqrtmax++;
      let newPrimes = misc.range((sqrtmax-1)**2+1, sqrtmax**2);
      for (let i = 2; i < sqrtmax; i++) {
        newPrimes = newPrimes.filter(num => num % i !== 0);
      }
      primes.push(...newPrimes);
    }
    return {
      reset() {
        index = 0;
      },
      next() {
        let current = this.get(index);
        index++;
        return current;
      },
      get(idx) {
        let value = primes[idx];
        while (value === undefined) {
          expand();
          value = primes[idx];
        }
        return value;
      },
      indexOf(num) {
        while (true) {
          if (num > primes[primes.length - 1]) {
            expand();
          } else {
            return primes.indexOf(num);
          }
        }
      },
      isPrime(num) {
        return this.indexOf(num) !== -1;
      },
      factors(num) {
        let factors = []
        if (num < 2) {
          return factors;
        }
        let idx = 0;
        while (!this.isPrime(num)) {
          let current = this.get(idx)
          while (num % current === 0 && num !== current) {
            num /= current;
            factors.push(current);
          }
          idx++;
        }
        factors.push(num);
        return factors;
      }
    }
  })(),
  gcf(a, b) {
    let bFactors = this.primes.factors(b);
    return this.primes.factors(a).filter(factor => {
      let bIdx = bFactors.indexOf(factor);
      if (bIdx === -1) {
        return false;
      } else {
        delete bFactors[bIdx];
        return true;
      }
    }).reduce((acc, val) => acc * val, 1);
  },
  simplifyFraction(n, d) {
    let gcf = this.gcf(n, d);
    return [n / gcf, d / gcf];
  },
  formatTerm(factors) {
    // [-5, 3, "x^{11}", -1, "y", -2] -> "-30x^{11}y"
    let coefficient = 1;
    let acc = "";
    for (let factor of factors) {
      if (typeof(factor) === "number") {
        coefficient *= factor;
      } else {
        acc += factor;
      }
    }
    if (acc) {
      if (coefficient === 1) {
        coefficient = "";
      } else if (coefficient === -1) {
        coefficient = "-";
      }
    }
    return coefficient + acc;
  },
  formatExpression(...terms) {
    return terms.map(term => {
      if (Array.isArray(term)) {
        return this.formatTerm(term);
      } else if (typeof(term) === "number") {
        return term.toString();
      }
      return term;
    }).reduce((acc, term, index) => acc + (term[0] === "-" || index === 0 ? "" : "+") + term, "");
  },
  formatEquation(lhs, rhs) {
    return this.formatExpression(...lhs) + "=" + this.formatExpression(...rhs);
  }
}

export {random, fmt, Katex, K, FracN, Pu, pu, misc, algebra};