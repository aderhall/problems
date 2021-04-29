import React from "react";
import {random, K, Katex, pu, fmt} from "../utils";

let problems = {
  "thermal1": {
    name: "heating water energy calculations",
    generate() {
      return {
        q: {
          volume: random.int(1, 9) * 100,
          dv: random.choice([0.1, 0.5, 1, 2, 5, 10, 15, 20]),
          dT: random.choice([0.01, 0.05, 0.1, 0.5, 1, 2, 5]),
          initial: random.int(12, 25),
          final: random.int(35, 95),
          time: random.int(1, 20) / 2
        },
        heater: random.choice(["spirit burner", "kettle", "gas stove"])
      }
    },
    format({q: {volume, dv, dT, initial, final, time}, heater}) {
      let deltaE = fmt.round(4.2 * volume * (final - initial), 0);
      let power = fmt.round(deltaE / time / 60, 2);
      let fracUncertainty = dv / volume + 2 * dT / (final - initial);
      let uncertainty = fmt.round(deltaE * fracUncertainty, 1);
      return {
        question: <>
          <p><Katex>{volume}±{dv}{pu("ml")}</Katex> of water are heated by a {heater}. The water temperature is measured with a thermometer accurate to <Katex>±{dT}{pu("°C")}</Katex>. The thermometer reading rises from <Katex>{initial}{pu("°C")}</Katex> to <Katex>{final}{pu("°C")}</Katex> over the course of <K m={time}/> minutes.</p>
          <p>a) Calculate the rise in thermal energy in the water.</p>
          <p>b) Assuming that all the {heater}'s thermal energy is transferred to the water, calculate the average thermal power output of the {heater}.</p>
          <p>c) Calculate the absolute uncertainty in your answer to part a.</p>
        </>,
        answer: <>
          <p>a) <Katex>{deltaE} \pu J</Katex></p>
          <p>b) <Katex>{power} \pu W</Katex></p>
          <p>c) <Katex>±{uncertainty}\pu J</Katex></p>
        </>,
        explanation: <>
          <p>a) The change in thermal energy in an object is given by: <Katex display={true}>\Delta E = mc\Delta T</Katex></p>
          <p>Where <K m="m"/> is the object's mass, <K m="c"/> is the object's specific heat capacity, and <K m="\Delta T"/> is the change in temperature.</p>
          <p>Since water's density is <K m="1 \pu{g\,ml^-1}"/>, the mass of the water is just <Katex>{volume}\pu g</Katex>. Water's specific heat capacity is <K m="4200\,\pu{J\,kg^-1K^-1}"/>, or equivalently <K m="4.2\,\pu{J\,g^-1K^-1}"/>.</p>
          <p>The change in energy is therefore <Katex>4.2 * {volume} * ({final} - {initial})</Katex>, or <Katex>{deltaE} \pu J</Katex></p>
          <p>b) Power is the rate of change of energy, so it can be found by dividing the total change in energy by the time taken. <K m={time}/> minutes is <K m={time*60}/> seconds, so the power is <Katex>{deltaE} / {time*60}={power}\pu W</Katex></p>
          <p>c) When calculating the uncertainty of quantities multiplied together, we add the fractional uncertainties in those quantities. To find the fractional uncertainties, we divide the absolute uncertainty by the data value.</p>
          <ul>
            <li>Mass: <Katex>{dv} / {volume} = {fmt.round(dv / volume, 5)}</Katex></li>
            <li>Specific heat capacity is a literature value, so we assume it is infinitely precise.</li>
            <li>Temperature rise: when finding the uncertainty of an added sum, we add the absolute uncertainties. Here, the uncertainty in both the initial and final temperature is <K m={dT}/>, so the absolute uncertainty in the temperature rise is <Katex>2 * {dT} = {2* dT}\,\pu K</Katex>. Dividing this by the temperature rise (<Katex>{final - initial}\,\pu K</Katex>) gives us <K m={fmt.round(2 * dT / (final - initial), 5)}/></li>
          </ul>
          <p>Adding these fractional uncertainties gives us an overall fractional uncertainty of <K m={fmt.round(fracUncertainty, 5)}/>. Multiplying this by the change in energy (<Katex>{deltaE}\pu J</Katex>) gives us <Katex>±{uncertainty}\pu J</Katex></p>
        </>
      }
    }
  }
}

export default problems;