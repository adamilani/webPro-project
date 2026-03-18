document.addEventListener('DOMContentLoaded', function () {
    const dataContainer = document.getElementById('data-container');
    const daysElement = document.getElementById('days-count');

    // לוגיקת ספירה לאחור למונדיאל
    const kickoff = new Date('June 11, 2026 20:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const diff = kickoff - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        daysElement.textContent = days > 0 ? days : "0";
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60); // עדכון כל שעה

    // טעינת "כרטיסים" (מבוסס על ה-API הקודם אבל עם טקסט של מונדיאל)
    fetch('https://fakestoreapi.com/products?limit=6')
        .then(res => res.json())
        .then(products => {
            dataContainer.innerHTML = '';
            products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${product.image}" alt="Venue" style="width:100%; height:150px; object-fit:cover;">
                    <div style="padding:15px">
                        <h3>Match Ticket #${product.id}</h3>
                        <p>Category: ${product.category}</p>
                        <p><strong>Price: $${product.price}</strong></p>
                        <button class="buy-button">Reserve Ticket</button>
                    </div>
                `;
                dataContainer.appendChild(card);
            });
        })
        .catch(err => console.error("Error loading tickets:", err));
});