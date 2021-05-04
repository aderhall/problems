import {random, fmt, K} from "../utils";

let problems = {
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
  }
}

export default problems;