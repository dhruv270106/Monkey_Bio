
(function() {
    const supabaseRef = 'esngrodyozljdjkfcocp';
    const storageKey = `sb-${supabaseRef}-auth-token`;

    async function updateAuthUI() {
        const authContainer = document.getElementById('auth-buttons');
        if (!authContainer) return;

        // Fast path: check localStorage synchronously
        const rawToken = localStorage.getItem(storageKey);
        if (rawToken) {
            try {
                const tokenData = JSON.parse(rawToken);
                if (tokenData && tokenData.user) {
                    renderLoggedInUI(authContainer, tokenData.user);
                }
            } catch (e) {}
        }

        const client = window.supabaseClient || window.supabase || (window.supabasejs && window.supabasejs.createClient ? window.supabasejs : null);
        if (!client) {
            setTimeout(updateAuthUI, 100);
            return;
        }

        const { data: { session } } = await client.auth.getSession();
        if (session && session.user) {
            renderLoggedInUI(authContainer, session.user);
        } else {
            authContainer.style.opacity = '1';
        }
    }

    function renderLoggedInUI(container, user) {
        // Use absolute path /dashboard.html
        container.innerHTML = `
            <a href="/dashboard.html" class="block">
                <div class="user-avatar-container">
                    <img src="${user.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?u=' + user.id}" alt="Profile" class="user-avatar-img">
                </div>
            </a>
        `;
        container.style.opacity = '1';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateAuthUI);
    } else {
        updateAuthUI();
    }

    function setupListener() {
        const client = window.supabaseClient || window.supabase;
        if (client && client.auth) {
            client.auth.onAuthStateChange((event) => {
                if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                    updateAuthUI();
                }
            });
        } else {
            setTimeout(setupListener, 500);
        }
    }
    setupListener();
})();
