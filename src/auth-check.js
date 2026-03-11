
(function() {
    const supabaseRef = 'esngrodyozljdjkfcocp';
    const storageKey = `sb-${supabaseRef}-auth-token`;

    function getPathToRoot() {
        const scriptTag = document.querySelector('script[src*="auth-check.js"]');
        if (!scriptTag) return './';
        const src = scriptTag.getAttribute('src');
        return src.split('src/auth-check.js')[0] || './';
    }

    async function updateAuthUI() {
        const authContainer = document.getElementById('auth-buttons');
        if (!authContainer) return;

        // Fast path: check localStorage synchronously
        const rawToken = localStorage.getItem(storageKey);
        if (rawToken) {
            try {
                const tokenData = JSON.parse(rawToken);
                if (tokenData && tokenData.user) {
                    const pathToRoot = getPathToRoot();
                    renderLoggedInUI(authContainer, tokenData.user, pathToRoot);
                    // We still continue to Verify with Supabase client to be sure
                }
            } catch (e) {}
        }

        const client = window.supabaseClient || window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
        if (!client) {
            // Wait for client and retry
            setTimeout(updateAuthUI, 100);
            return;
        }

        const { data: { session } } = await client.auth.getSession();
        if (session && session.user) {
            const pathToRoot = getPathToRoot();
            renderLoggedInUI(authContainer, session.user, pathToRoot);
        } else {
            // Ensure buttons are visible if NOT logged in (in case we hid them for loading)
            authContainer.style.opacity = '1';
        }
    }

    function renderLoggedInUI(container, user, pathToRoot) {
        container.innerHTML = `
            <a href="${pathToRoot}dashboard.html" class="block">
                <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary cursor-pointer hover:shadow-lg transition-shadow transform hover:scale-105">
                    <img src="${user.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?u=' + user.id}" alt="Profile" class="w-full h-full object-cover">
                </div>
            </a>
        `;
        container.style.opacity = '1';
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateAuthUI);
    } else {
        updateAuthUI();
    }

    // Listener for state changes
    function setupListener() {
        const client = window.supabaseClient || window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
        if (client) {
            client.auth.onAuthStateChange((event, session) => {
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
