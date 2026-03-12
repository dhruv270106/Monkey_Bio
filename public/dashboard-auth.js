
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
        const profileImages = document.querySelectorAll('img[alt="Profile"], img[alt="Profile Image"]');
        const defaultAvatar = 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
        
        profileImages.forEach(img => {
            const avatarUrl = user.user_metadata?.avatar_url;
            if (avatarUrl) {
                img.src = avatarUrl;
            } else {
                // Use a clean placeholder SVG instead of random people
                img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6cf383&color=0F172A&bold=true`;
            }
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
