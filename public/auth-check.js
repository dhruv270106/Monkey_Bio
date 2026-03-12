
(function() {
    let originalButtonsHTML = '';
    
    // Inject premium round avatar styles
    const style = document.createElement('style');
    style.innerHTML = `
        #auth-buttons { opacity: 0; transition: opacity 0.5s ease; }
        .user-avatar-container {
            width: 44px;
            height: 44px;
            border-radius: 50% !important;
            border: 3px solid #43E660 !important;
            padding: 2px;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: hidden !important;
            background: white !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .user-avatar-container:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 20px rgba(67,230,96,0.3);
            border-color: #2ecf4a !important;
        }
        .user-avatar-img {
            width: 100% !important;
            height: 100% !important;
            border-radius: 50% !important;
            object-fit: cover !important;
            display: block !important;
        }
    `;
    document.head.appendChild(style);

    const supabaseRef = 'esngrodyozljdjkfcocp';
    const storageKey = `sb-${supabaseRef}-auth-token`;

    async function updateAuthUI() {
        const authContainer = document.getElementById('auth-buttons');
        if (!authContainer) return;

        // Save original buttons if we haven't yet
        // We look for any of the original button classes or just the lack of avatar
        if (!originalButtonsHTML && !authContainer.querySelector('.user-avatar-container')) {
            originalButtonsHTML = authContainer.innerHTML;
        }

        // 1. Fast path: check localStorage
        const rawToken = localStorage.getItem(storageKey);
        if (rawToken) {
            try {
                const tokenData = JSON.parse(rawToken);
                if (tokenData && tokenData.user) {
                    renderLoggedInUI(authContainer, tokenData.user);
                }
            } catch (e) {}
        }

        // 2. Verified path: check Supabase client
        let client = window.supabaseClient;
        
        // If supabaseClient is not set, try to find it or create it if the library is available
        if (!client) {
            const lib = window.supabase || window.supabasejs;
            if (lib && typeof lib.createClient === 'function') {
                // Try to use existing global config if possible, else we wait
                if (window.supabaseUrl && window.supabaseKey) {
                    window.supabaseClient = lib.createClient(window.supabaseUrl, window.supabaseKey);
                    client = window.supabaseClient;
                }
            }
        }

        if (!client || !client.auth) {
            // If we don't have a client yet, try again in a bit
            setTimeout(updateAuthUI, 200);
            return;
        }

        try {
            const { data: { session }, error } = await client.auth.getSession();
            if (error) throw error;

            if (session && session.user) {
                renderLoggedInUI(authContainer, session.user);
            } else {
                // Return to original buttons if logged out
                if (originalButtonsHTML) {
                    authContainer.innerHTML = originalButtonsHTML;
                }
                authContainer.style.opacity = '1';
            }
        } catch (err) {
            console.error('Auth check error:', err);
            // On error, revert to original buttons as safety
            if (originalButtonsHTML) {
                authContainer.innerHTML = originalButtonsHTML;
            }
            authContainer.style.opacity = '1';
        }
    }

    function renderLoggedInUI(container, user) {
        const displayName = user.user_metadata?.full_name || user.email.split('@')[0];
        const avatarUrl = user.user_metadata?.avatar_url;
        const finalImg = avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6cf383&color=0F172A&bold=true`;
        
        container.innerHTML = `
            <a href="/dashboard.html" class="block" title="Dashboard">
                <div class="user-avatar-container">
                    <img src="${finalImg}" alt="Profile" class="user-avatar-img">
                </div>
            </a>
        `;
        container.style.opacity = '1';
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateAuthUI);
    } else {
        updateAuthUI();
    }

    // Listen for state changes
    window.addEventListener('load', () => {
        const client = window.supabaseClient || window.supabase;
        if (client && client.auth) {
            client.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                    updateAuthUI();
                }
            });
        }
    });

    // Final safety check after 2 seconds
    setTimeout(updateAuthUI, 2000);
})();
