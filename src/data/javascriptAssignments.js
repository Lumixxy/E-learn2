const javascriptAssignments = {
  'js-assignment-1': {
    title: 'Calculator App',
    description: 'Build a functional calculator that can perform basic arithmetic operations.',
    requirements: [
      'Create a calculator interface with buttons for numbers 0-9',
      'Add buttons for basic operations: +, -, *, /',
      'Implement clear and equals functionality',
      'Handle decimal numbers and negative numbers',
      'Display results in a screen/display area',
      'Add keyboard support for number and operator input'
    ],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Calculator</title>
    <style>
        .calculator {
            max-width: 300px;
            margin: 50px auto;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .display {
            width: 100%;
            height: 60px;
            font-size: 24px;
            text-align: right;
            margin-bottom: 15px;
            padding: 0 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        button {
            height: 50px;
            font-size: 18px;
            border: 1px solid #ddd;
            border-radius: 5px;
            cursor: pointer;
            background-color: white;
        }
        button:hover {
            background-color: #e9e9e9;
        }
        .operator {
            background-color: #007bff;
            color: white;
        }
        .equals {
            background-color: #28a745;
            color: white;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <input type="text" class="display" id="display" readonly>
        <div class="buttons">
            <!-- Add your calculator buttons here -->
            <!-- Numbers 0-9, operators +, -, *, /, clear, equals -->
        </div>
    </div>

    <script>
        // Your JavaScript code here
        // Implement calculator functionality
    </script>
</body>
</html>`,
    rubric: [
      { criterion: 'Calculator displays numbers correctly', points: 20 },
      { criterion: 'Basic operations (+, -, *, /) work correctly', points: 30 },
      { criterion: 'Clear and equals functionality implemented', points: 20 },
      { criterion: 'Handles decimal and negative numbers', points: 15 },
      { criterion: 'Code is well-organized and commented', points: 15 }
    ]
  },
  'js-assignment-2': {
    title: 'Weather App',
    description: 'Create a weather application that fetches data from an API and displays current weather information.',
    requirements: [
      'Create a search interface for city names',
      'Fetch weather data from a weather API (use OpenWeatherMap or similar)',
      'Display current temperature, weather condition, and description',
      'Show additional details like humidity, wind speed, and pressure',
      'Handle loading states and error cases',
      'Make the interface responsive and visually appealing'
    ],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #74b9ff, #0984e3);
            min-height: 100vh;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .search-box {
            display: flex;
            margin-bottom: 30px;
        }
        #cityInput {
            flex: 1;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 8px 0 0 8px;
            font-size: 16px;
        }
        #searchBtn {
            padding: 12px 20px;
            background: #0984e3;
            color: white;
            border: none;
            border-radius: 0 8px 8px 0;
            cursor: pointer;
            font-size: 16px;
        }
        .weather-info {
            text-align: center;
            display: none;
        }
        .loading {
            text-align: center;
            display: none;
        }
        .error {
            text-align: center;
            color: #e74c3c;
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Weather App</h1>
        <div class="search-box">
            <input type="text" id="cityInput" placeholder="Enter city name...">
            <button id="searchBtn">Search</button>
        </div>
        
        <div class="loading" id="loading">
            <p>Loading weather data...</p>
        </div>
        
        <div class="error" id="error">
            <p>City not found. Please try again.</p>
        </div>
        
        <div class="weather-info" id="weatherInfo">
            <!-- Weather information will be displayed here -->
        </div>
    </div>

    <script>
        // API key for OpenWeatherMap (you'll need to get your own)
        const API_KEY = 'your_api_key_here';
        const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
        
        // Your JavaScript code here
        // Implement weather app functionality
    </script>
</body>
</html>`,
    rubric: [
      { criterion: 'Successfully fetches data from weather API', points: 25 },
      { criterion: 'Displays weather information correctly', points: 25 },
      { criterion: 'Handles loading and error states', points: 20 },
      { criterion: 'Search functionality works properly', points: 15 },
      { criterion: 'Interface is responsive and well-designed', points: 15 }
    ]
  }
};

export default javascriptAssignments;
