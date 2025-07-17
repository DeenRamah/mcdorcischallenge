document.querySelectorAll('.card').forEach(block => {
  const id = block.dataset.id;
  const btn = block.querySelector('.run-btn');
  const refresh = block.querySelector('.refresh-btn');
  const output = block.querySelector('.output');
  const inputs = block.querySelectorAll('input, textarea');

  btn.onclick = () => {
    let result = '';
    try {
      switch (id) {
        case '1': {
          const limit = parseInt(inputs[0].value);
          let a = 0, b = 1, seq = [];
          while (a <= limit) [seq.push(a), [a, b] = [b, a + b]];
          result = seq.join(', ');
          break;
        }
        case '2': {
          const num = parseInt(inputs[0].value);
          result = (num > 0 && (num & (num - 1)) === 0) ? 'True' : 'False';
          break;
        }
        case '3': {
          result = inputs[0].value.replace(/\b\w/g, c => c.toUpperCase());
          break;
        }
        case '4': {
          const guess = parseInt(inputs[0].value);
          window._number = window._number || Math.floor(Math.random() * 100) + 1;
          window._guesses = window._guesses || [];
          const diff = Math.abs(guess - window._number);
          window._guesses.push(guess);
          if (guess === window._number) {
            result = `Correct! You guessed it in ${window._guesses.length} tries.`;
            window._number = undefined;
            window._guesses = [];
          } else {
            const prevDiff = Math.abs(window._guesses[window._guesses.length - 2] - window._number || 0);
            result = window._guesses.length === 1 ? (diff <= 10 ? 'WARM!' : 'COLD!') : (diff < prevDiff ? 'WARMER!' : 'COLDER!');
          }
          break;
        }
        case '5': {
          const items = JSON.parse(inputs[0].value);
          let total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
          if (total > 100) total *= 0.9;
          result = `Total (with tax): $${(total * 1.08).toFixed(2)}`;
          break;
        }
        case '6': {
          const base = parseFloat(inputs[0].value);
          const hours = parseFloat(inputs[1].value);
          const hourly = base / 40;
          const overtime = Math.max(0, hours - 40);
          const gross = base + (overtime * hourly * 1.5);
          const taxed = gross * (gross <= 500 ? 0.9 : gross <= 1000 ? 0.8 : 0.7);
          const net = taxed * (1 - 0.062);
          result = `Net Pay: $${net.toFixed(2)}`;
          break;
        }
      }
    } catch (e) {
      result = 'Error: ' + e.message;
    }
    output.textContent = result;
  };

  refresh.onclick = () => {
    inputs.forEach(i => i.value = '');
    output.textContent = '';
  };
});

document.getElementById('toggle-mode').onclick = () => {
  document.body.classList.toggle('light');
  const icon = document.getElementById('toggle-mode');
  icon.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
};
