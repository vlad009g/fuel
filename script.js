const STORAGE_KEY_PREFIX = "serviceLog_";

// Авторизация
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    document.getElementById("auth-message").textContent = "Введите имя пользователя и пароль!";
    return;
  }

  // Проверяем имя и пароль
  const storedPassword = localStorage.getItem(`password_${username}`);
  if (storedPassword && storedPassword === password) {
    document.getElementById("auth-message").textContent = "Успешный вход!";
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("fuel-calculator").style.display = "block";
    document.getElementById("service-log").style.display = "block";
    loadServices(username);
  } else if (!storedPassword) {
    // Новый пользователь
    localStorage.setItem(`password_${username}`, password);
    document.getElementById("auth-message").textContent = "Аккаунт создан! Теперь вы вошли.";
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("fuel-calculator").style.display = "block";
    document.getElementById("service-log").style.display = "block";
  } else {
    document.getElementById("auth-message").textContent = "Неверное имя пользователя или пароль!";
  }
}

// Калькулятор топлива
function calculateFuel() {
  const distance = parseFloat(document.getElementById("distance").value);
  const fuelUsed = parseFloat(document.getElementById("fuel-used").value);

  if (isNaN(distance) || isNaN(fuelUsed)) {
    document.getElementById("fuel-result").textContent = "Пожалуйста, заполните все поля!";
    return;
  }

  const consumptionPer100Km = (fuelUsed / distance) * 100;
  document.getElementById("fuel-result").textContent = `Расход топлива: ${consumptionPer100Km.toFixed(2)} л/100 км.`;
}

// Получение записей из LocalStorage
function getServices(username) {
  const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}${username}`);
  return data ? JSON.parse(data) : [];
}

// Сохранение записей в LocalStorage
function saveServices(username, serviceList) {
  localStorage.setItem(`${STORAGE_KEY_PREFIX}${username}`, JSON.stringify(serviceList));
}

// Добавление записи в журнал
function addService() {
  const serviceType = document.getElementById("service-type").value.trim();
  const serviceDate = document.getElementById("service-date").value;

  if (!serviceType || !serviceDate) {
    alert("Пожалуйста, заполните оба поля!");
    return;
  }

  const username = document.getElementById("username").value.trim();
  const serviceList = getServices(username);
  serviceList.push({ type: serviceType, date: serviceDate });
  saveServices(username, serviceList);

  renderServices(username);
  document.getElementById("service-type").value = "";
  document.getElementById("service-date").value = "";
}

// Отображение всех записей
function renderServices(username) {
  const serviceList = getServices(username);
  const serviceListElement = document.getElementById("service-list");
  serviceListElement.innerHTML = ""; // Очищаем список

  serviceList.forEach((service) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${service.type} — ${service.date}`;
    serviceListElement.appendChild(listItem);
  });
}

// Загрузка записей при входе
function loadServices(username) {
  renderServices(username);
}
