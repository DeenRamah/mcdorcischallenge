// script.js

document.querySelectorAll('.question-block').forEach(block => {
  const id = block.getAttribute('data-id');
  const btn = block.querySelector('.run-btn');
  const output = block.querySelector('.output');

  btn.addEventListener('click', () => {
    const inputs = block.querySelectorAll('input, textarea');
    let result = '';

    try {
      switch (id) {
        case '1': {
          const limit = parseInt(inputs[0].value);
          let a = 0, b = 1;
          const seq = [];
          while (a <= limit) {
            seq.push(a);
            [a, b] = [b, a + b];
          }
          result = seq.join(', ');
          break;
        }
        case '2': {
          const num = parseInt(inputs[0].value);
          result = (num > 0 && (num & (num - 1)) === 0) ? 'True' : 'False';
          break;
        }
        case '3': {
          const str = inputs[0].value;
          result = str.replace(/\b\w/g, c => c.toUpperCase());
          break;
        }
        case '4': {
          const guess = parseInt(inputs[0].value);
          window._number = window._number || Math.floor(Math.random() * 100) + 1;
          window._guesses = window._guesses || [];
          if (guess < 1 || guess > 100) {
            result = 'OUT OF BOUNDS';
          } else {
            const diff = Math.abs(guess - window._number);
            window._guesses.push(guess);
            if (guess === window._number) {
              result = `Correct! You guessed it in ${window._guesses.length} tries.`;
              window._number = undefined;
              window._guesses = [];
            } else if (window._guesses.length === 1) {
              result = diff <= 10 ? 'WARM!' : 'COLD!';
            } else {
              const prevDiff = Math.abs(window._guesses[window._guesses.length - 2] - window._number);
              result = diff < prevDiff ? 'WARMER!' : 'COLDER!';
            }
          }
          break;
        }
        case '5': {
          const products = JSON.parse(inputs[0].value);
          let total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
          if (total > 100) total *= 0.9;
          total *= 1.08;
          result = `Total with discount & tax: $${total.toFixed(2)}`;
          break;
        }
        case '6': {
          const base = parseFloat(inputs[0].value);
          const hours = parseFloat(inputs[1].value);
          const hourly = base / 40;
          const overtime = Math.max(0, hours - 40);
          let gross = base + (overtime * hourly * 1.5);
          let tax = gross <= 500 ? 0.1 : gross <= 1000 ? 0.2 : 0.3;
          let afterTax = gross * (1 - tax);
          let net = afterTax * (1 - 0.062);
          result = `Net Pay: $${net.toFixed(2)}`;
          break;
        }
        default:
          result = 'No logic implemented.';
      }
    } catch (err) {
      result = 'Error: ' + err.message;
    }

    output.textContent = result;
  });
});