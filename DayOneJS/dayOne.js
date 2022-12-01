const fs = require('fs');

// access text data from fs, convert buffer to string and split at newline characters
const data = fs.readFileSync('DayOneJS/dayOneData.txt').toString().split(/\r?\n/);


const findHeartiestElfCalories = (calorieArray) => {
// input: array 
// ouput: total Calories that elf carrying the most calories is carrying (highest sum of numbers separate by two newline characters)

  // array to store calculated totals per elf
  const totals = []
  // temp variable to store calculated totals
  let temp = 0;
  //iterate through array, pushing calculated totals into the totals array
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== '') {
      temp += Number(data[i])
    }   else {
      totals.push([temp]);
      // reassign temp value back to 0
      temp = 0;
    }
  }
  // max value from totals array
  return Math.max(...totals);
}

console.log(findHeartiestElfCalories(data));

// PART TWO: find total calories of top three elves

const findHeartiestThreeElves = (calorieArray) => {
// input: array 
// ouput: total Calories that elf carrying the most calories is carrying (highest sum of numbers separate by two newline characters)

  // array to store calculated totals per elf
  const totals = []
  // temp variable to store calculated totals
  let temp = 0;
  //iterate through array, pushing calculated totals into the totals array
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== '') {
      temp += Number(data[i])
    }   else {
      totals.push([temp]);
      // reassign temp value back to 0
      temp = 0;
    }
  }
  // sum of three Max values value from totals array - Math.max is O(n), so if I run it three times it O (3n) which isn't bad... but looping through can reduce that... mergesort = O (n log n) Timesort = (O n)
  //instead of using math.max, I'm going to sort the totals array (about the same time complexity) and return the sum of the last three elements
  totals.sort((a, b) => a - b);
  return Number(totals[totals.length - 1]) + Number(totals[totals.length - 2]) + Number(totals[totals.length - 3]);
}

console.log(findHeartiestThreeElves())