// in how many assignment pairs foes one range fully contain the other

/* input: text data in form:
* 2-4, 6-8
* 3-3, 4-5
* ...
*/

/* 
Convert data into array containing doubly nested subarrays 

const pairArray = [
                    [ [2, 4], [6, 8] ],
                    [ [3, 3], [4, 5] ],
                    [ [2, 8], [3, 7] ] // => fully contained exampple
                    [ [2, 8], [3, 7] ] // => overlap example:
                    ...
                  ]



myArray[0][0][0] === 2 && myArray[0][0][1] === 4 etc.

Maybe an array is not the way to go -- more declarative

{
    pair 1 {
      {}
    }
}


*/