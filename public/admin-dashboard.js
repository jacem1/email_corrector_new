// Check authentication
if (!localStorage.getItem('adminAuthenticated')) {
    window.location.href = 'admin.html';
}

// Function to load history
async function loadHistory() {
    try {
        const response = await fetch('/getHistory');
        const history = await response.json();
        displayHistory(history);
    } catch (error) {
        console.error('Error loading history:', error);
    }
}

// Function to display history
function displayHistory(history) {
    const tableBody = document.getElementById('historyTableBody');
    tableBody.innerHTML = '';
    
    history.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.originalText}</td>
            <td>${item.correctedText}</td>
            <td>${new Date(item.timestamp).toLocaleString()}</td>
            <td>
                <button class="delete-btn" onclick="deleteHistoryItem(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete history item
async function deleteHistoryItem(index) {
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            const response = await fetch('/deleteHistory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ index })
            });
            
            if (response.ok) {
                loadHistory(); // Reload the history
            } else {
                console.error('Error deleting history item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// Function to logout
function logout() {
    localStorage.removeItem('adminAuthenticated');
    window.location.href = 'admin.html';
}

// Load history when page loads
document.addEventListener('DOMContentLoaded', loadHistory); 