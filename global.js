// ── Global search setup ──
function attachSearchListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query === '') {
            window.location.href = 'shop.html';
        } else {
            window.location.href = 'shop.html?search=' + encodeURIComponent(query);
        }
    }

    if (searchButton) {
        // Remove old listeners to avoid duplicates (if re-invoked)
        searchButton.replaceWith(searchButton.cloneNode(true));
        const newButton = document.getElementById('searchButton');
        newButton.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.replaceWith(searchInput.cloneNode(true));
        const newInput = document.getElementById('searchInput');
        newInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
}