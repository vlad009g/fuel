Вот полный код, который включает калькулятор расхода топлива на 100 км и журнал обслуживания с сохранением записей в LocalStorage.


---

HTML (структура сайта)

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Авто-калькулятор</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Авто-калькулятор</h1>
  </header>

  <main>
    <!-- Калькулятор расхода топлива -->
    <section id="fuel-calculator">
      <h2>Калькулятор расхода топлива</h2>
      <label for="distance">Пройденное расстояние (км):</label>
      <input type="number" id="distance" placeholder="Введите расстояние">

      <label for="fuel-used">Потрачено топлива (л):</label>
      <input type="number" id="fuel-used" placeholder="Введите количество литров">

      <button onclick="calculateFuel()">Рассчитать</button>

      <p id="fuel-result"></p>
    </section>

    <!-- Журнал обслуживания -->
    <section id="service-log">
      <h2>Журнал обслуживания</h2>
      <label for="service-type">Тип обслуживания:</label>
      <input type="text" id="service-type" placeholder="Например, Замена масла">
      
      <label for="service-date">Дата:</label>
      <input type="date" id="service-date">

      <button onclick="addService()">Добавить</button>

      <h3>История:</h3>
      <ul id="service-list"></ul>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>

