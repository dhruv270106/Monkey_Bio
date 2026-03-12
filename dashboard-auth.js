
(function() {
    async function checkDashboardAuth() {
        const client = window.supabaseClient || window.supabase || (window.supabasejs && window.supabasejs.createClient ? window.supabasejs : null);
        
        if (!client) {
            setTimeout(checkDashboardAuth, 100);
            return;
        }

        const { data: { session } } = await client.auth.getSession();

        if (!session) {
            window.location.href = 'login.html';
            return;
        }

        // Check if onboarding is completed
        const { data: profile } = await client
            .from('monkey_bio')
            .select('*')
            .eq('id', session.user.id)
            .single();

        // If no profile or onboarding not completed, redirect to onboarding
        if (!profile || profile.onboarding_completed !== true) {
            console.log('Onboarding check failed. Profile:', profile);
            if (!window.location.pathname.includes('onboarding.html')) {
                console.warn('Redirecting to onboarding because onboarding_completed is not true.');
                // Optional: alert('Your onboarding is not marked as complete. Redirecting...');
                window.location.href = 'onboarding.html';
                return;
            }
        } else {
            console.log('Onboarding status: VERIFIED COMPLETE.');
        }

        // State Management
        console.log('Final Profile for Dashboard:', profile);
        
        const username = profile?.username || 'User';
        const displayName = profile?.display_name || username;
        let userLinks = profile?.links || [];
        const socialLinks = profile?.social_links || {};
        const savedTheme = profile?.theme || 'black';
        const bioText = profile?.bio || '';

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
            const modal = document.getElementById('social-modal');
            if (modal) {
                modal.classList.remove('hidden');
                document.getElementById('social-search').value = '';
                resetSocialSelection();
                renderPlatformList();
            }
        };

        window.closeSocialModal = () => {
            document.getElementById('social-modal').classList.add('hidden');
        };

        let activeSocialPlatform = null;

        window.renderPlatformList = (filter = '') => {
            const list = document.getElementById('social-platform-list');
            if (!list) return;
            list.innerHTML = '';
            
            platforms.forEach(p => {
                if (filter && !p.name.toLowerCase().includes(filter.toLowerCase())) return;
                
                // Hide if already added
                if (socialLinks[p.id]) return;

                const btn = document.createElement('button');
                btn.className = 'flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-purple-200 hover:bg-purple-50 transition-all font-bold text-sm text-secondary shadow-sm hover:shadow-md group';
                btn.onclick = () => selectSocialPlatform(p);
                btn.innerHTML = `
                    <div class="w-12 h-12 ${p.color} ${p.iconColor} rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <i data-lucide="${p.icon}" class="w-6 h-6"></i>
                    </div>
                    ${p.name}
                `;
                list.appendChild(btn);
            });
            if (window.lucide) lucide.createIcons();
        };

        window.filterSocials = () => {
            const val = document.getElementById('social-search').value;
            renderPlatformList(val);
        };

        window.selectSocialPlatform = (platform) => {
            activeSocialPlatform = platform;
            document.getElementById('social-search').closest('.relative').classList.add('hidden');
            document.getElementById('social-platform-list').classList.add('hidden');
            
            const inputArea = document.getElementById('social-input-area');
            inputArea.classList.remove('hidden');
            inputArea.classList.add('animate-fade-in');
            
            const iconContainer = document.getElementById('selected-social-icon');
            iconContainer.className = `w-12 h-12 rounded-xl flex items-center justify-center text-white ${platform.iconColor.replace('text-', 'bg-')} shadow-md`;
            iconContainer.innerHTML = `<i data-lucide="${platform.icon}" class="w-6 h-6"></i>`;
            
            document.getElementById('selected-social-name').innerText = `Add ${platform.name}`;
            
            const prefix = platform.id === 'website' ? 'https://' : '@';
            document.getElementById('social-input-prefix').innerText = prefix;
            
            const input = document.getElementById('social-handle-input');
            input.placeholder = platform.id === 'website' ? 'yourwebsite.com' : 'username';
            input.value = '';
            input.focus();
            
            if (window.lucide) lucide.createIcons();
        };

        window.resetSocialSelection = () => {
            activeSocialPlatform = null;
            document.getElementById('social-search').closest('.relative').classList.remove('hidden');
            document.getElementById('social-platform-list').classList.remove('hidden');
            document.getElementById('social-input-area').classList.add('hidden');
            const passInput = document.getElementById('social-password-input');
            if (passInput) passInput.value = '';
        };

        window.saveSocialLink = () => {
            if (!activeSocialPlatform) return;
            const handle = document.getElementById('social-handle-input').value.trim();
            const passInput = document.getElementById('social-password-input');
            const password = passInput ? passInput.value.trim() : '';

            if (!handle) {
                alert('Please enter your username or ID');
                return;
            }
            if (passInput && !password) {
                 alert('Authentication required. Please enter an access token or password.');
                 return;
            }
            
            // In a real app we wouldn't save passwords in plaintext to the profile,
            // so we ONLY save the handle to display on the linktree.
            // The password acts as a UX gate to simulate "Connect Account"
            socialLinks[activeSocialPlatform.id] = handle;
            
            renderSocials();
            debouncedSave();
            closeSocialModal();
            if (passInput) passInput.value = '';
        };


        // 4. Mockup Sync Logic
        function updateMockup() {
            const mockupName = document.getElementById('mockup-preview-username');
            if (mockupName) mockupName.textContent = '@' + username;

            const mockupLinks = document.getElementById('mockup-preview-links');
            if (!mockupLinks) return;
            mockupLinks.innerHTML = '';

            // 1. Add Social Links as Boxes (User Request)
            Object.entries(socialLinks).forEach(([platform, handle]) => {
                if (handle) {
                    const pb = platforms.find(p => p.id === platform);
                    const btn = document.createElement('div');
                    btn.className = 'w-full py-4 px-6 bg-white/90 backdrop-blur-sm text-secondary text-xs font-bold rounded-2xl flex items-center shadow-md border border-gray-100/50 hover:scale-[1.02] transition-all cursor-pointer group mb-3';
                    btn.innerHTML = `
                        <div class="w-8 h-8 ${pb?.color || 'bg-gray-100'} ${pb?.iconColor || 'text-gray-400'} rounded-lg flex items-center justify-center mr-3">
                            <i data-lucide="${pb?.icon || 'link'}" class="w-4 h-4"></i>
                        </div>
                        <span class="flex-1">${pb?.name || platform}</span>
                        <i data-lucide="more-vertical" class="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    `;
                    mockupLinks.appendChild(btn);
                }
            });

            // 2. Add Custom Links
            userLinks.filter(l => l.active && l.title && l.url).forEach(link => {
                const btn = document.createElement('div');
                btn.className = 'w-full py-4 px-6 bg-white/95 text-secondary text-xs font-bold rounded-2xl flex items-center justify-center text-center shadow-lg border border-gray-100 hover:scale-[1.02] transition-all cursor-pointer mb-3';
                btn.innerText = link.title;
                mockupLinks.appendChild(btn);
            });

            // Social Icons at bottom (if any handles exist)
            if (Object.keys(socialLinks).length > 0) {
                const row = document.createElement('div');
                row.className = 'flex items-center justify-center gap-5 mt-8 mb-4';
                Object.keys(socialLinks).forEach(p => {
                    const pb = platforms.find(pl => pl.id === p);
                    row.innerHTML += `<i data-lucide="${pb?.icon || p}" class="w-5 h-5 text-gray-400 hover:text-secondary transition-colors cursor-pointer"></i>`;
                });
                mockupLinks.appendChild(row);
            }
            
            if (window.lucide) lucide.createIcons();
            
            console.log('Applying theme to mockup:', savedTheme);
            applyThemeToMockup(savedTheme);
        }

        function applyThemeToMockup(theme) {
            const mockup = document.getElementById('mockup-iframe-container');
            const usernameEl = document.getElementById('mockup-preview-username');
            
            if (!mockup || !usernameEl) {
                console.warn('Mockup elements not found for theme application');
                return;
            }

            const currentTheme = theme || savedTheme;

            // Reset
            mockup.style.background = '';
            mockup.style.backgroundImage = '';
            mockup.style.backgroundColor = 'white';
            mockup.style.border = '10px solid #020617'; // Standard phone border
            usernameEl.className = 'font-bold text-sm mb-6 ';
            
            // Themes Logic (Sync with onboarding.html)
            if (currentTheme === 'black') { mockup.style.backgroundColor = 'black'; usernameEl.classList.add('text-white'); }
            else if (currentTheme === 'gradient-peach') { mockup.style.background = 'linear-gradient(to bottom, #bfdbfe, #fdba74)'; usernameEl.classList.add('text-secondary'); }
            else if (currentTheme === 'grid') { mockup.style.backgroundColor = '#451a03'; usernameEl.classList.add('text-white'); mockup.style.backgroundImage = 'radial-gradient(#ffffff11 1px, transparent 0)'; mockup.style.backgroundSize = '20px 20px'; }
            else if (currentTheme === 'gold') { mockup.style.backgroundColor = '#171717'; usernameEl.classList.add('text-yellow-600'); }
            else if (currentTheme === 'floral') { mockup.style.backgroundImage = "url('https://images.unsplash.com/photo-1523348837742-82da744db91d?auto=format&fit=crop&w=800&q=80')"; mockup.style.backgroundSize = "cover"; usernameEl.classList.add('text-pink-800'); }
            else if (currentTheme === 'cartoon-vibes') { mockup.style.backgroundColor = '#facc15'; mockup.style.border = '10px solid black'; usernameEl.classList.add('text-black', 'uppercase', 'font-black'); }
            else if (currentTheme === 'love-hearts') { mockup.style.backgroundColor = "#ffe4e6"; mockup.style.backgroundImage = "url('https://www.transparenttextures.com/patterns/heart.png')"; usernameEl.classList.add('text-rose-600'); }
            else if (currentTheme === 'waves') { mockup.style.backgroundColor = "#06b6d4"; mockup.style.backgroundImage = "url('https://www.transparenttextures.com/patterns/waves.png')"; usernameEl.classList.add('text-white'); }
            else if (currentTheme === 'space') { mockup.style.backgroundImage = "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=800&q=80')"; mockup.style.backgroundSize = "cover"; usernameEl.classList.add('text-white'); }
            else if (currentTheme === 'retro') { mockup.style.background = "linear-gradient(180deg, #f97316 0%, #ef4444 50%, #a855f7 100%)"; usernameEl.classList.add('text-white'); }
            else if (currentTheme === 'cyber') { mockup.style.backgroundColor = 'black'; mockup.style.backgroundImage = "radial-gradient(circle,rgba(6,182,212,0.1) 1px,transparent 1px)"; mockup.style.backgroundSize = "20px 20px"; usernameEl.classList.add('text-cyan-400', 'uppercase', 'tracking-widest'); }
            else if (currentTheme === 'dots') { mockup.style.backgroundColor = "white"; mockup.style.backgroundImage = "radial-gradient(#6366f1 2px, transparent 0)"; mockup.style.backgroundSize = "30px 30px"; usernameEl.classList.add('text-indigo-600'); }
            else if (currentTheme === 'lava') { mockup.style.backgroundImage = "linear-gradient(180deg, #f43f5e 0%, #fb923c 100%)"; usernameEl.classList.add('text-white'); }
            else if (currentTheme === 'midnight') { mockup.style.backgroundColor = "#020617"; usernameEl.classList.add('text-slate-400'); }
            else if (currentTheme === 'lavender') { mockup.style.backgroundColor = "#faf5ff"; usernameEl.classList.add('text-purple-600'); }
            else if (currentTheme === 'sky') { mockup.style.backgroundImage = "url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=800&q=80')"; mockup.style.backgroundSize = "cover"; usernameEl.classList.add('text-sky-900'); }
            else if (currentTheme === 'graffiti') { mockup.style.backgroundImage = "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80')"; mockup.style.backgroundSize = "cover"; usernameEl.classList.add('text-white', 'italic'); }
            else if (currentTheme === 'soft') { mockup.style.backgroundColor = '#f3f4f6'; usernameEl.classList.add('text-blue-500'); }
            
            // Default fallback
            if (!mockup.style.backgroundColor && !mockup.style.backgroundImage) {
                mockup.style.backgroundColor = 'white';
            }
        }

        const platforms = [
            { id: 'instagram', name: 'Instagram', color: 'bg-pink-100', icon: 'instagram', iconColor: 'text-pink-500' },
            { id: 'whatsapp', name: 'WhatsApp', color: 'bg-green-100', icon: 'phone', iconColor: 'text-green-500' },
            { id: 'tiktok', name: 'TikTok', color: 'bg-black', icon: 'music', iconColor: 'text-white' },
            { id: 'youtube', name: 'YouTube', color: 'bg-red-100', icon: 'youtube', iconColor: 'text-red-500' },
            { id: 'website', name: 'Website', color: 'bg-blue-100', icon: 'globe', iconColor: 'text-blue-500' },
            { id: 'spotify', name: 'Spotify', color: 'bg-green-50', icon: 'music', iconColor: 'text-green-600' },
            { id: 'x', name: 'X', color: 'bg-gray-200', icon: 'twitter', iconColor: 'text-black' }
        ];

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
                if (el.id === 'sidebar-avatar') {
                    el.nextElementSibling?.classList.add('hidden');
                    el.classList.add('w-10', 'h-10');
                }
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

window.triggerAvatarUpload = function() {
    avatarUploadInput.click();
};

window.handleFileSelect = function(event) {
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
};

window.closeCropper = function() {
    cropperModal.classList.add('hidden');
    if (cropper) cropper.destroy();
    avatarUploadInput.value = '';
};

window.saveCroppedImage = async function() {
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
        window.closeCropper();
        location.reload(); // Refresh to update all instances
    } catch (err) {
        alert(err.message);
        console.error(err);
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = 'Save Changes';
    }
};

window.handleLogout = async function() {
    console.log('Logging out...');
    const client = window.supabaseClient || window.supabase;
    const supabaseRef = 'esngrodyozljdjkfcocp';
    const storageKey = `sb-${supabaseRef}-auth-token`;

    try {
        if (client && client.auth && typeof client.auth.signOut === 'function') {
            await client.auth.signOut();
            console.log('Logged out successfully via client');
        } else {
            console.warn('Supabase client or auth.signOut not found, clearing storage manually');
        }
    } catch (err) {
        console.error('Logout error during signOut:', err);
    } finally {
        // Force manual cleanup as safety measure
        localStorage.removeItem(storageKey);
        // Clear anything else that might look like auth
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.includes('supabase') || key.includes('-auth-token'))) {
                localStorage.removeItem(key);
                i--; // adjust index after removal
            }
        }
        
        console.log('Final redirection to home');
        window.location.href = 'index.html';
    }
};
