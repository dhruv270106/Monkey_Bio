
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
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6cf383&color=0F172A&bold=true`;
        
        profileImages.forEach(img => {
            const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url;
            img.src = avatarUrl || defaultAvatar;
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkDashboardAuth);
    } else {
        checkDashboardAuth();
    }
})();

// Profile Picture Cropping Logic
let cropper;
const cropperModal = document.getElementById('cropper-modal');
const cropperImage = document.getElementById('cropper-image');
const avatarUploadInput = document.getElementById('avatar-upload');

function triggerAvatarUpload() {
    avatarUploadInput.click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            cropperImage.src = e.target.result;
            cropperModal.classList.remove('hidden');
            
            if (cropper) cropper.destroy();
            
            setTimeout(() => {
                cropper = new Cropper(cropperImage, {
                    aspectRatio: 1,
                    viewMode: 1,
                    dragMode: 'move',
                    autoCropArea: 0.8,
                    restore: false,
                    guides: false,
                    center: true,
                    highlight: false,
                    cropBoxMovable: true,
                    cropBoxResizable: true,
                    toggleDragModeOnDblclick: false,
                });
            }, 100);
        };
        reader.readAsDataURL(file);
    }
}

function closeCropper() {
    cropperModal.classList.add('hidden');
    if (cropper) cropper.destroy();
    avatarUploadInput.value = '';
}

async function saveCroppedImage() {
    if (!cropper) return;

    const saveBtn = document.getElementById('save-crop-btn');
    saveBtn.disabled = true;
    saveBtn.innerHTML = 'Saving...';

    try {
        const canvas = cropper.getCroppedCanvas({
            width: 400,
            height: 400,
        });

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
        
        const client = window.supabaseClient || window.supabase;
        const { data: { session } } = await client.auth.getSession();
        
        if (!session) throw new Error('No session');

        const fileName = `${session.user.id}-${Date.now()}.jpg`;
        
        // 1. Upload to Supabase Storage (assuming 'avatars' bucket exists)
        // If it fails, we fall back to base64 for the session (though it won't persist well)
        const { data, error: uploadError } = await client.storage
            .from('avatars')
            .upload(fileName, blob, { upsert: true });

        if (uploadError) {
            console.error('Storage error:', uploadError);
            throw new Error('Could not upload to storage. Make sure "avatars" bucket is public in Supabase.');
        }

        const { data: { publicUrl } } = client.storage.from('avatars').getPublicUrl(fileName);

        // 2. Update monkey_bio table
        const { error: updateError } = await client
            .from('monkey_bio')
            .update({ avatar_url: publicUrl })
            .eq('id', session.user.id);

        if (updateError) throw updateError;

        // 3. Update UI
        const dashboardAvatar = document.getElementById('dashboard-avatar');
        if (dashboardAvatar) dashboardAvatar.src = publicUrl;
        
        alert('Profile picture updated successfully!');
        closeCropper();
        location.reload(); // Refresh to update all instances
    } catch (err) {
        alert(err.message);
        console.error(err);
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = 'Save Changes';
    }
}

async function handleLogout() {
    const client = window.supabaseClient || window.supabase;
    if (client && client.auth) {
        await client.auth.signOut();
    }
    window.location.href = '/index.html';
}
