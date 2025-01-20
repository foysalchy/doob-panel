const url = new URL(window.location.href);

// Use URLSearchParams to extract the query parameter
const number = url.searchParams.get("phone");
console.log(number);

if (number) {
    // Set the phone number in the input field
    document.getElementById('phone').value = number; 

    // Call the API function directly after setting the phone number
    fetchCourierData(number);
}

document.getElementById('apiForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Stop the form from refreshing the page

    // Get the phone number entered by the user
    const phone = document.getElementById('phone').value;

    // Call the API function when the form is submitted
    fetchCourierData(phone);
});

// Function to fetch and display courier data
async function fetchCourierData(phone) {
    // Display a loading message
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = 'Fetching data...';

    // Your API Key
    const apiKey = 'xRneL0bw94QS2O2bfFrZlpxRnhf3W5dAAqU3kidBrLE8WYF4DI6FzBHMVpQz';

    try {
        // Make the API call
        const response = await fetch(`https://bdcourier.com/api/courier-check?phone=${phone}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // Parse the response data
        const data = await response.json();
        responseDiv.innerHTML = ''; // Clear loading message

        // Check if courierData is present in the response
      
            displayCourierData(data.courierData);
         
    } catch (error) {
        // Handle errors
        responseDiv.innerHTML = `Error: ${error.message}`;
    }
}
function displayCourierData(courierData) {
    const courierDiv = document.getElementById('courierData');
    courierDiv.innerHTML = ''; // Clear any previous data

    // Extract each courier's data
    for (const [courier, details] of Object.entries(courierData)) {
        if (courier === 'summary') continue; // Skip summary for now

        const card = document.createElement('tr');

        card.innerHTML = `
            
           
                       
                            <td>${courier.toUpperCase()}</td>
                            <td>${details.total_parcel}</td>
                            <td>${details.success_parcel}</td>
                            <td>${details.cancelled_parcel}</td>
                            <td>${details.success_ratio}%</td>
           
        `;
        courierDiv.appendChild(card);
    }
    // Add summary card
    const summaryCard = document.createElement('tr');

    summaryCard.innerHTML = `
        <td style="background:#00fff3 !important">Summary</td>
                            <td style="background:#00fff3 !important">${courierData.summary.total_parcel}</td>
                            <td style="background:#00fff3 !important">${courierData.summary.success_parcel}</td>
                            <td style="background:#00fff3 !important">${courierData.summary.cancelled_parcel}</td>
                            <td style="background:#00fff3 !important">${courierData.summary.success_ratio}%</td> 
    `;
    courierDiv.appendChild(summaryCard);

   
}
