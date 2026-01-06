/**
 * Loads an external HTML file into a specific element.
 * @param {string} url - Path to the HTML file.
 * @param {string} elementId - The ID of the div to populate.
 */
async function loadComponent(url, elementId) {
    const target = document.getElementById(elementId);

    if (!target) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Could not fetch ${url}`);

        const html = await response.text();
        target.innerHTML = html;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Usage: Run after the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadComponent('../header.html', 'header');
    // loadComponent('footer.html', 'footer-container');
    // loadComponent('header_fr.html', 'header');
    // loadComponent('footer_fr.html', 'footer-container');
});