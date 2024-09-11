function calc(...args) {
  if (args.length < 3) {
    throw new Error("Insufficient arguments");
  }

  // Step 1: Process multiplication and division first
  let resultArray = [];
  let i = 0;

  while (i < args.length) {
    if (typeof args[i] === "number" && args[i] > 1000) {
      i += 2; // Skip the number and the operator
      continue;
    }
    if (typeof args[i] !== "number" && resultArray.length == 0) {
      i++;
      continue;
    }
    if (typeof args[i] === "number") {
      resultArray.push(args[i]);
    } else if (args[i] === "*" || args[i] === "/") {
      let prevNumber = resultArray.pop();
      let nextNumber = args[i + 1];

      if (nextNumber > 1000) {
        nextNumber = 0; // Ignore numbers > 1000
      }

      if (typeof nextNumber !== "number") {
        throw new Error("Invalid input type");
      }

      if (args[i] === "*") {
        resultArray.push(prevNumber * nextNumber);
      } else if (args[i] === "/") {
        if (nextNumber === 0) {
          throw new Error("Division by zero");
        }
        resultArray.push(prevNumber / nextNumber);
      }
      i++; // Skip the next number as it's already processed
    } else {
      resultArray.push(args[i]);
    }
    i++;
  }

  // Step 2: Process addition and subtraction
  let result = resultArray[0];
  i = 1;

  while (i < resultArray.length) {
    let operator = resultArray[i];
    let nextNumber = resultArray[i + 1];

    if (typeof nextNumber !== "number") {
      throw new Error("Invalid input type");
    }

    if (operator === "+") {
      result += nextNumber;
    } else if (operator === "-") {
      result -= nextNumber;
    }
    i += 2;
  }

  return result;
}

module.exports = calc;
