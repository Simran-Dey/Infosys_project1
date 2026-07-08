/**
 * JavaScript Controller - Agentic Facility Ops AI Platform (OpsAgent)
 * Handles responsive menu states, interactive tabs filtering, and AI Chat Assistant simulator.
 */

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. RESPONSIVE MENU TOGGLE (Landing Page)
    // -----------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // -----------------------------------------------------------------
    // 2. DASHBOARD SIDEBAR MOBILE TOGGLE
    // -----------------------------------------------------------------
    const navToggleBtn = document.getElementById('navToggleBtn');
    const sidebar = document.getElementById('sidebar');

    if (navToggleBtn && sidebar) {
        navToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        // Close sidebar if clicked outside (on mobile)
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== navToggleBtn) {
                sidebar.classList.remove('active');
            }
        });
    }

    // -----------------------------------------------------------------
    // 3. AI AGENT TABS FILTERING
    // -----------------------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const agentCards = document.querySelectorAll('.agent-detail-card');

    if (tabButtons.length > 0 && agentCards.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all tabs
                tabButtons.forEach(tb => tb.classList.remove('active'));
                // Add active class to current tab
                btn.classList.add('active');

                const filterVal = btn.getAttribute('data-filter');

                // Filter cards
                agentCards.forEach(card => {
                    if (filterVal === 'all') {
                        card.style.display = 'flex';
                    } else {
                        if (card.classList.contains(filterVal)) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // -----------------------------------------------------------------
    // 4. AI CHAT ASSISTANT SIMULATOR
    // -----------------------------------------------------------------
    const btnAskAI = document.getElementById('btnAskAI');
    const aiChatDrawer = document.getElementById('aiChatDrawer');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    // Toggle chat drawer open
    if (btnAskAI && aiChatDrawer) {
        btnAskAI.addEventListener('click', () => {
            aiChatDrawer.classList.add('active');
            if (chatInput) chatInput.focus();
        });
    }

    // Close chat drawer
    if (chatCloseBtn && aiChatDrawer) {
        chatCloseBtn.addEventListener('click', () => {
            aiChatDrawer.classList.remove('active');
        });
    }

    // Send chat messages
    if (chatSendBtn && chatInput && chatBody) {
        const sendMessage = () => {
            const text = chatInput.value.trim();
            if (!text) return;

            // 1. Add User Message
            addMessage('user', 'You', text);
            chatInput.value = '';

            // 2. Add simulated typing response
            setTimeout(() => {
                const response = getSimulatedResponse(text);
                addMessage('bot', 'OpsAgent Assistant', response);
            }, 800);
        };

        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function addMessage(type, sender, text) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', type);
        
        messageDiv.innerHTML = `
            <div class="message-sender">${sender}</div>
            <div class="message-text">${text}</div>
            <span class="message-time">${time}</span>
        `;
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto scroll to bottom
    }

    function getSimulatedResponse(userQuery) {
        const q = userQuery.toLowerCase();
        
        if (q.includes('energy') || q.includes('electricity') || q.includes('hvac')) {
            return "Our Energy Agent is actively monitoring and optimizing HVAC cycles. Current savings are pacing at **12.4%** this month, representing a cost savings of **₹1.25L**.";
        }
        if (q.includes('maintenance') || q.includes('wrench') || q.includes('break') || q.includes('repair')) {
            return "The Maintenance Agent reports all high-criticality assets are operating under safe thresholds. Reliability (MTBF) has increased by **92%** since system integration.";
        }
        if (q.includes('security') || q.includes('alarm') || q.includes('breach')) {
            return "The Security Agent is monitoring video feeds and locks. Threat detection rate is at **98.6%**, and 15 minor anomalies were resolved automatically this week.";
        }
        if (q.includes('occupancy') || q.includes('space') || q.includes('people')) {
            return "Average office layout occupancy is at **65%**. Occupancy Agent suggests reconfiguring Zone C heating scheduling to save an additional 4% energy tonight.";
        }
        if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
            return "Hello! I can answer questions about the **Energy Agent**, **Maintenance Agent**, **Occupancy Agent**, or **Security Agent**. Try asking about 'energy savings'!";
        }
        
        return "I've logged your query regarding facility ops. Currently, all four agents are synchronized and operations are running smoothly with no active alerts.";
    }

    // -----------------------------------------------------------------
    // 5. SIMPLE STATS COUNTER ANIMATION (Landing Page only)
    // -----------------------------------------------------------------
    const statCards = document.querySelectorAll('.stats-section .stat-card');
    if (statCards.length > 0) {
        const startCounter = (card) => {
            const numEl = card.querySelector('.stat-num');
            const targetVal = parseFloat(numEl.innerText.replace(/[^\d.]/g, ''));
            const isFloat = numEl.innerText.includes('.');
            const hasLakhSymbol = numEl.innerText.includes('L');
            const hasRupee = numEl.innerText.includes('₹');
            const hasPercent = numEl.innerText.includes('%');
            
            let count = 0;
            const duration = 1200; // ms
            const stepTime = 15; // ms
            const steps = duration / stepTime;
            const increment = targetVal / steps;

            const timer = setInterval(() => {
                count += increment;
                if (count >= targetVal) {
                    clearInterval(timer);
                    numEl.innerText = (hasRupee ? '₹' : '') + 
                                      (isFloat ? targetVal.toFixed(1) : Math.floor(targetVal)) + 
                                      (hasLakhSymbol ? 'L' : '') +
                                      (hasPercent ? '%' : '');
                } else {
                    numEl.innerText = (hasRupee ? '₹' : '') + 
                                      (isFloat ? count.toFixed(1) : Math.floor(count)) + 
                                      (hasLakhSymbol ? 'L' : '') +
                                      (hasPercent ? '%' : '');
                }
            }, stepTime);
        };

        // Trigger counters when scrolled into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statCards.forEach(card => observer.observe(card));
    }
});
