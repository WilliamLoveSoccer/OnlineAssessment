// glob expansion
//
// Example 1:
// In: "{a,b}"
// Out: ['a', 'b']
//
// Example 2:
// In: "./{foo,bar}.{txt,json}"
// Out: ['./foo.txt', './foo.json', './bar.txt', './bar.json']

// Example 3:
// In: "./{a,b}.{c,d}"
// Out: ['./a.c', './a.d', './b.c', './b.d']

function globExpansion(input) {
  let output = [];
  let commonString = "";

  for (let i = 0; i < input.length; i++) {
    let ch = input[i];

    // If char is not "{", then it is outside of the {}
    if (ch !== "{") {
      commonString += ch;
    }

    // If we meet the "{", then we deal with strings in {}
    if (ch === "{") {
      let endIndex = i;
      while (ch !== "}") {
        endIndex++;
        ch = input[endIndex];
      }

      // get substrings in the {}, and store them into array;
      let substringArray = input.substring(i + 1, endIndex).split(",");

      // then we started to append common strings and strings in the {}
      let newOutputStrings = [];
      substringArray.forEach((stringInBrace) => {
        let newString = commonString + stringInBrace;

        // if output is empty, then we simply push it to array
        if (output.length === 0) {
          newOutputStrings.push(newString);
        }
        // if output is not empty, for each of the string in output array, we need to append it to new string.
        else {
          output.forEach((outputString) => {
            outputString = outputString + newString;
            newOutputStrings.push(outputString);
          });
        }
      });
      output = newOutputStrings;
      commonString = ""; // reset commonString is necessary
      i = endIndex;
    }
  }

  // If there are tailing strings, simply append those strings.
  if (commonString.length !== 0) {
    let newOutputStrings = [];
    if (output.length === 0) {
      newOutputStrings.push(newString);
    } else {
      output.forEach((outputString) => {
        outputString = outputString + commonString;
        newOutputStrings.push(outputString);
      });
    }
    output = newOutputStrings;
  }
  return output;
}

// I'm assuming that all the curly braces in string are paired.
// If that is not the case, I will need to apply stack to check the "paired brace".
let input = "{a,b}";
let output = globExpansion(input);
console.log(output);
