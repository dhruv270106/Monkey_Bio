
(function() {
    async function checkDashboardAuth() {
        const client = window.supabaseClient || window.supabase || (window.supabasejs && window.supabasejs.createClient ? window.supabasejs : null);
        
        if (!client) {
            setTimeout(checkDashboardAuth, 100);
            return;
        }

        const { data: { session } } = await client.auth.getSession();

        if (!session) {
            window.location.href = '/login.html';
            return;
        }

        const user = session.user;
        let username = 'User';
        let displayName = user.user_metadata?.full_name || user.email.split('@')[0];

        // Try to fetch custom profile from monkey_bio
        try {
            const { data: profile } = await client
                .from('monkey_bio')
                .select('*')
                .eq('id', user.id)
                .single();
            
            if (profile) {
                username = profile.username;
                displayName = profile.display_name || username;
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
        }

        // Update UI Elements
        const welcomeMsg = document.getElementById('welcome-message');
        if (welcomeMsg) {
            welcomeMsg.textContent = `Welcome back, ${displayName}! 🐵`;
        }

        const userDisplay = document.getElementById('user-display-username');
        if (userDisplay) {
            userDisplay.textContent = `monkey.link/${username}`;
        }

        const profileLink = document.getElementById('user-profile-link');
        if (profileLink) {
            profileLink.href = `./profile-demo.html?u=${username}`;
        }

        // Update preview iframe
        const previewIframe = document.querySelector('iframe[src*="profile-demo.html"]');
        if (previewIframe) {
            previewIframe.src = `./profile-demo.html?u=${username}`;
        }

        // Update profile images
        const profileImages = document.querySelectorAll('img[alt="Profile"]');
        profileImages.forEach(img => {
            img.src = user.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?u=' + user.id;
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkDashboardAuth);
    } else {
        checkDashboardAuth();
    }
})();

async function handleLogout() {
    const client = window.supabaseClient || window.supabase;
    if (client && client.auth) {
        await client.auth.signOut();
    }
    window.location.href = '/index.html';
}
