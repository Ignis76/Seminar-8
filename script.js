document.addEventListener('DOMContentLoaded', function() {
    
    // --- 0. THEME TOGGLE ---
    const themeToggle = document.querySelector('.theme-toggle');
    const bodyElement = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        bodyElement.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    function toggleTheme() {
        bodyElement.classList.toggle('dark-mode');
        const isDark = bodyElement.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    }
    
    function updateThemeIcon(isDark) {
        if (themeToggle) {
            themeToggle.innerHTML = isDark 
                ? '<i class="fas fa-sun"></i> Light' 
                : '<i class="fas fa-moon"></i> Dark';
        }
    }

    // --- 1. INFINITE LOOPING TYPEWRITER ---
    const textElement = document.querySelector('.type-text');
    const phrases = [
        "Analyzing the scale of Soviet industrialization...",
        "Comparing the Virgin Lands to the Oil Boom...",
        "Examining demographic shifts: Russification to Kazakhization...",
        "Evaluating PEST factors across two modernization eras...",
        "Research Question: How did state modernization reshape the steppe?"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 50;
    let deleteSpeed = 30;
    let pauseTime = 2000;
    let typeTimeout;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = deleteSpeed;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = pauseTime; 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        typeTimeout = setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();

    // --- 2. SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 3. TAB LOGIC ---
    window.openTab = function(tabName) {
        const panes = document.querySelectorAll('.content-pane');
        const buttons = document.querySelectorAll('.tab-btn');
        
        panes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        buttons.forEach(btn => btn.classList.remove('active'));

        const activePane = document.getElementById(tabName);
        if (activePane) {
            activePane.classList.add('active');
        }
        
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
    };

    // --- 4. CHART: DEMOGRAPHICS ---
    const demographicsCtx = document.getElementById('demographicsChart');
    if (demographicsCtx) {
        new Chart(demographicsCtx, {
            type: 'line',
            data: {
                labels: ['1959', '1970', '1989', '1999', '2009', '2012'],
                datasets: [
                    {
                        label: 'Ethnic Kazakhs (%)',
                        data: [30, 32.6, 40.1, 48, 63.1, 65.5],
                        borderColor: '#005b6e',
                        backgroundColor: 'rgba(0, 91, 110, 0.1)',
                        borderWidth: 3,
                        tension: 0.3,
                        fill: true,
                        pointRadius: 6,
                        pointBackgroundColor: '#005b6e',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 8
                    },
                    {
                        label: 'Ethnic Russians (%)',
                        data: [42.7, 42.4, 37.4, 30, 23.7, 21.5],
                        borderColor: '#8a0303',
                        borderWidth: 3,
                        borderDash: [5, 5],
                        tension: 0.3,
                        fill: false,
                        pointRadius: 6,
                        pointBackgroundColor: '#8a0303',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 8
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: {
                        labels: { 
                            font: { family: "'EB Garamond', serif", size: 14 },
                            usePointStyle: true,
                            padding: 20
                        },
                        position: 'top'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { family: "'EB Garamond', serif", size: 14 },
                        bodyFont: { family: "'EB Garamond', serif", size: 12 },
                        padding: 15,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 70,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { 
                            font: { family: "'EB Garamond', serif" },
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: "'EB Garamond', serif" } }
                    }
                }
            }
        });
    }

    // --- 5. CHART: GDP GROWTH ---
    const gdpCtx = document.getElementById('gdpChart');
    if (gdpCtx) {
        new Chart(gdpCtx, {
            type: 'bar',
            data: {
                labels: ['1999', '2003', '2006', '2008', '2010', '2012'],
                datasets: [{
                    label: 'GDP per Capita (USD)',
                    data: [1200, 2600, 6100, 8600, 9700, 12000],
                    backgroundColor: [
                        'rgba(0, 91, 110, 0.7)',
                        'rgba(0, 91, 110, 0.8)',
                        'rgba(0, 91, 110, 0.85)',
                        'rgba(197, 160, 89, 0.7)',
                        'rgba(0, 91, 110, 0.85)',
                        'rgba(0, 91, 110, 0.9)'
                    ],
                    borderColor: '#005b6e',
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { 
                            font: { family: "'EB Garamond', serif", size: 14 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        bodyFont: { family: "'EB Garamond', serif" },
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y + ' USD';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { 
                            font: { family: "'EB Garamond', serif" },
                            callback: function(value) {
                                return '$' + value / 1000 + 'K';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: "'EB Garamond', serif" } }
                    }
                }
            }
        });
    }

    // --- 6. CHART: OIL PRICES ---
    const oilCtx = document.getElementById('oilChart');
    if (oilCtx) {
        new Chart(oilCtx, {
            type: 'line',
            data: {
                labels: ['1999', '2002', '2005', '2007', '2008', '2010', '2012'],
                datasets: [{
                    label: 'Brent Crude Oil (USD/barrel)',
                    data: [18, 25, 54, 80, 147, 79, 112],
                    borderColor: '#8a0303',
                    backgroundColor: 'rgba(138, 3, 3, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    pointRadius: 6,
                    pointBackgroundColor: '#8a0303',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { 
                            font: { family: "'EB Garamond', serif", size: 14 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        bodyFont: { family: "'EB Garamond', serif" },
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y + '/barrel';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { 
                            font: { family: "'EB Garamond', serif" },
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: "'EB Garamond', serif" } }
                    }
                }
            }
        });
    }

    // --- 7. SCROLL ANIMATIONS ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .gallery-item, .lesson-card, .qa-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});