// supabase.js — modal de Configuración (mejorado visualmente)
(function(){
  // Estilos modernos para el modal (inyectados)
  const styles = `
  .cfg-backdrop{position:fixed;inset:0;background:linear-gradient(rgba(2,6,23,0.45),rgba(2,6,23,0.45));backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:12000}
  .cfg-card{width:920px;max-width:94%;background:linear-gradient(180deg,#ffffff,#fbfbfd);border-radius:14px;box-shadow:0 20px 50px rgba(2,6,23,0.36);overflow:hidden;display:flex;gap:0;font-family:Inter,system-ui,Segoe UI,Roboto,Arial}
  .cfg-side{width:320px;background:linear-gradient(180deg,#f1f5f9,#eef2ff);padding:28px;display:flex;flex-direction:column;align-items:center;gap:14px}
  .cfg-main{flex:1;padding:24px 28px;display:flex;flex-direction:column}
  .cfg-title{font-size:18px;font-weight:600;color:#06283d}
  .cfg-avatar-wrap{position:relative;width:140px;height:140px;border-radius:999px;overflow:hidden;border:4px solid rgba(255,255,255,0.8);box-shadow:0 6px 18px rgba(3,102,214,0.08)}
  .cfg-avatar{width:100%;height:100%;object-fit:cover;display:block}
  .cfg-avatar-overlay{position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.18), transparent);display:flex;align-items:flex-end;justify-content:center;padding:8px;opacity:0;transition:opacity .18s}
  .cfg-avatar-wrap:hover .cfg-avatar-overlay{opacity:1}
  .cfg-upload-btn{background:rgba(255,255,255,0.92);padding:6px 10px;border-radius:10px;font-size:13px;border:0;cursor:pointer}
  .cfg-hint{font-size:13px;color:#254e6b;text-align:center}
  .cfg-field{margin-bottom:12px}
  .cfg-input{width:100%;padding:10px 12px;border-radius:10px;border:1px solid #dbeafe;background:#fff}
  .cfg-row{display:flex;gap:12px}
  .cfg-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:14px}
  .cfg-btn{padding:10px 14px;border-radius:10px;border:0;cursor:pointer}
  .cfg-btn.primary{background:#0ea5e9;color:#fff}
  .cfg-btn.ghost{background:transparent;border:1px solid #e6edf3;color:#06283d}
  .cfg-small{font-size:13px;color:#475569}
  @media(max-width:760px){ .cfg-card{flex-direction:column;width:92%} .cfg-side{width:100%;flex-direction:row;padding:12px;gap:12px} .cfg-avatar-wrap{width:84px;height:84px} }
  `;

  function injectStyles(){
    if (document.getElementById('cfg-injected-styles')) return;
    const s = document.createElement('style'); s.id = 'cfg-injected-styles'; s.textContent = styles; document.head.appendChild(s);
  }

  function getStoredProfile(){
    try{ const raw = localStorage.getItem('appUserProfile'); return raw? JSON.parse(raw): null;}catch(e){console.warn('parse profile', e); return null}
  }

  function saveStoredProfile(profile){
    try{ localStorage.setItem('appUserProfile', JSON.stringify(profile)); return true;}catch(e){console.error('save profile', e); return false}
  }

  function updateUserUI(profile){
    if (!profile) return;
    const imgEl = document.querySelector('.usuario .usuario-img img');
    if (imgEl && profile.avatar) imgEl.src = profile.avatar;
    if (imgEl && !profile.avatar) imgEl.src = imgEl.getAttribute('data-original') || imgEl.src;
    const nameEl = document.querySelector('.usuario .datos_usuario .name');
    const mailEl = document.querySelector('.usuario .datos_usuario .gmail');
    if (nameEl && profile.name) nameEl.textContent = profile.name;
    if (mailEl && profile.email) mailEl.textContent = profile.email;
  }

  function trySyncToSupabase(profile){
    (async ()=>{
      try{
        const client = window.supabaseClient || null;
        if (!client) return;
        const { data: { session } } = await client.auth.getSession();
        const userId = session?.user?.id;
        if (!userId) return;
        const payload = { id: userId, full_name: profile.name || null, avatar: profile.avatar || null, email: profile.email || null };
        await client.from('profiles').upsert(payload);
        if(window.showToast) window.showToast('Sincronizado con Supabase', 'success', 2000);
      }catch(err){ console.warn('Supabase sync error', err); }
    })();
  }

  function buildModal(existing){
    injectStyles();
    const backdrop = document.createElement('div'); backdrop.className = 'cfg-backdrop';
    const card = document.createElement('div'); card.className = 'cfg-card';

    const left = document.createElement('div'); left.className = 'cfg-side';
    const right = document.createElement('div'); right.className = 'cfg-main';

    left.innerHTML = `
      <div class="cfg-avatar-wrap">
        <img id="cfg-avatar" class="cfg-avatar" src="${existing?.avatar?escapeHtml(existing.avatar):(document.querySelector('.usuario .usuario-img img')?.src || '')}" alt="avatar">
        <div class="cfg-avatar-overlay"><button id="cfg-upload-btn" class="cfg-upload-btn">Cambiar foto</button></div>
      </div>
      <div class="cfg-title">Perfil de usuario</div>
      <div class="cfg-hint">Personaliza tu nombre, correo y foto de perfil. Los cambios se guardan localmente y se intentan sincronizar si estás con sesión.</div>
    `;

    right.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div style="font-weight:600">Ajustes de cuenta</div>
        <div class="cfg-small">ID de cliente local</div>
      </div>
      <div class="cfg-field"><label class="cfg-small">Nombre de usuario</label><input id="cfg-name" class="cfg-input" type="text" value="${existing?.name?escapeHtml(existing.name):''}" placeholder="Tu nombre o alias"></div>
      <div class="cfg-row"><div style="flex:1"><label class="cfg-small">Email</label><input id="cfg-email" class="cfg-input" type="text" value="${existing?.email?escapeHtml(existing.email):''}" placeholder="correo@ejemplo.com"></div>
      <div style="width:120px"><label class="cfg-small">Teléfono</label><input id="cfg-phone" class="cfg-input" type="text" placeholder="(opcional)"></div></div>
      <div style="margin-top:8px"><label class="cfg-small">Bio</label><textarea id="cfg-bio" style="width:100%;min-height:72px;padding:10px;border-radius:10px;border:1px solid #e6eefb" placeholder="Una breve descripción (opcional)"></textarea></div>
      <div class="cfg-actions">
        <button class="cfg-btn ghost" id="cfg-cancel">Cancelar</button>
        <button class="cfg-btn primary" id="cfg-save">Guardar cambios</button>
      </div>
    `;

    card.appendChild(left); card.appendChild(right); backdrop.appendChild(card);

    // crear input file oculto
    const hiddenFile = document.createElement('input'); hiddenFile.type = 'file'; hiddenFile.accept = 'image/*'; hiddenFile.style.display = 'none'; backdrop.appendChild(hiddenFile);

    // eventos
    backdrop.querySelector('#cfg-cancel').addEventListener('click', ()=> backdrop.remove());
    backdrop.querySelector('#cfg-upload-btn').addEventListener('click', ()=> hiddenFile.click());

    const avatarEl = backdrop.querySelector('#cfg-avatar');
    hiddenFile.addEventListener('change', (e)=>{
      const f = e.target.files && e.target.files[0];
      if(!f) return;
      if(f.size > 2_500_000){ alert('La imagen es demasiado grande (>2.5MB). Elige una más pequeña.'); return; }
      const reader = new FileReader();
      reader.onload = function(ev){ avatarEl.src = ev.target.result; };
      reader.readAsDataURL(f);
    });

    backdrop.querySelector('#cfg-save').addEventListener('click', ()=>{
      const name = backdrop.querySelector('#cfg-name').value.trim();
      const email = backdrop.querySelector('#cfg-email').value.trim();
      const bio = backdrop.querySelector('#cfg-bio').value.trim();
      const avatar = avatarEl.src || null;
      const profile = { name: name || null, email: email || null, avatar: avatar || null, bio: bio || null };
      const ok = saveStoredProfile(profile);
      if(!ok){ alert('No se pudo guardar localmente.'); return; }
      updateUserUI(profile);
      trySyncToSupabase(profile);
      backdrop.remove();
      if(window.showToast) window.showToast('Perfil guardado', 'success', 1800);
    });

    // llenar valores opcionales (teléfono) si vienen en el objeto
    if(existing && existing.bio) backdrop.querySelector('#cfg-bio').value = existing.bio;

    document.body.appendChild(backdrop);
    return backdrop;
  }

  function escapeHtml(s){ return (''+s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function attachSettingsHandler(){
    const footerLinks = Array.from(document.querySelectorAll('.sidebar .footer .menu-link'));
    const cfgLink = footerLinks.find(a => a.textContent.toLowerCase().includes('configur'));
    if(cfgLink){
      cfgLink.addEventListener('click', function(e){ e.preventDefault(); const existing = getStoredProfile(); buildModal(existing); });
    } else {
      const userFooter = document.querySelector('.sidebar .footer');
      if(userFooter && !document.getElementById('cfg-floating-btn')){
        const btn = document.createElement('button'); btn.id='cfg-floating-btn'; btn.textContent='Configuración'; btn.title='Configuración';
        btn.style.cssText='margin-left:8px;padding:8px 10px;border-radius:8px;border:0;background:#0ea5e9;color:#fff;cursor:pointer';
        btn.addEventListener('click', ()=>{ const existing = getStoredProfile(); buildModal(existing); });
        const usuario = userFooter.querySelector('.usuario'); if(usuario) usuario.parentElement.insertBefore(btn, usuario.nextSibling);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    try{ const p = getStoredProfile(); if(p) updateUserUI(p); }catch(e){}
    try{ const imgEl = document.querySelector('.usuario .usuario-img img'); if(imgEl && !imgEl.getAttribute('data-original')) imgEl.setAttribute('data-original', imgEl.src); }catch(e){}
    attachSettingsHandler();
    window.openUserSettings = function(){ buildModal(getStoredProfile()); };
  });

})();