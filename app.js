document.getElementById('addItemForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const itemName = document.getElementById('itemName').value;
  if (itemName.trim()) {
    addItem(itemName);
    document.getElementById('itemName').value = ''; 
  } else {
    showMessage('Por favor ingresa un nombre para el item.', 'warning');
  }
});

function fetchItems() {
  fetch('http://localhost:3000/items')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => displayItems(data))
    .catch(error => console.error('Error fetching items:', error));
}

function displayItems(items) {
  const itemsContainer = document.getElementById('items');
  itemsContainer.innerHTML = '';
  items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.textContent = item.name;
    itemsContainer.appendChild(itemElement);
  });
}

document.addEventListener('DOMContentLoaded', fetchItems); // Ensure fetchItems runs after the DOM is fully loaded

function addItem(name) {
  
}

function deleteItem(id) {
  
}

function editItem(id, name) {
  
}

function showMessage(message, type) {
  const messagesContainer = document.getElementById('messages');
  messagesContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  setTimeout(() => messagesContainer.innerHTML = '', 3000);
}

function addItem(name) {
  fetch('http://localhost:3000/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to create item');
    }
    return response.json();
  })
  .then(item => {
    fetchItems(); 
    showMessage('Item añadido con éxito!', 'success'); 
  })
  .catch(error => {
    console.error('Error adding item:', error);
    showMessage('Error al añadir item: ' + error.message, 'danger'); 
  });
}
