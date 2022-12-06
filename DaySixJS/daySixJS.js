// input: string of characters
// output: number of characters preceeding the start-of-packet (indicated by 4 unique characters -- included in character count)
// ex. mjqjpqmgbljsphdztnvjfqwrcgsmlb
// after mjq received, could start looking for marker BUT j is repeated as 4th char
// first marker appears after 7th char -- jpqm -- so 7 is returned

const fs = require('fs');
// access text data from fs, convert buffer to string
const data = fs.readFileSync('DaySix/daySixInput.txt').toString();

// Pt. 1 // 
const numCharsPreMarker = (buffer) => {
  //iterate through string, look at idx curr - curr + 1 (0,1,2,3) if repeeat, continue
  // run until data.length - 4 (4th to last element)
  for (let i = 0; i < buffer.length - 4; i++) {
    // create temp set to store data every four letters - leveraging sets' lack of reptition
    let tempSet = new Set();
    // add i, i+1, i+2, i+3 to set
    tempSet.add(buffer[i]);
    tempSet.add(buffer[i + 1]);
    tempSet.add(buffer[i + 2]);
    tempSet.add(buffer[i + 3]);
    // if set length === 4, return i+4 - else continue
    if (tempSet.size === 4) {
      return i + 4;
    }
    // otherwise continue iterating
  }
  // if no unique set of four characters
  return `No start-of-packet marker.Number of character in buffer is ${buffer.length}.`
}
// console.log(numCharsPreMarker(data)); // => 1134 - correct!

// Pt. 2 //
const numCharsPreMessageMarker = (buffer) => {
  for (let i = 0; i < buffer.length - 14; i++) {
    let tempSet = new Set();
    // add i, i+1, i+2... i+14 to set -- using a for loop here that way I don't have to type this code out 14 times
    for (let j = i; j < i + 14; j++) {
      tempSet.add(buffer[j]);
    }
    if (tempSet.size === 14) {
      return i + 14;
    }
  }
  return `No message marker. Number of character in buffer is ${buffer.length}.`
}

// console.log(numCharsPreMessageMarker(data)); // => 2263 - correct!
