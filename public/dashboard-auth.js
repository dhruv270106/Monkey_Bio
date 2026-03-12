
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

        // State Management
        let userLinks = profile?.links || [];
        const socialLinks = profile?.social_links || {};

        // 1. Sidebar & Header
        const sidebarUserName = document.getElementById('sidebar-username-text');
        if (sidebarUserName) sidebarUserName.innerHTML = `${username} <i data-lucide="chevron-down" class="w-3 h-3 text-gray-400"></i>`;
        
        const mainDisplayName = document.getElementById('main-display-name');
        if (mainDisplayName) mainDisplayName.innerHTML = `${displayName} <i data-lucide="check-circle" class="w-4 h-4 text-blue-500 fill-blue-500/10"></i>`;

        // 2. Social Icons Logic
        const socialListContainer = document.getElementById('social-icons-list');
        const mockupLinksContainer = document.getElementById('mockup-preview-links');
        const socialBadgesContainer = document.getElementById('social-badges-container');

        function renderSocials() {
            if (!socialListContainer) return;
            socialListContainer.innerHTML = '';
            socialBadgesContainer.innerHTML = '';
            
            const entries = Object.entries(socialLinks);
            if (entries.length === 0) {
                socialListContainer.innerHTML = `
                    <div class="p-3 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 text-xs flex items-center gap-2 cursor-pointer hover:border-purple-300 hover:text-purple-600 transition-all" onclick="openSocialModal()">
                        <i data-lucide="plus-circle" class="w-4 h-4"></i> Add your first social icon
                    </div>`;
            } else {
                entries.forEach(([platform, handle]) => {
                    // Badge in header
                    const badge = document.createElement('div');
                    badge.className = 'flex items-center gap-1.5 text-xs text-secondary font-bold px-2 py-1 bg-gray-100 rounded-md';
                    badge.innerHTML = `<i data-lucide="${platform}" class="w-3.5 h-3.5 text-purple-500"></i> @${handle}`;
                    socialBadgesContainer.appendChild(badge);

                    // Icon in list
                    const item = document.createElement('div');
                    item.className = 'p-3 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2 group';
                    item.innerHTML = `
                        <i data-lucide="${platform}" class="w-5 h-5 text-gray-400"></i>
                        <span class="text-sm font-medium">@${handle}</span>
                        <button class="ml-auto opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all" onclick="deleteSocial('${platform}')">
                            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                        </button>
                    `;
                    socialListContainer.appendChild(item);
                });
                
                const addMore = document.createElement('button');
                addMore.className = 'w-10 h-10 rounded-full border border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-purple-300 hover:text-purple-600 transition-all';
                addMore.innerHTML = '<i data-lucide="plus" class="w-5 h-5"></i>';
                addMore.onclick = openSocialModal;
                socialListContainer.appendChild(addMore);
            }
            if (window.lucide) lucide.createIcons();
            updateMockup();
        }

        // 3. Links Management Logic
        const linksListContainer = document.getElementById('links-list');
        
        function renderLinks() {
            if (!linksListContainer) return;
            linksListContainer.innerHTML = '';
            
            if (userLinks.length === 0) {
                linksListContainer.innerHTML = `
                    <div class="py-20 text-center space-y-4 text-gray-400">
                         <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                              <i data-lucide="link" class="w-8 h-8"></i>
                         </div>
                         <p class="font-medium">No links yet. Click "Add Link" to get started!</p>
                    </div>`;
            } else {
                userLinks.forEach((link, index) => {
                    const card = document.createElement('div');
                    card.className = 'relative group animate-fade-in';
                    card.innerHTML = `
                        <div class="absolute inset-y-0 -left-6 flex items-center text-gray-200 group-hover:text-gray-400 transition-colors cursor-grab">
                            <i data-lucide="grip-vertical" class="w-6 h-6"></i>
                        </div>
                        <div class="bg-white border-2 ${link.active ? 'border-gray-100' : 'border-gray-50 opacity-60'} rounded-[32px] p-6 shadow-sm hover:shadow-md transition-all">
                            <div class="flex justify-between items-start mb-2">
                                <div class="flex-1 mr-4">
                                    <input type="text" value="${link.title}" class="font-bold text-secondary bg-transparent border-none p-0 focus:ring-0 w-full mb-1" placeholder="Title" oninput="updateLink(${index}, 'title', this.value)">
                                    <input type="text" value="${link.url}" class="text-sm text-gray-500 bg-transparent border-none p-0 focus:ring-0 w-full" placeholder="URL" oninput="updateLink(${index}, 'url', this.value)">
                                </div>
                                <div class="flex items-center gap-4">
                                    <button class="text-gray-300 hover:text-secondary"><i data-lucide="image" class="w-5 h-5"></i></button>
                                    <div class="w-12 h-6 ${link.active ? 'bg-green-500' : 'bg-gray-200'} rounded-full relative p-1 cursor-pointer transition-all" onclick="toggleLink(${index})">
                                        <div class="w-4 h-4 bg-white rounded-full absolute ${link.active ? 'right-1' : 'left-1'} transition-all shadow-sm"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-6 mt-6 pt-4 border-t border-gray-50">
                                <button class="text-gray-400 hover:text-secondary transition-all"><i data-lucide="star" class="w-4 h-4"></i></button>
                                <button class="text-gray-400 hover:text-secondary transition-all"><i data-lucide="clock" class="w-4 h-4"></i></button>
                                <span class="flex items-center gap-1.5 text-xs font-bold text-gray-400 ml-auto mr-4"><i data-lucide="bar-chart-2" class="w-3.5 h-3.5"></i> ${link.clicks || 0} clicks</span>
                                <button class="text-gray-300 hover:text-red-500 transition-all font-bold text-xs flex items-center gap-1" onclick="deleteLink(${index})">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    linksListContainer.appendChild(card);
                });
            }
            if (window.lucide) lucide.createIcons();
            updateMockup();
        }

        // Global functions for state updates
        window.updateLink = (index, key, value) => {
            userLinks[index][key] = value;
            updateMockup();
            debouncedSave();
        };

        window.toggleLink = (index) => {
            userLinks[index].active = !userLinks[index].active;
            renderLinks();
            debouncedSave();
        };

        window.deleteLink = (index) => {
            if (confirm('Delete this link?')) {
                userLinks.splice(index, 1);
                renderLinks();
                debouncedSave();
            }
        };

        window.addLink = () => {
            userLinks.unshift({ title: '', url: '', active: true, clicks: 0, id: Date.now() });
            renderLinks();
            // Focus on title of new link
            setTimeout(() => {
                const firstInput = linksListContainer.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);
        };

        window.deleteSocial = (platform) => {
            delete socialLinks[platform];
            renderSocials();
            debouncedSave();
        };

        window.openSocialModal = () => {
            alert('Adding more social icons feature coming soon! For now, manage them in onboarding.');
        };

        // 4. Mockup Sync Logic
        function updateMockup() {
            const mockupName = document.getElementById('mockup-preview-username');
            if (mockupName) mockupName.textContent = username;

            const mockupLinks = document.getElementById('mockup-preview-links');
            if (!mockupLinks) return;
            mockupLinks.innerHTML = '';

            // Add links
            userLinks.filter(l => l.active && l.title && l.url).forEach(link => {
                const btn = document.createElement('div');
                btn.className = 'w-full py-3.5 px-4 bg-white text-secondary text-[10px] font-bold rounded-xl flex items-center justify-center text-center shadow-lg border border-gray-100 animate-fade-in hover:scale-[1.02] transition-transform';
                btn.innerText = link.title;
                mockupLinks.appendChild(btn);
            });

            // Add social icons at the bottom of the content
            if (Object.keys(socialLinks).length > 0) {
                const row = document.createElement('div');
                row.className = 'flex items-center justify-center gap-4 mt-8';
                Object.keys(socialLinks).forEach(p => {
                    row.innerHTML += `<i data-lucide="${p}" class="w-5 h-5 text-gray-400"></i>`;
                });
                mockupLinks.appendChild(row);
                if (window.lucide) lucide.createIcons();
            }
        }

        // 5. Auto-save Utility
        let saveTimeout;
        function debouncedSave() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(async () => {
                console.log('Auto-saving links...');
                await window.supabaseClient.from('monkey_bio').update({
                    links: userLinks,
                    social_links: socialLinks
                }).eq('id', session.user.id);
            }, 1000);
        }

        // Initialize state
        document.getElementById('btn-add-link')?.addEventListener('click', addLink);
        document.getElementById('btn-add-social')?.addEventListener('click', openSocialModal);
        
        renderSocials();
        renderLinks();

        // UI Extras
        const linktreeUrlText = document.getElementById('preview-url-text');
        if (linktreeUrlText) linktreeUrlText.textContent = `linktr.ee/${username}`;

        // Initial image update
        const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url;
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6cf383&color=0F172A&bold=true`;
        [document.getElementById('sidebar-avatar'), document.getElementById('main-avatar-img'), document.getElementById('mockup-preview-avatar')].forEach(el => {
            if (el) {
                el.src = avatarUrl || defaultAvatar;
                el.classList.remove('hidden');
                if (el.id === 'sidebar-avatar') el.nextElementSibling?.classList.add('hidden');
            }
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
