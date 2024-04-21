// Prompt the user to input two numbers
let num1 = parseFloat(prompt("Enter the first number:"));
let num2 = parseFloat(prompt("Enter the second number:"));

// Check which number is greater
if (num1 > num2) {
  // Subtract num2 from num1 if num1 is greater
  let result = num1 - num2;
  // Print the result
  console.log("The result is: " + result);
} else {
  // Subtract num1 from num2 if num2 is greater or equal
  let result = num2 - num1;
  // Print the result
  console.log("The result is: " + result);
}
