const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  const id = card.dataset.id;
  const run = card.querySelector('.run');
  const refresh = card.querySelector('.refresh');
  const output = card.querySelector('.output');
  const inputs = card.querySelectorAll('input,textarea');

  run.addEventListener('click', () => {
    let res = '';
    try {
      const vals = Array.from(inputs).map(i =>
        i.type==='number'? parseFloat(i.value) : i.value);
      switch(id) {
        case '1':
          let [lim,a,b,arr]=[vals[0],0,1,[]];
          while(a<=lim){arr.push(a);[a,b]=[b,a+b]}
          res=arr.join(', ');
          break;
        case '2':
          let n=vals[0];
          res = (n>0 && (n & (n-1))===0) ? 'True':'False';
          break;
        case '3':
          res = vals[0].replace(/\b\w/g,c=>c.toUpperCase());
          break;
        case '4':
          let guess = vals[0];
          window._no = window._no||Math.floor(Math.random()*100)+1;
          window._g = window._g||[];
          let d = Math.abs(guess-window._no);
          window._g.push(guess);
          if(guess===window._no){
            res=`Correct! ${window._g.length} tries`;
            delete window._no; window._g=[];
          } else {
            if(window._g.length===1) res = d<=10?'WARM!':'COLD!';
            else {
              let pd = Math.abs(window._g[window._g.length-2]-window._no);
              res = d<pd?'WARMER!':'COLDER!';
            }
          }
          break;
        case '5':
          let items = JSON.parse(vals[0]);
          let tot = items.reduce((s,i)=>s+i.price*i.quantity,0);
          if(tot>100) tot*=0.9;
          res=`Total: $${(tot*1.08).toFixed(2)}`;
          break;
        case '6':
          let [base,hrs]=vals;
          let hourly = base/40;
          let ot = Math.max(0,hrs-40);
          let gross = base + ot*hourly*1.5;
          let tax = gross<=500?0.1:gross<=1000?0.2:0.3;
          let net = gross*(1-tax)*0.938;
          res=`Net Pay: $${net.toFixed(2)}`;
          break;
      }
    } catch(e){
      res = 'Error';
    }
    output.textContent = res;
  });

  refresh.addEventListener('click', () => {
    inputs.forEach(i => i.value='');
    output.textContent = '';
  });
});

document.getElementById('modeToggle')
  .addEventListener('click', e => {
    document.body.classList.toggle('light');
    e.target.textContent = document.body.classList.contains('light') ? '☀️':'🌙';
  });
