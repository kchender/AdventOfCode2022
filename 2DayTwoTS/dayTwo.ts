const fs = require('fs');


// inputs: string containing oppponent's plays and my plays
// output: score (1 for each rock, 2 for each Paper, 3 for each scissors)

// opponent: a = R, b = P, c = S
// me: x = R, y = P, z = S

// grab data from text document, convert from buffer to readable string, and then convert to array (split at every newline character)
const data: string[] = fs.readFileSync('2DayTwoTS/dayTwoTSInput.txt').toString().split(/\r?\n/);

const getScores = (plays: string[]): string => {
  let sumABC: number = 0;
  let sumXYZ: number = 0;
  plays.forEach((el) => {
    if (el[0] === 'A') {
      sumABC += 1;
    }
    if (el[0] === 'B') {
      sumABC += 2;
    }
    if (el[0] === 'C') {
      sumABC += 3;
    }
    if (el[2] === 'X') {
      sumXYZ += 1;
    }
    if (el[2] === 'Y') {
      sumXYZ += 2;
    }
    if (el[2] === 'Z') {
      sumXYZ += 3;
    }
    // draw case
    if ((el[0] === 'A' && el[2] === 'X') || (el[0] === 'B' && el[2] === 'Y') || (el[0] === 'C' && el[2] === 'Z')) {
      sumABC += 3;
      sumXYZ += 3;
    }
    //I win
    if ((el[0] === 'A' && el[2] === 'Y') || (el[0] === 'B' && el[2] === 'Z') || (el[0] === 'C' && el[2] === 'X')) {
      sumXYZ += 6;
    }
    //I lose
    if ((el[0] === 'A' && el[2] === 'Z') || (el[0] === 'B' && el[2] === 'X') || (el[0] === 'C' && el[2] === 'Y'))
    sumABC += 6
  })
  return `My score is ${sumXYZ} and my opponent's score is ${sumABC}. ${Math.max(sumABC, sumXYZ)} is the highest score and belongs to the winner!`
  // => My score is 14827 and my opponent's score is 9939. 14827 is the highest score and belongs to the winner!
}
console.log(getScores(data));

// Part Two: second column X means I need to lose, Y is draw, and Z is win. Score calculations remain the same.
const newGetScores = (plays: string[]): string => {
  // for every X, +6 points for opponent
  // for every y, plus 3 points for both
  // for every Z, plus 6 points for me

  // A = +1 (rock)
  // B = +2 (paper)
  // C = +3 (scissors)
  type Scores = {
    me: number,
    opponent: number,
  }
  const scores: Scores = {
    me: 0,
    opponent: 0
  }
  // el shape => ['A X'] length = 3
  plays.forEach((el) => {
    //I lose
    if (el[2] === 'X') {
      scores.opponent += 6;
      if (el[0] === 'A') {
        scores.opponent += 1;
        scores.me += 3;
      } else if (el[0] === 'B') {
        scores.opponent += 2;
        scores.me += 1
      } else {
        scores.opponent += 3;
        scores.me += 2;
      }
    // draw
    } else if (el[2] === 'Y') {
      scores.opponent += 3;
      scores.me += 3;
      if (el[0] === 'A') {
        scores.opponent += 1;
        scores.me += 1;
      } else if (el[0] === 'B') {
        scores.opponent += 2;
        scores.me += 2
      } else {
        scores.opponent += 3;
        scores.me += 3;
      }
     // I win 
    } else if (el[2] === 'Z') {
      scores.me += 6;
      if (el[0] === 'A') {
        scores.opponent += 1;
        scores.me += 2;
      } else if (el[0] === 'B') {
        scores.opponent += 2;
        scores.me += 3
      } else {
        scores.opponent += 3;
        scores.me += 1;
      }
    };
  });
  return `My score is ${scores.me} and my opponent's score is ${scores.opponent}. ${Math.max(scores.me, scores.opponent)} is the highest score and belongs to the winner!`
}

console.log(newGetScores(data))