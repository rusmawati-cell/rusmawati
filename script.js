/* ===== Data layanan informasi publik ===== */
const dataLayanan = [
    {
      id: 1, ikon: "bi-file-earmark-person", judul: "Layanan Administrasi Kependudukan",
      ringkas: "Informasi pembuatan KTP, Kartu Keluarga, dan akta kelahiran.",
      lengkap: "Layanan ini menyediakan informasi seputar pengurusan dokumen kependudukan, mulai dari KTP elektronik, Kartu Keluarga, akta kelahiran, hingga surat pindah.",
      syarat: ["Fotokopi Kartu Keluarga", "Surat pengantar RT/RW", "Dokumen pendukung sesuai jenis layanan"],
      jam: "Senin - Jumat, 08.00 - 15.00 WITA", lokasi: "Kantor Dinas Kependudukan dan Pencatatan Sipil"
    },
    {
      id: 2, ikon: "bi-hospital", judul: "Layanan Kesehatan Masyarakat",
      ringkas: "Informasi puskesmas, jadwal imunisasi, dan program kesehatan.",
      lengkap: "Berisi informasi fasilitas kesehatan, jadwal imunisasi, posyandu, serta program kesehatan yang dapat diakses oleh seluruh masyarakat.",
      syarat: ["Kartu identitas", "Kartu BPJS Kesehatan (jika ada)", "Buku KIA untuk layanan ibu dan anak"],
      jam: "Senin - Sabtu, 07.30 - 14.00 WITA", lokasi: "Puskesmas terdekat di wilayah Anda"
    },
    {
      id: 3, ikon: "bi-mortarboard", judul: "Layanan Pendidikan",
      ringkas: "Informasi pendaftaran sekolah, beasiswa, dan program belajar.",
      lengkap: "Menyediakan informasi penerimaan peserta didik baru, program beasiswa, bantuan pendidikan, serta kegiatan peningkatan mutu sekolah.",
      syarat: ["Akta kelahiran", "Kartu Keluarga", "Rapor atau ijazah terakhir"],
      jam: "Senin - Jumat, 08.00 - 16.00 WITA", lokasi: "Dinas Pendidikan dan Kebudayaan"
    },
    {
      id: 4, ikon: "bi-briefcase", judul: "Layanan Perizinan Usaha",
      ringkas: "Informasi pengurusan NIB, izin usaha, dan UMKM.",
      lengkap: "Panduan pengurusan Nomor Induk Berusaha (NIB), izin usaha, serta pendampingan bagi pelaku UMKM agar usaha berjalan legal.",
      syarat: ["KTP pemilik usaha", "NPWP", "Alamat dan bidang usaha"],
      jam: "Senin - Jumat, 08.00 - 15.30 WITA", lokasi: "Dinas Penanaman Modal dan PTSP"
    },
    {
      id: 5, ikon: "bi-bus-front", judul: "Layanan Transportasi",
      ringkas: "Informasi rute angkutan umum, perpanjangan SIM, dan uji kendaraan.",
      lengkap: "Memuat informasi rute dan jadwal angkutan umum, prosedur pengujian kendaraan bermotor, serta berbagai layanan terkait lalu lintas.",
      syarat: ["KTP", "STNK atau dokumen kendaraan", "Surat keterangan sehat (untuk SIM)"],
      jam: "Senin - Jumat, 08.00 - 15.00 WITA", lokasi: "Dinas Perhubungan"
    },
    {
      id: 6, ikon: "bi-megaphone", judul: "Pengaduan Masyarakat",
      ringkas: "Informasi cara menyampaikan keluhan dan aspirasi publik.",
      lengkap: "Masyarakat dapat memperoleh informasi tentang alur penyampaian pengaduan, aspirasi, dan saran terkait pelayanan publik beserta tindak lanjutnya.",
      syarat: ["Identitas pelapor", "Uraian singkat pengaduan", "Bukti pendukung (jika ada)"],
      jam: "Senin - Jumat, 08.00 - 16.00 WITA", lokasi: "Kantor Layanan Pengaduan Terpadu"
    }
  ];
  
  /* ===== Halaman Beranda: tampilkan 3 layanan unggulan ===== */
  const wadahUnggulan = document.getElementById("layananUnggulan");
  if (wadahUnggulan) {
    wadahUnggulan.innerHTML = dataLayanan.slice(0, 3).map(buatKartu).join("");
  }
  
  /* ===== Halaman Daftar: tampilkan semua + pencarian ===== */
  const wadahDaftar = document.getElementById("daftarLayanan");
  if (wadahDaftar) {
    tampilDaftar(dataLayanan);
    const inputCari = document.getElementById("cariLayanan");
    inputCari.addEventListener("input", function () {
      const kata = this.value.toLowerCase();
      const hasil = dataLayanan.filter(l =>
        l.judul.toLowerCase().includes(kata) || l.ringkas.toLowerCase().includes(kata));
      tampilDaftar(hasil);
    });
  }
  
  function tampilDaftar(daftar) {
    wadahDaftar.innerHTML = daftar.length
      ? daftar.map(buatKartu).join("")
      : '<div class="col-12"><div class="alert alert-warning text-center">Layanan tidak ditemukan.</div></div>';
  }
  
  function buatKartu(l) {
    return `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card kartu-info">
          <div class="card-body text-center p-4 d-flex flex-column">
            <i class="bi ${l.ikon} ikon-kartu mb-3"></i>
            <h5 class="card-title fw-bold">${l.judul}</h5>
            <p class="card-text text-muted flex-grow-1">${l.ringkas}</p>
            <a href="detail.html?id=${l.id}" class="btn btn-primary mt-2">Lihat Detail</a>
          </div>
        </div>
      </div>`;
  }
  
  /* ===== Halaman Detail: baca ?id= dari URL ===== */
  const wadahDetail = document.getElementById("isiDetail");
  if (wadahDetail) {
    const id = parseInt(new URLSearchParams(window.location.search).get("id")) || 1;
    const l = dataLayanan.find(x => x.id === id);
    if (l) {
      document.title = l.judul + " - InfoPublik";
      wadahDetail.innerHTML = `
        <div class="banner-detail mb-4">
          <i class="bi ${l.ikon}"></i>
          <h2 class="fw-bold mt-3">${l.judul}</h2>
        </div>
        <p class="lead">${l.lengkap}</p>
        <h5 class="fw-bold mt-4">Persyaratan</h5>
        <ul class="list-group mb-4">
          ${l.syarat.map(s => `<li class="list-group-item"><i class="bi bi-check-circle-fill text-success me-2"></i>${s}</li>`).join("")}
        </ul>
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <div class="p-3 bg-white rounded shadow-sm h-100">
              <i class="bi bi-clock text-primary"></i> <strong>Jam Layanan</strong>
              <p class="mb-0 mt-1">${l.jam}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 bg-white rounded shadow-sm h-100">
              <i class="bi bi-geo-alt text-primary"></i> <strong>Lokasi</strong>
              <p class="mb-0 mt-1">${l.lokasi}</p>
            </div>
          </div>
        </div>
        <a href="layanan.html" class="btn btn-outline-primary me-2"><i class="bi bi-arrow-left"></i> Kembali ke Daftar</a>
        <a href="index.html" class="btn btn-primary">Ke Beranda</a>`;
    } else {
      wadahDetail.innerHTML = '<div class="alert alert-danger">Data layanan tidak ditemukan.</div>';
    }
  }
  
  /* ===== Halaman Login: validasi form ===== */
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault(); // cegah form diproses jika belum valid
  
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const pesan = document.getElementById("pesanLogin");
      const pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const error = [];
  
      email.classList.remove("is-invalid", "is-valid");
      password.classList.remove("is-invalid", "is-valid");
  
      if (email.value.trim() === "") {
        error.push("Email tidak boleh kosong.");
        email.classList.add("is-invalid");
      } else if (!pola.test(email.value.trim())) {
        error.push("Format email tidak valid (contoh: nama@gmail.com).");
        email.classList.add("is-invalid");
      } else {
        email.classList.add("is-valid");
      }
  
      if (password.value === "") {
        error.push("Password tidak boleh kosong.");
        password.classList.add("is-invalid");
      } else if (password.value.length < 8) {
        error.push("Password minimal 8 karakter.");
        password.classList.add("is-invalid");
      } else {
        password.classList.add("is-valid");
      }
  
      if (error.length > 0) {
        pesan.innerHTML = `<div class="alert alert-danger"><ul class="mb-0 ps-3">${
          error.map(x => `<li>${x}</li>`).join("")}</ul></div>`;
      } else {
        pesan.innerHTML = '<div class="alert alert-success"><i class="bi bi-check-circle-fill"></i> Validasi berhasil! Data login memenuhi ketentuan.</div>';
      }
    });
  }