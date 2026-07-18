// js/widgets/widget1_sumset.js

// This file is the interactive sumset widget (renamed and included by default).
// Sourced from existing widget_1 implementation and adapted for site-wide inclusion.

document.addEventListener("DOMContentLoaded", () => {
    const primeSelector = document.getElementById('prime-selector');
    const setBuilderDisplay = document.getElementById('set-builder-display');
    const sizeA = document.getElementById('size-A');
    const sizeB = document.getElementById('size-B');
    const sizeSum = document.getElementById('size-sum');

    if (!primeSelector || !setBuilderDisplay) return; // widget not present on this page

    let setA = new Set();
    let setB = new Set();
    let currentP = 7;

    function init() {
        currentP = parseInt(primeSelector.value);
        setA.clear();
        setB.clear();
        renderSets();
        computeSumset();
    }

    function renderSets() {
        let html = `
            <div class="set-builder-row">
                <span class="set-label">A:</span>
                <div class="circles-container" id="circles-A">
        `;
        for (let i = 0; i < currentP; i++) {
            html += `<div class="circle ${setA.has(i) ? 'active-A' : ''}" data-set="A" data-val="${i}">${i}</div>`;
        }
        html += `</div></div>`;

        html += `
            <div class="set-builder-row">
                <span class="set-label">B:</span>
                <div class="circles-container" id="circles-B">
        `;
        for (let i = 0; i < currentP; i++) {
            html += `<div class="circle ${setB.has(i) ? 'active-B' : ''}" data-set="B" data-val="${i}">${i}</div>`;
        }
        html += `</div></div>`;

        html += `
            <div class="set-builder-row">
                <span class="set-label">A+B:</span>
                <div class="circles-container" id="circles-sum">
        `;
        for (let i = 0; i < currentP; i++) {
            html += `<div class="circle" data-set="sum" data-val="${i}">${i}</div>`;
        }
        html += `</div></div>`;

        setBuilderDisplay.innerHTML = html;

        // Attach event listeners to A and B circles
        document.querySelectorAll('.circle[data-set="A"], .circle[data-set="B"]').forEach(circle => {
            circle.addEventListener('click', (e) => {
                const target = e.target;
                const set = target.getAttribute('data-set');
                const val = parseInt(target.getAttribute('data-val'));

                const activeSet = set === 'A' ? setA : setB;

                if (activeSet.has(val)) {
                    activeSet.delete(val);
                } else {
                    activeSet.add(val);
                }

                renderSets();
                computeSumset();
            });
        });
    }

    function computeSumset() {
        const sumSet = new Set();
        setA.forEach(a => {
            setB.forEach(b => {
                sumSet.add((a + b) % currentP);
            });
        });

        const sumCircles = document.querySelectorAll('.circle[data-set="sum"]');
        sumCircles.forEach(circle => {
            const val = parseInt(circle.getAttribute('data-val'));
            if (sumSet.has(val)) {
                circle.classList.add('active-sum');
            } else {
                circle.classList.remove('active-sum');
            }
        });

        if (sizeA) sizeA.textContent = setA.size;
        if (sizeB) sizeB.textContent = setB.size;
        if (sizeSum) sizeSum.textContent = sumSet.size;
    }

    // --- Guess Box Logic ---
    const submitGuessBtn = document.getElementById('submit-guess-btn');
    const minMaxDropdown = document.getElementById('min-max-dropdown');
    const boundGuessInput = document.getElementById('bound-guess-input');
    const guessFeedback = document.getElementById('guess-feedback');

    if (submitGuessBtn) {
        submitGuessBtn.addEventListener('click', () => {
            const minMaxVal = minMaxDropdown.value.toLowerCase().trim();
            // Sanitize input: remove spaces, make lowercase
            const guessVal = boundGuessInput.value.toLowerCase().replace(/\s/g, '');

            // Acceptable answers array
            const correctAnswers = ['p,|a|+|b|-1', 'p,a+b-1', 'p,|a|+|b|-1', 'p,a+b-1', 'p,|a|+|b|-1'];

            if (minMaxVal === 'min' && correctAnswers.includes(guessVal)) {
                guessFeedback.textContent = "Correct! You found the Cauchy-Davenport bound.";
                guessFeedback.className = "feedback-text correct";
            } else {
                guessFeedback.textContent = "Not quite. Keep playing with different set sizes and see what the worst-case scenario is.";
                guessFeedback.className = "feedback-text incorrect";
            }
        });
    }

    // Event Listeners
    primeSelector.addEventListener('change', init);
    init(); // Initialize on load
});
