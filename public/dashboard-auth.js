
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
        const sidebarUserName = document.querySelector('aside .text-sm.font-bold');
        if (sidebarUserName) {
            sidebarUserName.innerHTML = `${username} <i data-lucide="chevron-down" class="w-3 h-3 text-gray-400"></i>`;
        }

        // Populate Main Profile Header
        const mainDisplayName = document.querySelector('h2.text-2xl.font-bold');
        if (mainDisplayName) {
            mainDisplayName.innerHTML = `${displayName} <i data-lucide="check-circle" class="w-4 h-4 text-blue-500 fill-blue-500/10"></i>`;
        }

        // Populate Social Badges in Header
        const socialBadgesContainer = document.querySelector('.flex.items-center.gap-4.mt-2');
        if (socialBadgesContainer && profile && profile.social_links) {
            socialBadgesContainer.innerHTML = ''; // Clear hardcoded
            Object.entries(profile.social_links).forEach(([platform, handle]) => {
                const badge = document.createElement('div');
                badge.className = 'flex items-center gap-1.5 text-xs text-secondary font-bold px-2 py-1 bg-gray-100 rounded-md';
                badge.innerHTML = `<i data-lucide="${platform}" class="w-3.5 h-3.5 text-purple-500"></i> @${handle}`;
                socialBadgesContainer.appendChild(badge);
            });
            const minusBtn = document.createElement('div');
            minusBtn.className = 'w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200 transition-all';
            minusBtn.innerHTML = '<i data-lucide="minus" class="w-4 h-4"></i>';
            socialBadgesContainer.appendChild(minusBtn);
        }

        // Update Linktr.ee URL in Preview Top
        const linktreeUrlText = document.querySelector('.bg-gray-100 .text-\\[10px\\].font-bold');
        if (linktreeUrlText) {
            linktreeUrlText.textContent = `linktr.ee/${username}`;
        }

        // Update Mockup Preview (Center Section)
        const mockupName = document.querySelector('h3.text-white.font-bold.text-sm');
        if (mockupName) mockupName.textContent = username;

        const mockupContainer = document.querySelector('.w-full.max-w-\\[300px\\].aspect-\\[9\\/18\\.5\\]');
        if (mockupContainer && profile && profile.theme) {
            // Apply simple theme background colors
            const themeMap = {
                'black': 'bg-black',
                'grid': 'bg-[#451a03]',
                'dark-green': 'bg-[#064e3b]',
                'clean': 'bg-[#fff7ed]',
                'soft': 'bg-[#f3f4f6]'
            };
            // Clear existing bg classes
            Object.values(themeMap).forEach(cls => mockupContainer.classList.remove(cls));
            mockupContainer.classList.add(themeMap[profile.theme] || 'bg-black');
            
            // Adjust text color for light themes
            if (profile.theme === 'clean' || profile.theme === 'soft') {
                if (mockupName) {
                    mockupName.classList.remove('text-white');
                    mockupName.classList.add('text-secondary');
                }
            } else {
                if (mockupName) {
                    mockupName.classList.remove('text-secondary');
                    mockupName.classList.add('text-white');
                }
            }
        }

        const mockupLinksContainer = document.querySelector('.mt-auto.mb-4.w-full.flex.flex-col.items-center.gap-3')?.previousElementSibling;
        if (mockupLinksContainer && profile && profile.social_links) {
            mockupLinksContainer.innerHTML = ''; // Clear hardcoded
            Object.entries(profile.social_links).forEach(([platform, handle]) => {
                const btn = document.createElement('div');
                btn.className = 'w-full py-4 bg-[#fde68a] text-secondary text-[11px] font-bold rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-sm';
                btn.innerText = platform.charAt(0).toUpperCase() + platform.slice(1);
                mockupLinksContainer.appendChild(btn);
            });
        }

        // Populate Link Cards in Main Area
        const linksContainerBase = document.querySelector('.max-w-xl.mx-auto.space-y-8');
        const addBtn = document.querySelector('.max-w-xl.mx-auto.space-y-8 button.bg-purple-600');
        const footerInfo = document.querySelector('.max-w-xl.mx-auto.space-y-8 .pt-10.border-t');
        
        if (linksContainerBase && profile && profile.social_links) {
            // Remove existing hardcoded link cards
            const existingCards = linksContainerBase.querySelectorAll('.relative.group:not(.mb-12)');
            existingCards.forEach(card => {
                if (!card.querySelector('img')) card.remove(); // Keep profile header
            });

            // Insert new cards after the "Add Collection" row
            const insertAfter = footerInfo;
            
            Object.entries(profile.social_links).forEach(([platform, handle]) => {
                const card = document.createElement('div');
                card.className = 'relative group';
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
                linksContainerBase.insertBefore(card, footerInfo.nextSibling);
            });
        }

        // Update profile images everywhere
        const profileImages = document.querySelectorAll('img[src*="ui-avatars.com"], #dashboard-avatar, #main-avatar-img');
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6cf383&color=0F172A&bold=true`;
        
        profileImages.forEach(img => {
            const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url;
            img.src = avatarUrl || defaultAvatar;
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
