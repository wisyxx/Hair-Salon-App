let step = 1;
const initialStep = 1;
const lastStep = 3;

const apointment = {
  name: '',
  date: '',
  hour: '',
  services: [],
};

document.addEventListener('DOMContentLoaded', () => {
  startApp();
});

function startApp() {
  showSection();
  paginationButtons();
  tabs(); // Change section when pressing on one of the tabs
  previousSection();
  nextSection();

  queryAPI();
  clientName(); // Sets the client name to the apointment obj
  apointmentDate(); // Sets the apointment date to the apointment obj
  apointmentHour(); // Sets the apointment hour to the apointment obj
}

function showSection() {
  // Hide
  const previousSection = document.querySelector('.show');
  if (previousSection) {
    previousSection.classList.remove('show');
  }

  // Show
  const stepSelector = `#step-${step}`;
  const section = document.querySelector(stepSelector);
  section.classList.add('show');

  // Deletes the highlighting from the tab
  const previousTab = document.querySelector('.current');
  if (previousTab) {
    previousTab.classList.remove('current');
  }

  // Highlights the current tab
  const tabSelector = `[data-step="${step}"]`;
  const tab = document.querySelector(tabSelector);
  tab.classList.add('current');
}

function tabs() {
  const buttons = document.querySelectorAll('.tabs button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      step = parseInt(e.target.dataset.step);
      showSection();
      paginationButtons();
    });
  });
}

function paginationButtons() {
  const nextButton = document.querySelector('#next');
  const previousButton = document.querySelector('#previous');

  switch (step) {
    case 1:
      previousButton.classList.add('hide');
      nextButton.classList.remove('hide');
      break;
    case 3:
      nextButton.classList.add('hide');
      previousButton.classList.remove('hide');
      break;
    default:
      nextButton.classList.remove('hide');
      previousButton.classList.remove('hide');
      break;
  }

  nextButton.addEventListener('click', () => {});
  previousButton.addEventListener('click', () => {});
}

function previousSection() {
  const previousButton = document.querySelector('#previous');
  previousButton.addEventListener('click', () => {
    if (step <= initialStep) return;
    step--;

    paginationButtons();
    showSection();
  });
}

function nextSection() {
  const nextButton = document.querySelector('#next');
  nextButton.addEventListener('click', () => {
    if (step >= lastStep) return;
    step++;

    paginationButtons();
    showSection();
  });
}

async function queryAPI() {
  try {
    const url = 'http://localhost:3000/api/services';
    const result = await fetch(url);
    const services = await result.json();
    showServices(services);
  } catch (error) {
    console.log(error);
  }
}

function showServices(services) {
  services.forEach((service) => {
    const { id, name, price } = service;

    const serviceName = document.createElement('P');
    serviceName.classList.add('service-name');
    serviceName.textContent = name;

    const servicePrice = document.createElement('P');
    servicePrice.classList.add('service-price');
    servicePrice.textContent = `${price}€`;

    const serviceDiv = document.createElement('DIV');
    serviceDiv.classList.add('service');
    serviceDiv.dataset.serviceId = id;
    serviceDiv.onclick = function () {
      selectService(service);
    };

    serviceDiv.appendChild(serviceName);
    serviceDiv.appendChild(servicePrice);

    document.querySelector('#services').appendChild(serviceDiv);
  });
}

function selectService(service) {
  const { id } = service;
  const { services } = apointment;

  const serviceDiv = document.querySelector(`[data-service-id="${id}"]`);

  if (services.some((selected) => selected.id === service.id)) {
    apointment.services = services.filter((selected) => selected.id !== id);
    serviceDiv.classList.remove('selected');
  } else {
    apointment.services = [...services, service]; // Same as apointment.services.push(service)
    serviceDiv.classList.add('selected');
  }
}

function clientName() {
  apointment.name = document.querySelector('#name').value;
}
function apointmentDate() {
  const dateInput = document.querySelector('#date');
  
  dateInput.addEventListener('input', (e) => {
    const day = new Date(e.target.value).getUTCDay();
    
    if ([0].includes(day)) {
      e.target.value = '';
      showAlert("You can't select Sundays", 'error');
    } else {
      apointment.date = e.target.value;
    }
  });
}

function apointmentHour() {
  const hourInput = document.querySelector('#hour');

  hourInput.addEventListener('input', (e) => {
    const hour = e.target.value.split(':')[0];
    if (hour < 10 || hour > 20) {
      showAlert('The hour must be between 10:00 and 20:00', 'error');
    } else {
      apointment.hour = e.target.value;
    }
  });
}

function showAlert(message, alertType) {
  const previousAlert = document.querySelector('.error');
  if (previousAlert) return;

  const alert = document.createElement('DIV');
  const form = document.querySelector('.form');

  alert.textContent = message;
  alert.classList.add(alertType);
  form.appendChild(alert);
  console.log(form);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}

