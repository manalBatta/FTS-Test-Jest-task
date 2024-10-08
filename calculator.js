function calc(...args) {
  if (!args.length) {
    throw new Error("No input passed");
  }
  if (args.length < 3) {
    throw new Error("Insufficient arguments");
  }

  // Step 1: Process multiplication and division first
  let resultArray = [];
  let i = 0;
  const validOperators = ["+", "-", "*", "/"];

  while (i < args.length) {
    if (i % 2 === 0) {
      // Check for invalid input type (non-numeric)
      if (typeof args[i] !== "number" || isNaN(args[i])) {
        throw new Error("Invalid input type");
      }
    } else {
      // Check for invalid operators
      if (!validOperators.includes(args[i])) {
        throw new Error("Invalid operator");
      }
    }

    if (typeof args[i] === "number" && args[i] > 1000) {
      args[i] = 0; // Ignore numbers greater than 1000
    }

    // If it's a number, push to resultArray
    if (typeof args[i] === "number") {
      resultArray.push(args[i]);
    } else if (args[i] === "*" || args[i] === "/") {
      // Process multiplication and division immediately
      let prevNumber = resultArray.pop();
      let nextNumber = args[i + 1];

      if (nextNumber > 1000) {
        nextNumber = 0; // Ignore numbers > 1000
      }

      if (typeof nextNumber !== "number" || isNaN(nextNumber)) {
        throw new Error("Invalid input type");
      }

      if (args[i] === "*") {
        resultArray.push(prevNumber * nextNumber);
      } else {
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

    if (operator === "+") {
      result += nextNumber;
    } else {
      result -= nextNumber;
    }
    i += 2;
  }

  return result;
}
module.exports = calc;
