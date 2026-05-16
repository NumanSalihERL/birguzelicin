//supabase
const URL_D = 'https://oynrhmluzjwncbjaiplr.supabase.co';
const KEY_D = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bnJobWx1emp3bmNiamFpcGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MDEzMTksImV4cCI6MjA5NDI3NzMxOX0.rPsCn5OFSCnhwI24fteVnxbVHJyLw-7xTTLpKh3B-KI';
const _supabase = supabase.createClient(URL_D, KEY_D);

const baslangic = new Date(2024, 9, 4, 20, 20, 20); 

function sayaciGuncelle() {
    const simdi = new Date();
    const fark = simdi - baslangic;

    const gun = Math.floor(fark / (1000 * 60 * 60 * 24));
    const saat = Math.floor((fark / (1000 * 60 * 60)) % 24);
    const dakika = Math.floor((fark / 1000 / 60) % 60);
    const saniye = Math.floor((fark / 1000) % 60);

    const sayacDiv = document.getElementById('love-counter');
    if (sayacDiv) {
        sayacDiv.innerText = `${gun} Gün, ${saat} Saat, ${dakika} Dakika, ${saniye} Saniye`;
    }
}



async function siirleriYukle() {
    const { data: siirler, error } = await _supabase.from('siirler').select('*');
    
    const listeDiv = document.getElementById('siir-listesi');
    if (listeDiv && siirler) {

        listeDiv.innerHTML = siirler.map(s => `
            <li>
                <a href="javascript:void(0)" class="poem-link" onclick="siirGoster('${s.baslik}', \`${s.icerik}\`)">
                    ${s.baslik.toUpperCase()}
                </a>
            </li>
        `).join('');
    }
}

/*function siirGoster(baslik, icerik) {
    const icerikAlani = document.getElementById('secili-siir');
    if (icerikAlani) {
        icerikAlani.innerHTML = `
            <h2>${baslik}</h2>
            <div class="poem-content">${icerik.replace(/\n/g, '<br>')}</div>
            <button id="surprise-btn" onclick="document.getElementById('secili-siir').innerHTML=''">Kapat</button>
        `;
        icerikAlani.scrollIntoView({ behavior: 'smooth' });
    }
}*/

/*function siirGoster(baslik, icerik) {
    const icerikAlani = document.getElementById('secili-siir');
    if (icerikAlani) {
        icerikAlani.innerHTML = `
            <h2>${baslik}</h2>
            <div class="poem-content">${icerik.replace(/\n/g, '<br>')}</div>
            
            <div style="text-align: center; margin-top: 30px; margin-bottom: 20px;">
                <a href="javascript:void(0)" class="back-button" onclick="siiriKapat()">
                    ← Deftere Dön
                </a>
            </div>
        `;
        icerikAlani.scrollIntoView({ behavior: 'smooth' });
    }
}

function siiriKapat() {
    document.getElementById('secili-siir').innerHTML = '';
    document.getElementById('siir-listesi').scrollIntoView({ behavior: 'smooth' });
}*/

function siirGoster(baslik, icerik) {
    const listeAlani = document.getElementById('siir-listesi');
    const baslikAlani = document.querySelector('h1');
    const altBaslik = document.querySelector('.subtitle') || document.querySelector('p');
    const icerikAlani = document.getElementById('secili-siir');
    
    // --- GİZLEME İŞLEMLERİ ---
    if(listeAlani) listeAlani.style.display = 'none';
    if(baslikAlani) baslikAlani.style.display = 'none';
    if(altBaslik) altBaslik.style.display = 'none';

    // Şiir sayfasındaki o sürpriz butonu ve ana sayfa linkini ID'lerine göre gizliyoruz
    const surprizBtn = document.getElementById('liste-surpriz-btn') || document.getElementById('surprise-btn');
    const anaSayfaLink = document.querySelector('a[href="index.html"]') || document.querySelector('.back-button-home'); 
    
    if(surprizBtn) surprizBtn.style.display = 'none';
    if(anaSayfaLink) anaSayfaLink.style.display = 'none';

    // --- ŞİİRİ BASMA ---
    if (icerikAlani) {
        icerikAlani.innerHTML = `
            <h2 style="color: #d81b60; margin-top: 20px;">${baslik}</h2>
            <div class="poem-content">${icerik.replace(/\n/g, '<br>')}</div>
            
            <div style="text-align: center; margin-top: 40px; margin-bottom: 30px;">
                <a href="javascript:void(0)" class="back-button" onclick="siiriKapat()">
                    ← Deftere Dön
                </a>
            </div>
        `;
        window.scrollTo(0, 0); 
    }
}

function siiriKapat() {
    const listeAlani = document.getElementById('siir-listesi');
    const baslikAlani = document.querySelector('h1');
    const altBaslik = document.querySelector('.subtitle') || document.querySelector('p');
    const icerikAlani = document.getElementById('secili-siir');
    
    // Şiir içeriğini temizle
    if(icerikAlani) icerikAlani.innerHTML = '';

    // --- GERİ GETİRME İŞLEMLERİ ---
    if(listeAlani) listeAlani.style.display = 'flex';
    if(baslikAlani) baslikAlani.style.display = 'block';
    if(altBaslik) altBaslik.style.display = 'block';

    // Gizlediğimiz buton ve linkleri tekrar görünür yapıyoruz
    const surprizBtn = document.getElementById('liste-surpriz-btn') || document.getElementById('surprise-btn');
    const anaSayfaLink = document.querySelector('a[href="index.html"]') || document.querySelector('.back-button-home');

    if(surprizBtn) surprizBtn.style.display = 'inline-block';
    if(anaSayfaLink) anaSayfaLink.style.display = 'inline-block';
}

function surprizMesajiGoster() {
    const mesajKutusu = document.getElementById('hidden-message');
    if (mesajKutusu) {
        mesajKutusu.classList.toggle('hidden');
        
        // Açıldığında oraya kaydır
        if (!mesajKutusu.classList.contains('hidden')) {
            mesajKutusu.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        console.error("Hata: 'hidden-message' ID'li element bulunamadı!");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(sayaciGuncelle, 1000);
    sayaciGuncelle();
    siirleriYukle();
    
    const btn = document.getElementById('surprise-btn');
    if (btn) {
        btn.onclick = surprizMesajiGoster; 
        console.log("Sürpriz buton aktif edildi.");
    }
});

// Gizli paneli açma fonksiyonu
function adminPaneliGoster() {
    const modal = document.getElementById('admin-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Paneli kapatma fonksiyonu
function adminPaneliKapat() {
    const modal = document.getElementById('admin-modal');
    if (modal) {
        modal.style.display = 'none';
        // Temizlik
        document.getElementById('admin-sifre').value = '';
        document.getElementById('yeni-baslik').value = '';
        document.getElementById('yeni-icerik').value = '';
    }
}

// Şiiri direkt Supabase'e kaydeden fonksiyon
async function siirKaydetSupabase() {
    const sifre = document.getElementById('admin-sifre').value;
    const baslik = document.getElementById('yeni-baslik').value;
    const icerik = document.getElementById('yeni-icerik').value;

    // KENDİ ÖZEL ŞİFRENİ BURAYA YAZ (Örn: 1234 veya öğrenci numaran)
    if (sifre !== '040924') { 
        alert('Hatalı şifre kardeşim! Yetkin yok.');
        return;
    }

    if (!baslik || !icerik) {
        alert('Lütfen başlık ve içerik alanını doldur.');
        return;
    }

    try {
        // Supabase'deki 'siirler' tablosuna doğrudan satır ekliyoruz
        // Tablondaki sütun isimlerinin 'baslik' ve 'icerik' olduğundan emin ol
        const { data, error } = await _supabase
            .from('siirler')
            .insert([{ baslik: baslik, icerik: icerik }]);

        if (error) throw error;

        alert('Şiir başarıyla deftere eklendi! ❤️');
        adminPaneliKapat();
        
        // Sayfayı yenilemeden şiir listesini tekrar yükle (Zaten bu fonksiyon sende var)
        if (typeof siirleriYukle === "function") {
            siirleriYukle();
        } else {
            location.reload(); // Yoksa sayfayı yenilesin
        }

    } catch (err) {
        console.error('Supabase yükleme hatası:', err);
        alert('Bir hata oluştu, veritabanına yazılamadı.');
    }
}