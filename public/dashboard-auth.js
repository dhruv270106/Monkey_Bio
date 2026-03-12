
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

        // Check if onboarding is completed
        const { data: profile } = await client
            .from('monkey_bio')
            .select('*')
            .eq('id', session.user.id)
            .single();

        // If no profile or onboarding not completed, redirect to onboarding
        // We also check if we are already on onboarding.html to avoid infinite loop
        if ((!profile || !profile.onboarding_completed) && !window.location.pathname.includes('onboarding.html')) {
            window.location.href = '/onboarding.html';
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

        // Populate Sidebar
        const sidebarUserName = document.getElementById('sidebar-username-text');
        if (sidebarUserName) {
            sidebarUserName.innerHTML = `${username} <i data-lucide="chevron-down" class="w-3 h-3 text-gray-400"></i>`;
        }

        // Populate Main Profile Header
        const mainDisplayName = document.getElementById('main-display-name');
        if (mainDisplayName) {
            mainDisplayName.innerHTML = `${displayName} <i data-lucide="check-circle" class="w-4 h-4 text-blue-500 fill-blue-500/10"></i>`;
        }

        // Populate Social Badges in Header
        const socialBadgesContainer = document.getElementById('social-badges-container');
        if (socialBadgesContainer) {
            socialBadgesContainer.innerHTML = ''; // Clear hardcoded
            if (profile && profile.social_links && Object.keys(profile.social_links).length > 0) {
                Object.entries(profile.social_links).forEach(([platform, handle]) => {
                    const badge = document.createElement('div');
                    badge.className = 'flex items-center gap-1.5 text-xs text-secondary font-bold px-2 py-1 bg-gray-100 rounded-md animate-fade-in';
                    badge.innerHTML = `<i data-lucide="${platform}" class="w-3.5 h-3.5 text-purple-500"></i> @${handle}`;
                    socialBadgesContainer.appendChild(badge);
                });
            } else {
                socialBadgesContainer.innerHTML = '<p class="text-xs text-gray-400 italic">No social platforms linked yet.</p>';
            }
        }

        // Update Linktr.ee URL in Preview Top
        const linktreeUrlText = document.getElementById('preview-url-text');
        if (linktreeUrlText) {
            linktreeUrlText.textContent = `linktr.ee/${username}`;
        }

        // Update Mockup Preview
        const mockupName = document.getElementById('mockup-preview-username');
        if (mockupName) mockupName.textContent = username;

        const mockupContainer = document.getElementById('mockup-iframe-container');
        if (mockupContainer && profile && profile.theme) {
            const themeMap = {
                'black': 'bg-black',
                'grid': 'bg-[#451a03]',
                'dark-green': 'bg-[#064e3b]',
                'clean': 'bg-[#fff7ed]',
                'soft': 'bg-[#f3f4f6]'
            };
            // Clear existing bg classes
            Object.values(themeMap).forEach(cls => mockupContainer.classList.remove(cls));
            mockupContainer.classList.add(themeMap[profile.theme] || 'bg-white');
            
            // Text color logic
            if (profile.theme === 'clean' || profile.theme === 'soft') {
                mockupName?.classList.replace('text-white', 'text-secondary');
            } else {
                mockupName?.classList.replace('text-secondary', 'text-white');
            }
        }

        const mockupLinksContainer = document.getElementById('mockup-preview-links');
        if (mockupLinksContainer) {
            mockupLinksContainer.innerHTML = ''; 
            if (profile && profile.social_links && Object.keys(profile.social_links).length > 0) {
                Object.entries(profile.social_links).forEach(([platform, handle]) => {
                    const btn = document.createElement('div');
                    btn.className = 'w-full py-3 bg-white/10 text-white text-[10px] font-bold rounded-xl flex items-center justify-center border border-white/20 shadow-sm';
                    if (profile.theme === 'clean' || profile.theme === 'soft') {
                        btn.className = 'w-full py-3 bg-secondary/5 text-secondary text-[10px] font-bold rounded-xl flex items-center justify-center border border-secondary/10 shadow-sm';
                    }
                    btn.innerText = platform.charAt(0).toUpperCase() + platform.slice(1);
                    mockupLinksContainer.appendChild(btn);
                });
            } else {
                // Placeholder links for empty state
                mockupLinksContainer.innerHTML = `
                    <div class="w-full py-3 bg-gray-100/50 rounded-xl"></div>
                    <div class="w-full py-3 bg-gray-100/50 rounded-xl"></div>
                `;
            }
        }

        // Populate Link Cards in Main Area
        const linksContainerBase = document.querySelector('.max-w-xl.mx-auto.space-y-8');
        const footerInfo = linksContainerBase?.querySelector('.pt-10.border-t');
        
        if (linksContainerBase && profile) {
            // Clear existing link cards (keep profile and buttons)
            const cardsToRemove = linksContainerBase.querySelectorAll('.relative.group:not(:first-child)');
            cardsToRemove.forEach(card => card.remove());

            if (profile.social_links && Object.keys(profile.social_links).length > 0) {
                Object.entries(profile.social_links).forEach(([platform, handle]) => {
                    const card = document.createElement('div');
                    card.className = 'relative group animate-fade-in';
                    card.innerHTML = `
                        <div class="absolute inset-y-0 -left-6 flex items-center text-gray-200 group-hover:text-gray-400 transition-colors cursor-grab">
                            <i data-lucide="grip-vertical" class="w-6 h-6"></i>
                        </div>
                        <div class="bg-white border-2 border-gray-100 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-all">
                            <div class="flex justify-between items-start mb-2">
                                <div>
                                    <p class="font-bold flex items-center gap-2">${platform.charAt(0).toUpperCase() + platform.slice(1)} <i data-lucide="pencil" class="w-3.5 h-3.5 text-gray-300"></i></p>
                                    <p class="text-sm text-gray-500 mt-1 flex items-center gap-2">@${handle} <i data-lucide="pencil" class="w-3.5 h-3.5 text-gray-300"></i></p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <button class="text-gray-300 hover:text-secondary"><i data-lucide="share-2" class="w-5 h-5"></i></button>
                                    <div class="w-12 h-6 bg-green-500 rounded-full relative p-1 cursor-pointer">
                                        <div class="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-6 mt-6 pt-4 border-t border-gray-50">
                                <button class="flex items-center gap-1.5 text-xs font-bold text-purple-600"><i data-lucide="${platform}" class="w-4 h-4"></i></button>
                                <button class="text-gray-400 hover:text-secondary transition-all"><i data-lucide="image" class="w-4 h-4"></i></button>
                                <button class="text-gray-400 hover:text-secondary transition-all"><i data-lucide="star" class="w-4 h-4"></i></button>
                                <span class="flex items-center gap-1.5 text-xs font-bold text-gray-400 ml-auto mr-4"><i data-lucide="bar-chart-2" class="w-3.5 h-3.5"></i> 0 clicks</span>
                                <button class="text-gray-300 hover:text-red-500 transition-all"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                            </div>
                        </div>
                    `;
                    linksContainerBase.appendChild(card);
                });
            }
        }

        // Update profile images everywhere
        const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url;
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6cf383&color=0F172A&bold=true`;
        
        const avatarElements = [
            document.getElementById('sidebar-avatar'),
            document.getElementById('main-avatar-img'),
            document.getElementById('mockup-preview-avatar'),
            document.getElementById('dashboard-avatar')
        ];
        
        avatarElements.forEach(el => {
            if (el) {
                el.src = avatarUrl || defaultAvatar;
                el.classList.remove('hidden');
                // Hide icon if image is present (for sidebar)
                if (el.id === 'sidebar-avatar') el.nextElementSibling?.classList.add('hidden');
            }
        });

        // Re-initialize icons for dynamic elements
        if (window.lucide) lucide.createIcons();
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
