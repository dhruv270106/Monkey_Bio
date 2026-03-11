
(function() {
    async function updateAuthUI() {
        const authContainer = document.getElementById('auth-buttons');
        if (!authContainer) return;

        // Ensure supabaseClient is available
        const client = window.supabaseClient || window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
        
        if (!client) {
            console.error('Supabase client not found');
            return;
        }

        const { data: { session } } = await client.auth.getSession();

        if (session && session.user) {
            // Determine path to root
            const scriptTag = document.querySelector('script[src*="auth-check.js"]');
            const scriptSrc = scriptTag ? scriptTag.getAttribute('src') : '';
            const pathToRoot = scriptSrc.replace('src/auth-check.js', '');

            // User is logged in
            authContainer.innerHTML = `
                <a href="${pathToRoot}dashboard.html" class="block">
                    <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary cursor-pointer hover:shadow-lg transition-shadow transform hover:scale-105">
                        <img src="${session.user.user_metadata.avatar_url || 'https://i.pravatar.cc/150?u=' + session.user.id}" alt="Profile" class="w-full h-full object-cover">
                    </div>
                </a>
            `;
        }
 else {
            // User is not logged in, show default login/signup (already there, but we can re-render if needed)
            // They are already in the HTML, so we don't necessarily need to do anything unless we want to ensure consistency.
        }
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateAuthUI);
    } else {
        updateAuthUI();
    }

    // Also listen for auth state changes
    const client = window.supabaseClient || window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
    if (client) {
        client.auth.onAuthStateChange((event, session) => {
            updateAuthUI();
        });
    }
})();
