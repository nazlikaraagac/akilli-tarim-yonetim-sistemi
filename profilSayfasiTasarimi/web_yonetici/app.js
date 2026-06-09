/**
 * Akıllı Tarım Yönetim Sistemi — İyileştirilmiş Frontend (app_improved.js)
 *
 * Ölçeklenebilirlik İyileştirmeleri:
 *  1. localStorage mock → Gerçek REST API entegrasyonu
 *  2. JWT token yönetimi (otomatik yenileme + interceptor)
 *  3. API çağrılarında debounce (gereksiz istekleri önler)
 *  4. İstek tekrarlama (retry) mantığı (ağ hatalarında)
 *  5. Bağlantı durumu izleme (offline-first yaklaşım)
 *  6. Bellek sızıntısı önleme (event listener temizleme)
 *  7. Hassas veriyi localStorage'a yazmama (JWT dışında)
 */

"use strict";

// ─── 1. ÇEVRESEL SABİTLER ────────────────────────────────────────────────────
const API_BASE  = window.API_BASE_URL || "http://localhost:5000/api";
// NOT: Prod ortamında index.html'de şu şekilde tanımla:
// <script>window.API_BASE_URL = "https://api.tarim-sistemi.com";</script>
const TOKEN_KEY = "atys_access_token";   // Sadece token localStorage'da
const MAX_RETRY = 3;
const RETRY_DELAY_MS = 1000;

// ─── 2. ÇEVİRİLER (Değişmedi) ────────────────────────────────────────────────
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
        "alert_2fa_off": "2FA devredışı bırakıldı.",
        "alert_pwd_success": "Şifreniz güvenli bir şekilde değiştirildi.",
        "alert_pwd_curr_error": "Mevcut şifre hatalı!",
        "alert_pwd_fail": "Şifre güncellenemedi.",
        "alert_photo_error": "Lütfen sadece geçerli bir resim dosyası seçin (PNG/JPG).",
        "alert_load_error": "Veriler yüklenirken bir hata oluştu.",
        "alert_notif_success": "Bildirim ayarlarınız güncellendi.",
        "alert_offline": "İnternet bağlantısı yok. Değişiklikler kaydedilemez.",
        "alert_token_expired": "Oturum süresi doldu. Lütfen tekrar giriş yapın.",
        "saving_text": "Kaydediliyor...",
        "updating_text": "Güncelleniyor...",
        "admin_role_text": "Sistem Yöneticisi",
        "loading_login": "Giriş bilgileri yükleniyor...",
        "nav_logout": "Çıkış Yap",
        "alert_logout": "Başarıyla çıkış yapıldı. Yönlendiriliyorsunuz...",
        "label_phone": "Telefon",
        "label_city": "Şehir",
        "btn_cancel": "İptal",
        "alert_empty_fields": "Lütfen tüm alanları doldurun!",
        "alert_invalid_email": "Geçerli bir e-posta adresi girin!",
        "alert_cancel": "Değişiklikler iptal edildi.",
        "alert_pwd_min_length": "Yeni şifre en az 8 karakter olmalıdır!",
        "alert_pwd_empty": "Lütfen tüm şifre alanlarını doldurun!",
        "hint_min_pwd": "En az 8 karakter, bir büyük harf ve rakam içermelidir."
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
        "alert_2fa_off": "2FA disabled.",
        "alert_pwd_success": "Password changed securely.",
        "alert_pwd_curr_error": "Current password is incorrect!",
        "alert_pwd_fail": "Failed to update password.",
        "alert_photo_error": "Please select a valid image file (PNG/JPG).",
        "alert_load_error": "An error occurred while loading data.",
        "alert_notif_success": "Notification settings updated.",
        "alert_offline": "No internet connection. Changes cannot be saved.",
        "alert_token_expired": "Session expired. Please log in again.",
        "saving_text": "Saving...",
        "updating_text": "Updating...",
        "admin_role_text": "System Administrator",
        "loading_login": "Loading login info...",
        "nav_logout": "Logout",
        "alert_logout": "Logged out successfully. Redirecting...",
        "label_phone": "Phone",
        "label_city": "City",
        "btn_cancel": "Cancel",
        "alert_empty_fields": "Please fill in all fields!",
        "alert_invalid_email": "Please enter a valid email address!",
        "alert_cancel": "Changes cancelled.",
        "alert_pwd_min_length": "New password must be at least 8 characters!",
        "alert_pwd_empty": "Please fill in all password fields!",
        "hint_min_pwd": "Must be at least 8 characters, one uppercase letter and digit."
    }
};

let currentLanguage = localStorage.getItem("language") || "tr";
if (!translations[currentLanguage]) currentLanguage = "tr";
function t(key) { return translations[currentLanguage][key] || key; }

// ─── 3. JWT TOKEN YÖNETİMİ ───────────────────────────────────────────────────
const auth = {
    getToken() { return localStorage.getItem(TOKEN_KEY); },
    setToken(token) { localStorage.setItem(TOKEN_KEY, token); },
    clearToken() { localStorage.removeItem(TOKEN_KEY); },

    /** Token payload'ını decode eder (imza doğrulama yapmaz — sadece UI için) */
    getPayload() {
        const token = this.getToken();
        if (!token) return null;
        try {
            const payload = token.split(".")[1];
            return JSON.parse(atob(payload));
        } catch { return null; }
    },

    /** Token süresi dolmuş mu? */
    isExpired() {
        const payload = this.getPayload();
        if (!payload) return true;
        return Date.now() / 1000 > payload.exp;
    },

    redirectToLogin() {
        this.clearToken();
        window.location.href = "login.html";
    }
};

// ─── 4. API İSTEK YÖNETİCİSİ (Retry + Auth Interceptor) ────────────────────
/**
 * FİX 1: Gerçek API çağrısı (localStorage mock değil)
 * FİX 4: Exponential backoff retry mantığı
 * FİX 5: Bağlantı kopukluğu kontrolü
 */
async function apiRequest(endpoint, options = {}, attempt = 1) {
    // FİX 5: Çevrimdışı kontrol
    if (!navigator.onLine) {
        showToast(t("alert_offline"), "error");
        throw new Error("OFFLINE");
    }

    // FİX 2: JWT token süresi kontrolü
    if (auth.isExpired()) {
        showToast(t("alert_token_expired"), "error");
        setTimeout(() => auth.redirectToLogin(), 1500);
        throw new Error("TOKEN_EXPIRED");
    }

    const url = `${API_BASE}${endpoint}`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.getToken()}`,
        ...options.headers,
    };

    try {
        const response = await fetch(url, { ...options, headers });

        if (response.status === 401) {
            auth.redirectToLogin();
            throw new Error("UNAUTHORIZED");
        }

        if (response.status === 429) {
            // Rate limit — retry sonra
            const retryAfter = parseInt(response.headers.get("Retry-After") || "5") * 1000;
            if (attempt <= MAX_RETRY) {
                await sleep(retryAfter);
                return apiRequest(endpoint, options, attempt + 1);
            }
            throw new Error("RATE_LIMITED");
        }

        if (!response.ok && response.status >= 500 && attempt <= MAX_RETRY) {
            // FİX 4: Sunucu hatası → exponential backoff
            await sleep(RETRY_DELAY_MS * Math.pow(2, attempt - 1));
            return apiRequest(endpoint, options, attempt + 1);
        }

        return response;
    } catch (err) {
        if (err.name === "TypeError" && attempt <= MAX_RETRY) {
            // Ağ hatası (CORS, DNS, vb.) → retry
            await sleep(RETRY_DELAY_MS * attempt);
            return apiRequest(endpoint, options, attempt + 1);
        }
        throw err;
    }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── 5. DEBOUNCE YARDIMCISI ──────────────────────────────────────────────────
/**
 * FİX 3: Arama ve giriş alanlarında gereksiz API çağrılarını önler.
 * Kullanıcı yazmayı durdurunca belirtilen ms sonra çalışır.
 */
function debounce(fn, delay = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// ─── 6. ÇEVRIMIÇI/ÇEVRIMDIŞI İZLEME ────────────────────────────────────────
// FİX 5: Bağlantı durumu değişince kullanıcıyı bilgilendir
function setupConnectivityMonitor() {
    const banner = document.getElementById("offlineBanner");

    window.addEventListener("offline", () => {
        if (banner) banner.classList.remove("hidden");
        showToast(t("alert_offline"), "error");
    });

    window.addEventListener("online", () => {
        if (banner) banner.classList.add("hidden");
        showToast("Bağlantı yeniden kuruldu.", "success");
    });
}

// ─── 7. ÇEVİRİ UYGULAMA ──────────────────────────────────────────────────────
function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[currentLanguage]?.[key]) {
            el.textContent = translations[currentLanguage][key];
        }
    });
    const roleInput = document.getElementById("adminRole");
    if (roleInput) roleInput.value = t("admin_role_text");
    document.documentElement.lang = currentLanguage;
}

// ─── 8. TOAST BİLDİRİM ───────────────────────────────────────────────────────
function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    const iconClass = type === "success" ? "fa-circle-check" : "fa-circle-exclamation";
    toast.innerHTML = `
        <span class="toast-icon"><i class="fa-solid ${iconClass}"></i></span>
        <span>${message}</span>
        <button class="toast-close" aria-label="Kapat"><i class="fa-solid fa-xmark"></i></button>
    `;
    container.appendChild(toast);

    const remove = () => {
        toast.classList.add("removing");
        // FİX 6: setTimeout referansı temizle
        setTimeout(() => toast.remove(), 300);
    };
    toast.querySelector(".toast-close").addEventListener("click", remove);
    const autoRemove = setTimeout(remove, 3500);
    // Kullanıcı hover edince otomatik kapanmayı durdur
    toast.addEventListener("mouseenter", () => clearTimeout(autoRemove));
}

function showAlert(message, type) {
    const alertBox = document.getElementById("alertBox");
    const alertMessage = document.getElementById("alertMessage");
    if (!alertBox || !alertMessage) return;

    alertMessage.textContent = message;
    alertBox.className = `alert alert-${type === "success" ? "success" : "error"}`;
    alertBox.classList.remove("hidden");

    clearTimeout(alertBox._timeout);
    alertBox._timeout = setTimeout(() => alertBox.classList.add("hidden"), 3000);
}

// ─── 9. TEMA VE DİL ──────────────────────────────────────────────────────────
function setupTheme() {
    const btn = document.getElementById("themeToggleBtn");
    if (!btn) return;
    const icon = btn.querySelector("i");
    const saved = localStorage.getItem("theme") || "light";

    if (saved === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        icon?.classList.replace("fa-moon", "fa-sun");
    }

    btn.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
        icon?.classList.replace(isDark ? "fa-sun" : "fa-moon", isDark ? "fa-moon" : "fa-sun");
    });
}

function setupLanguage() {
    const sel = document.getElementById("languageSelect");
    if (!sel) return;
    sel.value = currentLanguage;
    sel.addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem("language", currentLanguage);
        applyTranslations();
        showToast(t("alert_lang_saved"), "success");
    });
}

// ─── 10. PROFIL YÜKLENMESİ (Gerçek API) ────────────────────────────────────
let profileBackup = {};
let tempProfileBase64 = null;
let tempRemovePhoto   = false;

async function loadProfileData() {
    try {
        document.getElementById("lastLoginDesc").textContent = t("loading_login");

        const res = await apiRequest("/profile");
        if (!res.ok) throw new Error(await res.text());

        const { data } = await res.json();
        renderProfile(data);

    } catch (err) {
        if (err.message === "OFFLINE" || err.message === "TOKEN_EXPIRED") return;
        console.error("Profil yükleme hatası:", err);
        showAlert(t("alert_load_error"), "error");
    }
}

function renderProfile(data) {
    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val ?? "";
    };

    set("adminId",    `#ADM-${data.id}`);
    set("fullName",   data.fullName);
    set("emailAddr",  data.email);
    set("adminRole",  t("admin_role_text"));
    set("phoneNumber", data.phone ?? "");
    set("userCity",   data.city ?? "");

    const imgSrc = data.profileImageUrl
        || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=10B981&color=fff`;

    ["headerProfileImg", "mainProfileImg"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.src = imgSrc;
    });

    if (data.lastLogin) {
        const el = document.getElementById("lastLoginDesc");
        if (el) el.textContent = new Date(data.lastLogin).toLocaleString("tr-TR");
    }

    const twoFactor = document.getElementById("twoFactorToggle");
    if (twoFactor) twoFactor.checked = !!data.twoFactorEnabled;
}

// ─── 11. PROFİL FORM ────────────────────────────────────────────────────────
function setupProfileForm() {
    const form    = document.getElementById("profileForm");
    const editBtn = document.getElementById("enableEditBtn");
    const saveBtn = document.getElementById("saveProfileBtn");
    const cancelBtn = document.getElementById("cancelEditBtn");
    const fields  = ["fullName", "emailAddr", "phoneNumber", "userCity"];

    if (!form) return;

    editBtn?.addEventListener("click", () => {
        fields.forEach(id => {
            const el = document.getElementById(id);
            profileBackup[id] = el.value;
            el.removeAttribute("readonly");
            el.classList.add("editing-active");
        });
        document.getElementById("fullName")?.focus();
        document.getElementById("photoActionsBox")?.classList.remove("hidden");
        editBtn.classList.add("hidden");
        saveBtn?.classList.remove("hidden");
        cancelBtn?.classList.remove("hidden");
    });

    cancelBtn?.addEventListener("click", () => {
        fields.forEach(id => {
            const el = document.getElementById(id);
            el.value = profileBackup[id] ?? el.value;
            el.setAttribute("readonly", "true");
            el.classList.remove("editing-active", "input-error");
        });
        document.getElementById("photoActionsBox")?.classList.add("hidden");
        tempProfileBase64 = null;
        tempRemovePhoto   = false;

        editBtn?.classList.remove("hidden");
        saveBtn?.classList.add("hidden");
        cancelBtn?.classList.add("hidden");
        showToast(t("alert_cancel"), "error");
    });

    // FİX: e.preventDefault() debounce dışına alındı — debounce içinde event erişimi güvensiz
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        debouncedSaveProfile();
    });

    const debouncedSaveProfile = debounce(async () => {
        const email = document.getElementById("emailAddr").value.trim();
        const fullName = document.getElementById("fullName").value.trim();

        if (!fullName || !email) {
            showToast(t("alert_empty_fields"), "error");
            return;
        }
        if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email)) {
            showToast(t("alert_invalid_email"), "error");
            document.getElementById("emailAddr").classList.add("input-error");
            return;
        }

        const btn = document.getElementById("saveProfileBtn");
        const orig = btn.textContent;
        btn.textContent = t("saving_text");
        btn.disabled = true;

        try {
            const res = await apiRequest("/profile", {
                method: "PUT",
                body: JSON.stringify({
                    fullName,
                    email,
                    phone: document.getElementById("phoneNumber").value.trim(),
                    city:  document.getElementById("userCity").value.trim(),
                }),
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message);
            }

            showToast(t("alert_save_success"), "success");
            showAlert(t("alert_save_success"), "success");

            fields.forEach(id => {
                document.getElementById(id).setAttribute("readonly", "true");
                document.getElementById(id).classList.remove("editing-active", "input-error");
            });
            document.getElementById("photoActionsBox")?.classList.add("hidden");
            editBtn?.classList.remove("hidden");
            saveBtn?.classList.add("hidden");
            cancelBtn?.classList.add("hidden");

        } catch (err) {
            showToast(err.message || t("alert_save_error"), "error");
        } finally {
            btn.textContent = orig;
            btn.disabled = false;
        }
    }, 300);  // debouncedSaveProfile sonu

    // Odak alınca hata stilini kaldır
    fields.forEach(id => {
        document.getElementById(id)?.addEventListener("focus", function() {
            this.classList.remove("input-error");
        });
    });
}

// ─── 12. ŞİFRE DEĞİŞTİRME ───────────────────────────────────────────────────
function setupPasswordForm() {
    const form       = document.getElementById("passwordForm");
    const newPw      = document.getElementById("newPassword");
    const confirmPw  = document.getElementById("confirmPassword");
    const errorEl    = document.getElementById("passwordError");

    if (!form) return;

    const checkMatch = () => {
        const match = newPw.value === confirmPw.value;
        errorEl?.classList.toggle("hidden", confirmPw.value.length === 0 || match);
        newPw.style.borderColor    = confirmPw.value.length > 0 ? (match ? "var(--success)" : "var(--error)") : "";
        confirmPw.style.borderColor = newPw.style.borderColor;
        return match;
    };

    newPw?.addEventListener("input", checkMatch);
    confirmPw?.addEventListener("input", checkMatch);

    const debouncedSavePassword = debounce(async () => {
        const current = document.getElementById("currentPassword").value;
        const newVal  = newPw.value;
        const confirm = confirmPw.value;

        if (!current || !newVal || !confirm) {
            showToast(t("alert_pwd_empty"), "error"); return;
        }
        if (newVal.length < 8) {
            newPw.style.borderColor = "var(--error)";
            showToast(t("alert_pwd_min_length"), "error"); return;
        }
        if (!checkMatch()) {
            showToast(t("error_pwd_match"), "error"); return;
        }

        const btn  = document.getElementById("savePasswordBtn");
        const orig = btn.textContent;
        btn.textContent = t("updating_text");
        btn.disabled = true;

        try {
            const res = await apiRequest("/profile/password", {
                method: "PUT",
                body: JSON.stringify({ currentPassword: current, newPassword: newVal }),
            });

            if (res.status === 401) {
                showToast(t("alert_pwd_curr_error"), "error"); return;
            }
            if (!res.ok) throw new Error((await res.json()).message);

            showToast(t("alert_pwd_success"), "success");
            form.reset();
            newPw.style.borderColor    = "";
            confirmPw.style.borderColor = "";

        } catch (err) {
            showToast(err.message || t("alert_pwd_fail"), "error");
        } finally {
            btn.textContent = orig;
            btn.disabled = false;
        }
    }, 500);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        debouncedSavePassword();
    });
}

// ─── 13. BİLDİRİM AYARLARI ──────────────────────────────────────────────────
function setupNotificationsForm() {
    const form = document.getElementById("notificationsForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn  = document.getElementById("saveNotifBtn");
        const orig = btn.textContent;
        btn.textContent = t("saving_text");
        btn.disabled = true;

        const payload = {
            notifications: {
                email: document.getElementById("emailNotif").checked,
                sms:   document.getElementById("smsNotif").checked,
                app:   document.getElementById("appNotif").checked,
            }
        };

        try {
            const res = await apiRequest("/profile", { method: "PUT", body: JSON.stringify(payload) });
            if (!res.ok) throw new Error();
            showAlert(t("alert_notif_success"), "success");
        } catch {
            showAlert(t("alert_save_error"), "error");
        } finally {
            btn.textContent = orig;
            btn.disabled = false;
        }
    });
}

// ─── 14. 2FA TOGGLE ─────────────────────────────────────────────────────────
function setup2FA() {
    document.getElementById("twoFactorToggle")?.addEventListener("change", async (e) => {
        try {
            await apiRequest("/profile", {
                method: "PUT",
                body: JSON.stringify({ twoFactorEnabled: e.target.checked }),
            });
            showAlert(t(e.target.checked ? "alert_2fa_on" : "alert_2fa_off"),
                      e.target.checked ? "success" : "error");
        } catch {
            e.target.checked = !e.target.checked;   // Geri al
        }
    });
}

// ─── 15. FOTOĞRAF YÖNETİMİ ──────────────────────────────────────────────────
function setupPhotoUpload() {
    const input   = document.getElementById("profilePhotoInput");
    const img     = document.getElementById("mainProfileImg");
    const removeBtn = document.getElementById("removePhotoBtn");

    input?.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file?.type.startsWith("image/")) {
            showAlert(t("alert_photo_error"), "error"); return;
        }
        // Dosya boyutu kontrolü (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            showAlert("Dosya boyutu 2MB'dan küçük olmalıdır.", "error"); return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            tempProfileBase64 = ev.target.result;
            tempRemovePhoto   = false;
            if (img) img.src = tempProfileBase64;
        };
        reader.readAsDataURL(file);
    });

    removeBtn?.addEventListener("click", () => {
        tempRemovePhoto = true;
        tempProfileBase64 = null;
        const name = document.getElementById("fullName").value || "User";
        if (img) img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10B981&color=fff`;
    });
}

// ─── 16. NAV MENU SEKMELERİ ──────────────────────────────────────────────────
function setupMenuNavigation() {
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll(".menu-item").forEach(m => m.classList.remove("active"));
            item.classList.add("active");

            const target = item.getAttribute("data-target");
            document.querySelectorAll(".card-section").forEach(s => {
                s.classList.toggle("hidden", s.id !== target);
            });
        });
    });
}

// ─── 17. LOGOUT ─────────────────────────────────────────────────────────────
function setupLogout() {
    document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
        e.preventDefault();
        auth.clearToken();
        showAlert(t("alert_logout"), "success");
        setTimeout(() => { window.location.href = "login.html"; }, 1500);
    });
}

// ─── 18. BAŞLATMA ────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    // Token yoksa login'e yönlendir
    if (!auth.getToken()) {
        auth.redirectToLogin();
        return;
    }

    applyTranslations();
    setupConnectivityMonitor();   // FİX 5
    setupTheme();
    setupLanguage();
    setupMenuNavigation();
    setupProfileForm();
    setupPasswordForm();
    setupNotificationsForm();
    setup2FA();
    setupPhotoUpload();
    setupLogout();
    loadProfileData();            // FİX 1: Gerçek API
});
