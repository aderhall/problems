import React from "react";
import {random, algebra, K, Katex} from "../utils";

let problems = {
  "simult1": {
    generate() {
      let solution = [random.int(-5, 5), random.int(-5, 5)];
      let v1 = random.uniqueInts(-5, 5, 2, true);
      let v2 = random.uniqueInts(-5, 5, 2, true);
      return {
        q: {
          eq1: [v1[1], -v1[0], v1[1]*solution[0] - v1[0]*solution[1]],
          eq2: [v2[1], -v2[0], v2[1]*solution[0] - v2[0]*solution[1]]
        },
        varnames: random.uniqueVariables(2),
        a: solution
      }
    },
    format({q: {eq1, eq2}, varnames, a}) {
      return {
        question: <span>
          Solve the simultaneous equations to find the values of <K m={varnames[0]}/> and <K m={varnames[1]}/>.
          <Katex display={true}>{algebra.formatEquation(
            [[eq1[0], varnames[0]], [eq1[1], varnames[1]]],
            [[eq1[2]]]
          )}</Katex>
          <Katex display={true}>{algebra.formatEquation(
            [[eq2[0], varnames[0]], [eq2[1], varnames[1]]],
            [[eq2[2]]]
          )}</Katex>
        </span>,
        answer: <Katex>{varnames[0]}={a[0]},\,{varnames[1]}={a[1]}</Katex>
      }
    }
  },
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
      let coefficient = random.sign() * random.int(3, 9);
      let rhs = random.sign() * random.int(1, 10);
      return {
        q: [coefficient, coefficient * rhs],
        a: rhs
      }
    },
    format({q, a}) {
      return {
        question: <span>
          <Katex>{algebra.formatEquation([[q[0], "x"]], [q[1]])}</Katex>
          <br/>
          Solve for <K m="x"/>
        </span>,
        answer: <Katex>x = {a}</Katex>
      }
    }
  }
};

export default problems;