// input: string data containing information on stacks and moves output: string of all top crates after all moves completed
// LIFO - **find out which Stack will end up on the top of each stack**

const fs = require('fs');
// access text data from fs, convert buffer to string and split at newline characters
const data = fs.readFileSync('5DayFive/dayFiveInput.txt').toString().split(/\r?\n/);

// tricky bit is just getting the starting data into a manageable format -- each column is 4 spaces in length

const findTopCrates = (input) => {
  // find index of the single empty line
  const StackSliceEndIndex = data.indexOf('');
  // plit it from 0 to an empty newline containing ONLY a newline character
  const stackData = data.slice(0, StackSliceEndIndex);
  // do same for moveData, but starting at idx 10 to eliminate the empty line
  const moveData = data.slice(StackSliceEndIndex + 1, data.length);
  // store number of stacks as int for future use
  let totalStacks = 0;
  // must use for loop to iterate over strings -- grab final element in stackData iterate over characeters,
  for (let i = 0; i < stackData[stackData.length - 1].length - 1; i++) {
    if (stackData[stackData.length - 1][i] !== ' ') {
      // increment totalStacks for every non-space character (the column numbers)
      totalStacks++;
    } 
  }

  // declare array of length totalStacks and populate each element with an empty array
  const allStacks = new Array(totalStacks).fill([]);
  // slice off the element containing the row numbers and join remaining elements into a string
  let stringStackData = stackData.slice(0, 8).join('');
  console.log('stringStackData:', stringStackData);
  // store current column as variable that can be references outside of the for loop
  let currStack = 0;
  // each column contains 4 characters, so increment i by 4 everytime to move onto next column
  for (let i = 0; i < stringStackData.length - 1; i += 4) {
    // increment currStack value by 1 with every iteration
    currStack++;
    // if upon incrementing, currStack's value exceeds totalStacks, reassign value to one (have moved onto next row)
    if (currStack > totalStacks) {
      currStack = 1;
      // must decrement i value because in final stack has only 3 characters
      i--;
    }
    // if the current element is an opening bracket
    if (stringStackData[i] === '[') {
      // concatenate value at upcoming index to value stored in allStacks array at 0 indexed value of currStack
      allStacks[currStack - 1] += stringStackData[i + 1];
    }
  };
  // empty array to store move data
  let moveArr = [];
  // iterate over moveData to populate moveArr and manipulate data in allsSacks
  for (let i = 0; i < moveData.length; i++) {
    // split strings into an subarrays containing strings
    moveArr.push(moveData[i].split(' '));
    // grab the numbers from moveArr and store them with declarative variable names
    let numCratesToMove = moveArr[i][1];
    // subtract one from stack numbers to account for 0-based indexing
    let fromStack = moveArr[i][3] - 1;
    let toStack = moveArr[i][5] - 1;
    // slice from 0 (element at index 0 = top crate) to numCratesToMove (exclusive)
    let slice = allStacks[fromStack].slice(0, numCratesToMove);
    // reverse the sliced string -- ensures that the last element removed from this string appears at the beginning of the string with which it will be concatenated
    slice = slice.split('').reverse().join('');
    // concatenate the reversed string onto the beginning of the value held in allStacks at index toSrack 
    allStacks[toStack] = slice.concat(allStacks[toStack]);
    // reassign value of fromStack so as not to include the section
    allStacks[fromStack] = allStacks[fromStack].slice(numCratesToMove, allStacks[fromStack].length);
  }
  // variable to store output string
  let output = '';
  // concatenate final letter of each string in allStacks with output
  allStacks.forEach((el) => { if (el) { output += el[0] }});
  return output; 
}

console.log(findTopCrates(data)); // => GZVRGVZC - WRONG. => BZBCGZTC - WRONG. => GPMJNHDG - WRONG. => QZNDMWTR - WRONG
// => VQZNJMWTR - I THINK THIS IS IT... WWWWWEEEEEEOOOOOOOO


//Pt. 2// 
// HOORAY for me because I accidentally already did this!
// Whoooooooopie!
const findTopCratesPt2= (input) => {
  const StackSliceEndIndex = data.indexOf('');
  const stackData = data.slice(0, StackSliceEndIndex);
  const moveData = data.slice(StackSliceEndIndex + 1, data.length);
  let totalStacks = 0;
  for (let i = 0; i < stackData[stackData.length - 1].length - 1; i++) {
    if (stackData[stackData.length - 1][i] !== ' ') {
      totalStacks++;
    } 
  }
  const allStacks = new Array(totalStacks).fill([]);
  let stringStackData = stackData.slice(0, 8).join('');
  let currStack = 0;
  for (let i = 0; i < stringStackData.length - 1; i += 4) {
    currStack++;
    if (currStack > 9) {
      currStack = 1;
      i--;
    }
    if (stringStackData[i] === '[') {
      allStacks[currStack - 1] += stringStackData[i + 1];
    }
  };
  let moveArr = [];
  for (let i = 0; i < moveData.length; i++) {
    moveArr.push(moveData[i].split(' '));
    let numCratesToMove = moveArr[i][1];
    let fromStack = moveArr[i][3] - 1;
    let toStack = moveArr[i][5] - 1;
    let slice = allStacks[fromStack].slice(0, numCratesToMove);
    // no reversal
    allStacks[toStack] = slice.concat(allStacks[toStack]);
    allStacks[fromStack] = allStacks[fromStack].slice(numCratesToMove, allStacks[fromStack].length);
  }
  let output = '';
  allStacks.forEach((el) => { if (el) { output += el[0] }});
  return output; 
}

// console.log(findTopCratesPt2(data)); // => NLCDCLVMQ - correct!
