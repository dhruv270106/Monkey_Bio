
(function() {
    // Hide auth buttons by default to prevent flash of login/signup for logged-in users
    const style = document.createElement('style');
    style.innerHTML = `
        #auth-buttons { opacity: 0; transition: opacity 0.3s ease; }
        .user-avatar-container {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 3px solid #43E660;
            padding: 2px;
            display: flex;
            align-items: center;
            justify-center: center;
            overflow: hidden;
            background: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        .user-avatar-container:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(67,230,96,0.2);
        }
        .user-avatar-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
    `;
    document.head.appendChild(style);

    async function checkAuth() {
        const authContainer = document.getElementById('auth-buttons');
        if (!authContainer) return;

        // Try to get supabase client
        const client = window.supabaseClient || window.supabase || (window.supabasejs && window.supabasejs.createClient ? window.supabasejs : null);
        
        if (!client) {
            // If client not found, wait a bit and retry
            setTimeout(checkAuth, 100);
            return;
        }

        try {
            const { data: { session } } = await client.auth.getSession();
            
            if (session && session.user) {
                // Determine path to root for dashboard link
                const scriptTag = document.querySelector('script[src*="auth-check.js"]');
                const scriptSrc = scriptTag ? scriptTag.getAttribute('src') : '';
                const pathToRoot = scriptSrc.replace('src/auth-check.js', '');

                // User IS logged in: Hide buttons, show Avatar
                const avatarUrl = session.user.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?u=' + session.user.id;
                
                authContainer.innerHTML = `
                    <a href="${pathToRoot}dashboard.html" title="Go to Dashboard">
                        <div class="user-avatar-container">
                            <img src="${avatarUrl}" alt="Profile" class="user-avatar-img">
                        </div>
                    </a>
                `;
            } else {
                // User is NOT logged in: Keep existing buttons (they are already in HTML)
                // We just show the container now
            }
            authContainer.style.opacity = '1';
        } catch (err) {
            console.error('Auth Check Error:', err);
            authContainer.style.opacity = '1';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAuth);
    } else {
        checkAuth();
    }

    // Handle session changes (login/logout)
    window.addEventListener('load', () => {
        const client = window.supabaseClient || window.supabase;
        if (client && client.auth) {
            client.auth.onAuthStateChange((event) => {
                if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                    checkAuth();
                }
            });
        }
    });
})();
