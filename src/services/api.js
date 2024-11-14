import Papa from 'papaparse';

export const fetchTradersData = async () => {
  try {
    // Fetch the CSV data from Google Sheets
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSI6pTPirfHEXgXtq-fQjxRuDeGBmreYLJ24oDpHEdgd3Ip09rN_ckp_W591rYHfWHlyZ055D47I7jY/pub?output=csv');
    const csvText = await response.text();

    // Parse the CSV data to JSON using PapaParse
    const parsedData = Papa.parse(csvText, {
      header: true, // This treats the first row as the header
      skipEmptyLines: true,
      dynamicTyping: (header) => header === 'Streaks' || header === 'Alerts' || header === 'Trades' || header === 'Xscore' || header === 'Rank' // Parse these columns as numbers
    });

    // Map the data to the correct structure and handle specific formats
    const structuredData = parsedData.data.map(row => ({
      Name: row['Name'],
      TradingStyle: row['Trading Style'],
      Streaks: parseInt(row['Streaks'], 10),
      Alerts: parseInt(row['Alerts'], 10),
      Trades: parseInt(row['Trades'], 10),
      AvgGain: row['Avg Gain'] ? parseFloat(row['Avg Gain']) / 100 : 0, // Remove '%' and parse without multiplying by 100
      Xscore: parseInt(row['Xscore'], 10),
      Rank: parseInt(row['Rank'], 10),
      Trophies: row['Trophies'], // Assuming Trophies is a string or mixed type
    }));

    return structuredData;
  } catch (error) {
    console.error("Error loading or parsing CSV file:", error);
    return [];
  }
};
