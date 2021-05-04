import {random, algebra, Katex, FracN} from "../utils";

let problems = {
  "c1": {
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
}

export default problems;