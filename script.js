const bokadeLista = document.getElementById('bokade');
const utfördaLista = document.getElementById('utförda');
const kundNamn = document.getElementById('kundNamn');

let dataBox = [];

fetch('bokningar.json')
  .then(response => response.json())
  .then(data => {
    dataBox = data;
    displayData();
    console.log(dataBox);
  });

// Visa upp data
function displayData() {
  dataBox.sort((a, b) => {
    return new Date(a.datum) - new Date(b.datum);
  });

  bokadeLista.innerHTML = '';
  utfördaLista.innerHTML = '';

  dataBox.forEach((n) => {
    kundNamn.innerHTML = `${n.kund}`;
    kundNamn.style.color = 'beige';

    if (n.status === true) {
      const inBokade = document.createElement('li');
      const deleteBtn = document.createElement('button');

      inBokade.innerHTML = `<span>${n.städare}</span>
                              <span>${n.tid}</span>
                              <span>${n.nivå}</span>
                              <span>${n.datum}</span>`;

      inBokade.appendChild(deleteBtn);
      deleteBtn.classList.add('soptunna');
      inBokade.classList.add('appear');
      bokadeLista.appendChild(inBokade);

      deleteBtn.addEventListener('click', function () {
        inBokade.remove();
      });
    } else {
      const utFörda = document.createElement('li');
      const checkBox = document.createElement('input');

      utFörda.innerHTML = `<span>${n.städare}</span>
                             <span>${n.tid}</span>
                             <span>${n.nivå}</span>
                             <span>${n.datum}</span>`;

      utfördaLista.appendChild(utFörda);
      utFörda.classList.add('appear');
      checkBox.setAttribute("type", "checkbox");
      utFörda.appendChild(checkBox);

      checkBox.addEventListener('change', function () {
        if (checkBox.checked === true) {
          utFörda.remove();
        }
      });
    }
  });
}

// Lägg till data
function addData() {
  const timeValue = document.getElementById("time").value;
  const datumValue = document.getElementById('dateField').value;
  const curtainValue = document.getElementById('städare-dropdown').value;
  const radioStäd = document.querySelector('input[type="radio"]:checked');

  if (radioStäd != null && timeValue !== "" && datumValue !== "" && curtainValue !== "") {
    const found = dataBox.some(el => el.datum === datumValue);

    if (!found) {
      const object = {
        id: `${dataBox.length + 1}`,
        datum: datumValue,
        tid: timeValue,
        kund: 'Gunnel',
        nivå: radioStäd.value,
        status: true,
        städare: curtainValue,
      };

      dataBox.push(object);
      displayData();
    } else {
      alert('Dubbelbokning ej möjlig');
    }
  } else {
    alert('Input fattas');
  }
}
