import Papa from 'papaparse';

export const fetchTradersData = async () => {
  try {
    // Fetch the CSV data from the published Google Sheet
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRA1SdNBISsalvQKW-Vp-Gh-aD1ftjM2EjSXXJX25uT5YFqm5-RgapgUe_P2-A2rxYvb4gyybE_hq79/pub?output=csv');
    const csvData = await response.text();
    
    // Parse the CSV data into JSON
    const { data } = Papa.parse(csvData, { header: true, skipEmptyLines: true });

    // Map the parsed data into structured format
    const parsedData = data.map(row => ({
      Name: row.Name || 'N/A',  // Fallback for missing Name
      TradingStyle: row.TradingStyle || 'Not Provided',  // Fallback for missing TradingStyle
      Streaks: isNaN(parseInt(row.Streaks, 10)) ? 0 : parseInt(row.Streaks, 10),  // Ensure Streaks is a valid number
      Alerts: isNaN(parseInt(row.Alerts, 10)) ? 0 : parseInt(row.Alerts, 10),  // Ensure Alerts is a valid number
      Trades: isNaN(parseInt(row.Trades, 10)) ? 0 : parseInt(row.Trades, 10),  // Ensure Trades is a valid number
      AvgGain: isNaN(parseFloat(row.AvgGain)) ? 0 : parseFloat(row.AvgGain),  // Ensure AvgGain is a valid number (float)
      Xscore: isNaN(parseInt(row.Xscore, 10)) ? 0 : parseInt(row.Xscore, 10),  // Ensure Xscore is a valid number
      Rank: isNaN(parseInt(row.Rank, 10)) ? 0 : parseInt(row.Rank, 10),  // Ensure Rank is a valid number
      Trophies: row.Trophies || 'None',  // Fallback for missing Trophies
    }));

    return parsedData;
  } catch (error) {
    console.error("Error loading or parsing CSV file:", error);
    return [];
  }
};
