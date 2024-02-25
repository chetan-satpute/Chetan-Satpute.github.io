// main.js

function main() {
  const inputElement = document.getElementById("color");

  const handleInput = (event) => {
    const color = event.target.value;

    if (isValidColorCode(color)) {
      setBackgroundColor(color);
    }
  };

  inputElement.addEventListener("input", handleInput);
  setBackgroundColor(DEFAULT_COLOR);
}

addEventListener("DOMContentLoaded", main);
