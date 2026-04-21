const translations = {
    'tr': {
        "head_title": "Yönetici Profili",
        "nav_title": "Yönetim Paneli",
        "nav_profile": "Yönetici Profili",
        "page_title": "Hesap Ayarları",
        "menu_profile": "Profil Bilgileri",
        "menu_security": "Güvenlik",
        "menu_notifications": "Bildirim Ayarları",
        "card_profile_title": "Kişisel Bilgiler",
        "card_profile_desc": "Sistem üzerindeki yönetici bilgilerinizi güncelleyin.",
        "btn_change_photo": "Fotoğraf Değiştir",
        "btn_remove_photo": "Kaldır",
        "label_username": "Kullanıcı Adı",
        "label_admin_id": "Yönetici ID",
        "label_email": "E-posta Adresi",
        "label_role": "Yönetici Rolü",
        "btn_edit_profile": "Profili Düzenle",
        "btn_save_changes": "Değişiklikleri Kaydet",
        "card_notif_title": "Bildirim Ayarları",
        "card_notif_desc": "Sistem içi ve e-posta bildirim tercihlerinizi yönetin.",
        "label_notif_email": "Sistem güncellemelerini e-posta ile al",
        "label_notif_sms": "Acil uyarılarda SMS gönder (Sadece yöneticiler)",
        "label_notif_app": "Tarayıcı bildirimlerine izin ver",
        "btn_save_settings": "Ayarları Kaydet",
        "card_sec_title": "Güvenlik Ayarları",
        "card_sec_desc": "Hesap güvenliğinizi en üst düzeye çıkarmak için 2FA ve şifre ayarlarınızı yönetin.",
        "sec_2fa_title": "İki Aşamalı Doğrulama (2FA)",
        "sec_2fa_desc": "Giriş yaparken telefonunuza ek kod gönderilir. (Önerilir)",
        "sec_lastlogin_title": "Son Giriş Etkinliği",
        "sec_badge_device": "Şu anki Cihaz",
        "sec_pwd_update": "Şifre Güncelle",
        "label_current_pwd": "Mevcut Şifre",
        "label_new_pwd": "Yeni Şifre",
        "label_confirm_pwd": "Yeni Şifre (Tekrar)",
        "error_pwd_match": "Şifreler eşleşmiyor!",
        "btn_update_pwd": "Şifreyi Güncelle",
        "alert_save_success": "Profil bilgileriniz başarıyla güncellendi.",
        "alert_save_error": "Güncelleme başarısız oldu.",
        "alert_lang_saved": "Dil tercihi kaydedildi.",
        "alert_2fa_on": "2FA aktif edildi. Hesap güvenliğiniz arttı.",
        "alert_2fa_off": "2FA devredışı bırakıldı. Hesabınız riske daha açık duruma geldi.",
        "alert_pwd_success": "Şifreniz güvenli bir şekilde değiştirildi.",
        "alert_pwd_curr_error": "Mevcut şifre hatalı!",
        "alert_pwd_fail": "Şifre güncellenemedi. Mevcut şifrenizi kontrol edin.",
        "alert_photo_error": "Lütfen sadece geçerli bir resim dosyası seçin (PNG/JPG vs.)",
        "alert_load_error": "Veriler yüklenirken bir hata oluştu.",
        "alert_notif_success": "Bildirim ayarlarınız güncellendi.",
        "saving_text": "Kaydediliyor...",
        "updating_text": "Güncelleniyor...",
        "admin_role_text": "Sistem Yöneticisi",
        "loading_login": "Giriş bilgileri yükleniyor...",
        "nav_logout": "Çıkış Yap",
        "alert_logout": "Başarıyla çıkış yapıldı. Yönlendiriliyorsunuz..."
    },
    'en': {
        "head_title": "Admin Profile",
        "nav_title": "Admin Panel",
        "nav_profile": "Admin Profile",
        "page_title": "Account Settings",
        "menu_profile": "Profile Info",
        "menu_security": "Security",
        "menu_notifications": "Notifications",
        "card_profile_title": "Personal Information",
        "card_profile_desc": "Update your administrator details on the system.",
        "btn_change_photo": "Change Photo",
        "btn_remove_photo": "Remove",
        "label_username": "Username",
        "label_admin_id": "Admin ID",
        "label_email": "Email Address",
        "label_role": "Admin Role",
        "btn_edit_profile": "Edit Profile",
        "btn_save_changes": "Save Changes",
        "card_notif_title": "Notification Settings",
        "card_notif_desc": "Manage your in-system and email notification preferences.",
        "label_notif_email": "Receive system updates via email",
        "label_notif_sms": "Send SMS for critical alerts (Admins only)",
        "label_notif_app": "Allow browser notifications",
        "btn_save_settings": "Save Settings",
        "card_sec_title": "Security Settings",
        "card_sec_desc": "Manage 2FA and password settings to maximize account security.",
        "sec_2fa_title": "Two-Factor Authentication (2FA)",
        "sec_2fa_desc": "An additional code is sent to your phone upon login. (Recommended)",
        "sec_lastlogin_title": "Last Login Activity",
        "sec_badge_device": "Current Device",
        "sec_pwd_update": "Update Password",
        "label_current_pwd": "Current Password",
        "label_new_pwd": "New Password",
        "label_confirm_pwd": "New Password (Confirm)",
        "error_pwd_match": "Passwords do not match!",
        "btn_update_pwd": "Update Password",
        "alert_save_success": "Your details have been updated successfully.",
        "alert_save_error": "Update failed.",
        "alert_lang_saved": "Language preference saved.",
        "alert_2fa_on": "2FA activated. Account security increased.",
        "alert_2fa_off": "2FA disabled. Your account is more vulnerable.",
        "alert_pwd_success": "Password changed securely.",
        "alert_pwd_curr_error": "Current password is incorrect!",
        "alert_pwd_fail": "Failed to update password. Check your current password.",
        "alert_photo_error": "Please select a valid image file (PNG/JPG).",
        "alert_load_error": "An error occurred while loading data.",
        "alert_notif_success": "Notification settings updated.",
        "saving_text": "Saving...",
        "updating_text": "Updating...",
        "admin_role_text": "System Administrator",
        "loading_login": "Loading login info...",
        "nav_logout": "Logout",
        "alert_logout": "Logged out successfully. Redirecting..."
    }
};

let currentLanguage = localStorage.getItem('language') || 'tr';
if (!translations[currentLanguage]) currentLanguage = 'tr';

function t(key) {
    return translations[currentLanguage][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            el.textContent = translations[currentLanguage][key];
        }
    });

    const roleInput = document.getElementById('adminRole');
    if (roleInput) {
        roleInput.value = t('admin_role_text');
    }

    document.documentElement.lang = currentLanguage;
}

document.addEventListener('DOMContentLoaded', () => {

    // İlk açılışta çeviriyi uygula
    applyTranslations();

    // Profil Fotoğrafı için Geçici State
    let tempProfileBase64 = null;
    let tempRemovePhoto = false;

    // --- 1. SEKMELER ARASI GEÇİŞ (TABS) ---
    const menuItems = document.querySelectorAll('.settings-menu-item');
    const formCards = document.querySelectorAll('.form-card');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!item.dataset.target) return;

            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const targetId = item.dataset.target;
            formCards.forEach(card => {
                if (card.id === targetId) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- 2. SAYFA YÜKLENDİĞİNDE VERİ ÇEKME SİMÜLASYONU ---
    const loadProfileData = async () => {
        try {
            document.getElementById('lastLoginDesc').textContent = t('loading_login');

            let savedData = localStorage.getItem('mockProfileData');
            if (!savedData) {
                const defaultData = {
                    id: 101,
                    fullName: 'Miraç Özcan Ağcabay',
                    email: 'mirac@smartagri.com',
                    role: 'Sistem Yöneticisi', // Bu JS ile ekrana çevrilerek yansıtılacak
                    profileImageUrl: 'https://ui-avatars.com/api/?name=Mirac+Ozcan+Agcabay&background=10B981&color=fff',
                    notifications: { email: true, sms: false, app: true },
                    currentPassword: 'password123',
                    twoFactorEnabled: false,
                    lastLogin: new Date().toLocaleString('tr-TR', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })
                };
                localStorage.setItem('mockProfileData', JSON.stringify(defaultData));
                savedData = JSON.stringify(defaultData);
            }

            await new Promise(resolve => setTimeout(resolve, 500));
            const userData = JSON.parse(savedData);

            document.getElementById('adminId').value = "#ADM-" + userData.id;
            document.getElementById('fullName').value = userData.fullName;
            document.getElementById('emailAddr').value = userData.email;
            document.getElementById('adminRole').value = t('admin_role_text');
            
            document.getElementById('mainProfileImg').src = userData.profileImageUrl;
            document.getElementById('headerProfileImg').src = userData.profileImageUrl;

            if (userData.notifications) {
                document.getElementById('emailNotif').checked = userData.notifications.email;
                document.getElementById('smsNotif').checked = userData.notifications.sms;
                document.getElementById('appNotif').checked = userData.notifications.app;
            }

            const twoFactorToggle = document.getElementById('twoFactorToggle');
            if(twoFactorToggle) twoFactorToggle.checked = userData.twoFactorEnabled;

            const lastLoginDesc = document.getElementById('lastLoginDesc');
            if(lastLoginDesc && userData.lastLogin) {
                lastLoginDesc.textContent = `${userData.lastLogin}`; 
            }

            userData.lastLogin = new Date().toLocaleString('tr-TR', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' });
            localStorage.setItem('mockProfileData', JSON.stringify(userData));

        } catch (error) {
            showAlert(t('alert_load_error'), "error");
        }
    };
    loadProfileData();

    // --- 3. PROFİL BİLGİLERİNİ GÜNCELLEME ---
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('saveProfileBtn');
        const originalText = btn.textContent;
        btn.textContent = t('saving_text');
        btn.disabled = true;

        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('emailAddr').value
        };

        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            let savedData = JSON.parse(localStorage.getItem('mockProfileData'));
            savedData.fullName = formData.fullName;
            savedData.email = formData.email;
            
            if (tempRemovePhoto) {
                const newName = formData.fullName.replace(/ /g, '+');
                savedData.profileImageUrl = `https://ui-avatars.com/api/?name=${newName}&background=10B981&color=fff`;
            } else if (tempProfileBase64) {
                savedData.profileImageUrl = tempProfileBase64;
            } else if (savedData.profileImageUrl && savedData.profileImageUrl.includes('ui-avatars')) {
                const newName = formData.fullName.replace(/ /g, '+');
                savedData.profileImageUrl = `https://ui-avatars.com/api/?name=${newName}&background=10B981&color=fff`;
            }
            
            localStorage.setItem('mockProfileData', JSON.stringify(savedData));

            tempProfileBase64 = null;
            tempRemovePhoto = false;

            showAlert(t('alert_save_success'), "success");
            
            document.getElementById('headerProfileImg').src = savedData.profileImageUrl;
            document.getElementById('mainProfileImg').src = savedData.profileImageUrl;

            const photoActionsBox = document.getElementById('photoActionsBox');
            if (photoActionsBox) photoActionsBox.classList.add('hidden');
            
            document.getElementById('fullName').setAttribute('readonly', 'true');
            document.getElementById('emailAddr').setAttribute('readonly', 'true');
            document.getElementById('enableEditBtn').classList.remove('hidden');
            document.getElementById('saveProfileBtn').classList.add('hidden');

        } catch (error) {
            showAlert(t('alert_save_error'), "error");
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });

    const enableEditBtn = document.getElementById('enableEditBtn');
    const fullNameInput = document.getElementById('fullName');
    const emailAddrInput = document.getElementById('emailAddr');
    const saveProfileBtn = document.getElementById('saveProfileBtn');

    if (enableEditBtn) {
        enableEditBtn.addEventListener('click', () => {
            fullNameInput.removeAttribute('readonly');
            emailAddrInput.removeAttribute('readonly');
            fullNameInput.focus();
            
            const photoActionsBox = document.getElementById('photoActionsBox');
            if (photoActionsBox) photoActionsBox.classList.remove('hidden');

            enableEditBtn.classList.add('hidden');
            saveProfileBtn.classList.remove('hidden');
        });
    }

    // --- 4. ŞİFRE DEĞİŞTİRME MANTIĞI ---
    const passwordForm = document.getElementById('passwordForm');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordError = document.getElementById('passwordError');

    const checkPasswords = () => {
        if (confirmPassword.value.length > 0) {
            if (newPassword.value !== confirmPassword.value) {
                passwordError.classList.remove('hidden');
                newPassword.style.borderColor = 'var(--error)';
                confirmPassword.style.borderColor = 'var(--error)';
                return false;
            } else {
                passwordError.classList.add('hidden');
                newPassword.style.borderColor = 'var(--success)';
                confirmPassword.style.borderColor = 'var(--success)';
                return true;
            }
        }
        return false;
    };

    newPassword.addEventListener('input', checkPasswords);
    confirmPassword.addEventListener('input', checkPasswords);

    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (newPassword.value !== confirmPassword.value) {
            checkPasswords();
            return;
        }

        const btn = document.getElementById('savePasswordBtn');
        const originalText = btn.textContent;
        btn.textContent = t('updating_text');
        btn.disabled = true;

        const passwordData = {
            currentPassword: document.getElementById('currentPassword').value,
            newPassword: newPassword.value
        };

        try {
            let savedData = JSON.parse(localStorage.getItem('mockProfileData'));
            const currentStoredPassword = savedData.currentPassword || 'password123';
            
            if (passwordData.currentPassword !== currentStoredPassword) {
                 showAlert(t('alert_pwd_curr_error'), "error");
                 btn.textContent = originalText;
                 btn.disabled = false;
                 return;
            }

            await new Promise(resolve => setTimeout(resolve, 800));

            savedData.currentPassword = passwordData.newPassword;
            localStorage.setItem('mockProfileData', JSON.stringify(savedData));

            showAlert(t('alert_pwd_success'), "success");
            
            passwordForm.reset();
            newPassword.style.borderColor = '';
            confirmPassword.style.borderColor = '';

        } catch (error) {
            showAlert(t('alert_pwd_fail'), "error");
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });

    // --- 5. BİLDİRİM AYARLARI ---
    const notificationsForm = document.getElementById('notificationsForm');
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('saveNotifBtn');
            const originalText = btn.textContent;
            btn.textContent = t('saving_text');
            btn.disabled = true;

            await new Promise(resolve => setTimeout(resolve, 600));

            let savedData = JSON.parse(localStorage.getItem('mockProfileData'));
            savedData.notifications = {
                email: document.getElementById('emailNotif').checked,
                sms: document.getElementById('smsNotif').checked,
                app: document.getElementById('appNotif').checked
            };
            localStorage.setItem('mockProfileData', JSON.stringify(savedData));

            showAlert(t('alert_notif_success'), "success");
            btn.textContent = originalText;
            btn.disabled = false;
        });
    }

    // --- YARDIMCI FONKSİYONLAR ---
    const alertBox = document.getElementById('alertBox');
    const alertMessage = document.getElementById('alertMessage');
    let alertTimeout;

    function showAlert(message, type) {
        clearTimeout(alertTimeout);
        alertMessage.textContent = message;
        
        alertBox.className = 'alert';
        if (type === "success") {
            alertBox.classList.add('alert-success');
        } else {
            alertBox.classList.add('alert-error');
        }

        alertBox.classList.remove('hidden');

        alertTimeout = setTimeout(() => {
            alertBox.classList.add('hidden');
        }, 3000);
    }

    // --- TEMA GEÇİŞİ ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        let currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            const root = document.documentElement;
            if (root.getAttribute('data-theme') === 'dark') {
                root.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            } else {
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    }

    // --- 2FA TOGGLE ---
    const twoFactorToggle = document.getElementById('twoFactorToggle');
    if (twoFactorToggle) {
        twoFactorToggle.addEventListener('change', (e) => {
            let savedData = JSON.parse(localStorage.getItem('mockProfileData'));
            savedData.twoFactorEnabled = e.target.checked;
            localStorage.setItem('mockProfileData', JSON.stringify(savedData));
            
            if(e.target.checked) {
                showAlert(t('alert_2fa_on'), "success");
            } else {
                showAlert(t('alert_2fa_off'), "error");
            }
        });
    }

    // --- PROFİL FOTOĞRAFI ---
    const profilePhotoInput = document.getElementById('profilePhotoInput');
    const mainProfileImg = document.getElementById('mainProfileImg');
    const removePhotoBtn = document.getElementById('removePhotoBtn');

    if (profilePhotoInput && mainProfileImg) {
        profilePhotoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (!file.type.startsWith('image/')) {
                    showAlert(t('alert_photo_error'), "error");
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(event) {
                    tempProfileBase64 = event.target.result;
                    tempRemovePhoto = false; 
                    mainProfileImg.src = tempProfileBase64;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (removePhotoBtn && mainProfileImg) {
        removePhotoBtn.addEventListener('click', () => {
            tempRemovePhoto = true;
            tempProfileBase64 = null;
            
            const currentName = document.getElementById('fullName').value || 'User';
            const newName = currentName.replace(/ /g, '+');
            mainProfileImg.src = `https://ui-avatars.com/api/?name=${newName}&background=10B981&color=fff`;
        });
    }

    // --- DİL SEÇİMİ EVENT ---
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;

        languageSelect.addEventListener('change', (e) => {
            const newLang = e.target.value;
            localStorage.setItem('language', newLang);
            currentLanguage = newLang;
            applyTranslations();
            showAlert(t('alert_lang_saved'), "success");
        });
    }

    // --- ÇIKIŞ YAP (LOGOUT) ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAlert(t('alert_logout'), "success");
            setTimeout(() => {
                // window.location.href = 'login.html'; // Gerçekte giriş sayfasına yönlendirilir
                console.log("Logged out.");
            }, 1500);
        });
    }

});
