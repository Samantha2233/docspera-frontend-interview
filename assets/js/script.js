const Http = new XMLHttpRequest();
const url = 'https://dalazaro.github.io/ds-json-example/example.json';
Http.open('GET', url);
Http.send();

Http.onreadystatechange = (e) => {
  let loadingSignal = document.querySelector('#loading-signal');
  loadingSignal.style.display = 'none';

  let casesDiv = document.getElementById('cases-div');
  let data = JSON.parse(Http.responseText);
  const cases = data.cases;

  for (let i = 0; i < cases.length; i++) {
    const card = document.createElement('div');
    const labelDiv = document.createElement('div');
    const infoDiv = document.createElement('div');
    const case_type = document.createElement('p');
    const case_title = document.createElement('p');
    const dob = document.createElement('p');
    const dobData = document.createElement('p');
    const caseNotes = document.createElement('p');
    const caseNotesData = document.createElement('p');

    const readableDate = moment(cases[i].patient.dob).format('MM/DD/YYYY');

    case_type.textContent = cases[i].details.case_type;
    case_title.textContent = cases[i].details.case_title;
    dob.textContent = 'Date of Birth:';
    dobData.textContent = readableDate;
    caseNotes.textContent = 'Case Notes:';
    caseNotesData.textContent = cases[i].details.notes;

    if (case_type.textContent === 'Surgery') {
      card.classList.add('surgery-case');
    } else if (case_type.textContent === 'Clinical') {
      card.classList.add('clinical-case');
    }

    card.classList.add('card');
    labelDiv.setAttribute('class', 'label-div');

    labelDiv.appendChild(case_type);
    infoDiv.appendChild(case_title);
    labelDiv.appendChild(dob);
    infoDiv.appendChild(dobData);
    labelDiv.appendChild(caseNotes);
    infoDiv.appendChild(caseNotesData);

    card.appendChild(labelDiv);
    card.appendChild(infoDiv);

    casesDiv.appendChild(card);
  }
};