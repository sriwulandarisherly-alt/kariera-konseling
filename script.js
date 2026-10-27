// Data hasil kuis
const kategori = {
  tek: { nama: "Teknologi & Sains", jurusan: "Informatika, Sistem Informasi, Teknik", kerja: "Programmer, Data Analyst, Teknisi" },
  kes: { nama: "Kesehatan", jurusan: "Keperawatan, Kebidanan, Kedokteran, Farmasi", kerja: "Perawat, Dokter, Apoteker" },
  bis: { nama: "Bisnis & Ekonomi", jurusan: "Manajemen, Akuntansi, Kewirausahaan", kerja: "Akuntan, Wirausahawan, Staf Keuangan" },
  sos: { nama: "Pendidikan & Sosial", jurusan: "Pendidikan, Psikologi, Bimbingan Konseling", kerja: "Guru, Psikolog, Konselor" },
  krea: { nama: "Seni & Kreatif", jurusan: "DKV, Desain Produk, Film & Animasi", kerja: "Desainer, Animator, Content Creator" }
};
// Tiap jawaban: [teks, kode kategori]
const soal = [
  { q: "Kegiatan apa yang paling kamu suka?", o: [["Utak-atik komputer/HP", "tek"], ["Menolong orang sakit", "kes"], ["Berjualan / mengatur uang", "bis"], ["Mengajar atau mendengarkan teman", "sos"], ["Menggambar / membuat video", "krea"]] },
  { q: "Pelajaran favoritmu?", o: [["Matematika / Informatika", "tek"], ["Biologi", "kes"], ["Ekonomi", "bis"], ["Bahasa / Sosiologi", "sos"], ["Seni Budaya", "krea"]] },
  { q: "Kamu merasa paling kuat di bagian...", o: [["Logika dan analisis", "tek"], ["Ketelitian dan empati", "kes"], ["Negosiasi dan strategi", "bis"], ["Komunikasi", "sos"], ["Imajinasi", "krea"]] },
  { q: "Tempat kerja impianmu?", o: [["Perusahaan teknologi", "tek"], ["Rumah sakit / klinik", "kes"], ["Kantor / usaha sendiri", "bis"], ["Sekolah / lembaga sosial", "sos"], ["Studio kreatif", "krea"]] },
  { q: "Teman biasanya minta tolongmu untuk...", o: [["Memperbaiki laptop/HP", "tek"], ["Memberi P3K", "kes"], ["Mengatur keuangan acara", "bis"], ["Curhat dan minta saran", "sos"], ["Membuat poster/desain", "krea"]] }
];

// Membuat kuis di halaman
const quizBox = document.getElementById("quizBox");
if (quizBox) {
  soal.forEach((s, i) => {
    let h = `<p class="fw-bold mb-1 mt-3">${i + 1}. ${s.q}</p>`;
    s.o.forEach(op => {
      h += `<label class="opt"><input type="radio" name="s${i}" value="${op[1]}"> ${op[0]}</label>`;
    });
    quizBox.innerHTML += h;
  });

  document.getElementById("btnHasil").addEventListener("click", () => {
    const skor = { tek: 0, kes: 0, bis: 0, sos: 0, krea: 0 };
    for (let i = 0; i < soal.length; i++) {
      const pilih = document.querySelector(`input[name="s${i}"]:checked`);
      if (!pilih) {
        document.getElementById("quizMsg").textContent = "Jawab semua pertanyaan dulu ya (soal nomor " + (i + 1) + " belum dijawab).";
        return;
      }
      skor[pilih.value]++;
    }
    document.getElementById("quizMsg").textContent = "";
    const urut = Object.keys(skor).sort((a, b) => skor[b] - skor[a]);
    const k = kategori[urut[0]];
    document.getElementById("quizHasil").innerHTML =
      `<div class="hasil"><h4>Minatmu: ${k.nama}</h4>
       <p class="mb-1"><b>Rekomendasi jurusan:</b> ${k.jurusan}</p>
       <p class="mb-1"><b>Contoh pekerjaan:</b> ${k.kerja}</p>
       <p class="small text-muted">Minat kedua: ${kategori[urut[1]].nama}. Hasil ini hanya eksplorasi awal, diskusikan dengan Guru BK.</p>
       <button class="btn btn-outline-secondary btn-sm" id="btnUlang">Ulangi Kuis</button> <a href="tentang.html#konsultasi" class="btn btn-navy btn-sm">Konsultasikan dengan Guru BK</a></div>`;
    document.getElementById("btnUlang").addEventListener("click", () => {
      document.querySelectorAll("#quiz input").forEach(r => r.checked = false);
      document.getElementById("quizHasil").innerHTML = "";
      document.getElementById("quiz").scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Pencarian pekerjaan
const cari = document.getElementById("cariKerja");
function filterKerja() {
  const kata = cari.value.toLowerCase();
  let ada = 0;
  document.querySelectorAll(".job-item").forEach(el => {
    const cocok = el.textContent.toLowerCase().includes(kata);
    el.style.display = cocok ? "" : "none";
    if (cocok) ada++;
  });
  document.getElementById("kosong").classList.toggle("d-none", ada > 0);
}
if (cari) {
  cari.addEventListener("input", filterKerja);
  const q = new URLSearchParams(location.search).get("q");
  if (q) { cari.value = q; filterKerja(); }
}

// Pencarian dari beranda -> halaman karier
const formCari = document.getElementById("formCari");
if (formCari) {
  formCari.addEventListener("submit", e => {
    e.preventDefault();
    location.href = "karier.html?q=" + encodeURIComponent(document.getElementById("cariHero").value);
  });
}

// Konsultasi ke Guru BK lewat WhatsApp
const btnKirim = document.getElementById("btnKirim");
if (btnKirim) {
  btnKirim.addEventListener("click", () => {
    const nama = document.getElementById("kNama").value.trim();
    const kelas = document.getElementById("kKelas").value.trim();
    const topik = document.getElementById("kTopik").value;
    const pesan = document.getElementById("kPesan").value.trim();
    if (!nama || !pesan) {
      document.getElementById("kMsg").textContent = "Isi nama dan pesan dulu ya.";
      return;
    }
    document.getElementById("kMsg").textContent = "";
    const teks = "Halo Ibu Sherly, saya " + nama + " (" + kelas + "). Topik: " + topik + ". " + pesan;
    window.open("https://wa.me/6281234567890?text=" + encodeURIComponent(teks), "_blank");
  });
}
