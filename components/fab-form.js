class FabForm extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
            .fab-container {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 1000;
            }
            .fab-button {
                background: var(--accent);
                color: white;
                height: 60px;
                padding: 0 24px;
                border-radius: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                cursor: pointer;
                transition: transform 0.3s ease, background 0.3s ease;
                border: none;
                font-family: inherit;
            }
            .fab-button:hover {
                transform: scale(1.05);
                background: var(--accent-dark, #0056b3);
            }
            .fab-button .material-symbols-outlined {
                font-size: 24px;
            }
            .fab-text {
                font-weight: 600;
                font-size: 1rem;
            }
            .fab-popup {
                position: fixed;
                bottom: 100px;
                right: 30px;
                width: 400px;
                max-width: calc(100vw - 60px);
                max-height: calc(100vh - 120px);
                background: var(--bg);
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                border: 1px solid var(--border);
                transform: translateY(20px) scale(0.95);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                z-index: 1000;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
            .fab-popup.active {
                transform: translateY(0) scale(1);
                opacity: 1;
                visibility: visible;
            }
            .fab-popup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 20px;
                border-bottom: 1px solid var(--border);
                background: var(--bg-alt);
            }
            .fab-popup-header h3 {
                margin: 0;
                font-size: 1.1rem;
                color: var(--text);
            }
            .fab-close {
                background: none;
                border: none;
                color: var(--text-muted);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 4px;
                border-radius: 50%;
                transition: background 0.2s, color 0.2s;
            }
            .fab-close:hover {
                background: var(--bg);
                color: var(--text);
            }
            .fab-popup-content {
                padding: 0;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                background: var(--bg);
                flex: 1;
            }
            @media (max-width: 480px) {
                .fab-popup {
                    bottom: 0;
                    right: 0;
                    width: 100vw;
                    max-width: 100vw;
                    height: 85vh;
                    max-height: 85vh;
                    border-radius: 20px 20px 0 0;
                }
            }
            </style>
            
            <div class="fab-container">
                <button class="fab-button" id="fab-trigger" aria-label="Open Contact Form">
                    <span class="material-symbols-outlined">chat</span>
                    <span class="fab-text">Request Service</span>
                </button>
            </div>
            
            <div class="fab-popup" id="fab-popup">
                <div class="fab-popup-header">
                    <h3>Request Service</h3>
                    <button class="fab-close" id="fab-close" aria-label="Close Contact Form">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div class="fab-popup-content">
                    <iframe src="https://forms.softbridgelabs.in/form/6ac16707ae1e37931dd313fe?embed=true" width="100%" height="600px" frameborder="0"></iframe>
                    <div style="font-family: sans-serif; font-size: 11px; color: #666; text-align: center; margin-top: 5px; margin-bottom: 20px; padding-bottom: 10px;">Powered by <a href="https://forms.softbridgelabs.in" target="_blank" style="color: var(--accent); text-decoration: none; font-weight: 600;">SoftBridge Forms</a></div>
                </div>
            </div>
        `;

        const trigger = this.querySelector('#fab-trigger');
        const popup = this.querySelector('#fab-popup');
        const closeBtn = this.querySelector('#fab-close');

        const togglePopup = () => {
            if (window.innerWidth <= 480) {
                window.open('https://forms.softbridgelabs.in/form/6ac16707ae1e37931dd313fe', '_blank');
                return;
            }

            const isActive = popup.classList.contains('active');
            const icon = trigger.querySelector('.material-symbols-outlined');
            const text = trigger.querySelector('.fab-text');
            
            if (isActive) {
                popup.classList.remove('active');
                icon.textContent = 'chat';
                if(text) text.textContent = 'Request Service';
            } else {
                popup.classList.add('active');
                icon.textContent = 'close';
                if(text) text.textContent = 'Close';
            }
        };

        trigger.addEventListener('click', togglePopup);
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
            const icon = trigger.querySelector('.material-symbols-outlined');
            const text = trigger.querySelector('.fab-text');
            icon.textContent = 'chat';
            if(text) text.textContent = 'Request Service';
        });
    }
}

customElements.define('fab-form', FabForm);
