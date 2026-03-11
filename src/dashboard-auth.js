
(function() {
    async function checkDashboardAuth() {
        if (!window.supabaseClient) {
            console.error('Supabase client not found');
            return;
        }

        const { data: { session } } = await window.supabaseClient.auth.getSession();

        if (!session) {
            // Determine path to root
            const scriptTag = document.querySelector('script[src*="dashboard-auth.js"]');
            const scriptSrc = scriptTag ? scriptTag.getAttribute('src') : '';
            const pathToRoot = scriptSrc.replace('src/dashboard-auth.js', '');
            
            window.location.href = pathToRoot + 'login.html';
            return;
        }

        // Update profile images if they exist
        const profileImages = document.querySelectorAll('img[alt="Profile"]');
        profileImages.forEach(img => {
            img.src = session.user.user_metadata.avatar_url || 'https://i.pravatar.cc/150?u=' + session.user.id;
        });
        
        // Update username links if they exist (assuming monkey.link/something format)
        // This is a bit more complex, for now we just ensure session exists
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkDashboardAuth);
    } else {
        checkDashboardAuth();
    }
})();

async function handleLogout() {
    // Determine path to root
    const scriptTag = document.querySelector('script[src*="dashboard-auth.js"]');
    const scriptSrc = scriptTag ? scriptTag.getAttribute('src') : '';
    const pathToRoot = scriptSrc.replace('src/dashboard-auth.js', '');

    await window.supabaseClient.auth.signOut();
    window.location.href = pathToRoot + 'index.html';
}
