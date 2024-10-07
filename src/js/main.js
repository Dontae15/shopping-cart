// Import the styles and other JS modules
import '../styles/main.scss';
import './cart.js';
import { renderGrid } from './grid.js'; // Importing the renderGrid function from grid.js


// Asynchronous function to fetch data from the specified URL
async function fetchData(url) {
  try {
    const response = await fetch(url); // Fetch data from the provided URL
    if (!response.ok) throw new Error(`Error: ${response.status}`); // Handle fetch errors
    const data = await response.json(); // Parse the response as JSON
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error('Fetch Error:', error); // Log any errors during the fetch process
    throw error; // Re-throw the error for further handling
  }
}

// Initialize the application by fetching data and rendering the grid
async function initializePage() {
  try {
    // Fetch data from the public folder
    const data = await fetchData('/data/data.json'); // Fetch from /public/data/data.json
    renderGrid(data); // Pass the fetched data to the renderGrid function for display
    
  } catch {
    const gridContainer = document.getElementById('grid-container'); // Select the container for the grid
    if (gridContainer) {
      gridContainer.innerHTML = '<p>Failed to load data.</p>'; // Display an error message if data loading fails
    }
  }
}

// Add an event listener to initialize the page when the DOM content is loaded
window.addEventListener('DOMContentLoaded', initializePage);
