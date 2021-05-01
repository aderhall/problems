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
  }
};

export default problems;