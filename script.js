// script.js
let fakePhotos = [
    { id: 1, name: "vacation_sunset.jpg", size: "3.2 MB", url: "https://picsum.photos/id/1015/600/400", type: "photo" },
    { id: 2, name: "family_portrait.png", size: "4.8 MB", url: "https://picsum.photos/id/1005/600/400", type: "photo" },
    { id: 3, name: "beach_party.jpg", size: "2.9 MB", url: "https://picsum.photos/id/1016/600/400", type: "photo" }
];

let fakeVideos = [
    { id: 4, name: "birthday_video.mp4", size: "28 MB", url: "https://picsum.photos/id/1018/600/400", type: "video", thumbnail: "https://picsum.photos/id/1018/600/400" },
    { id: 5, name: "travel_clip.mov", size: "15 MB", url: "https://picsum.photos/id/102/600/400", type: "video", thumbnail: "https://picsum.photos/id/102/600/400" }
];

let fakeFiles = [
    { id: 6, name: "resume.pdf", size: "1.1 MB", icon: "fas fa-file-pdf", type: "file" },
    { id: 7, name: "notes.docx", size: "890 KB", icon: "fas fa-file-word", type: "file" },
    { id: 8, name: "song.mp3", size: "4.5 MB", icon: "fas fa-music", type: "file" }
];

function startRecovery() {
    const btn = document.getElementById('scanBtn');
    const progressContainer = document.getElementById('progressContainer');
    const resultsContainer = document.getElementById('resultsContainer');

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> SCANNING...`;

    progressContainer.classList.remove('d-none');
    resultsContainer.classList.add('d-none');

    let progress = 0;
    const progressBar = document.getElementById('progressBar');
    const status = document.getElementById('scanStatus');

    const interval = setInterval(() => {
        progress += Math.random() * 18;
        if (progress > 100) progress = 100;

        progressBar.style.width = `${progress}%`;
        status.textContent = `${Math.floor(progress)}%`;

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressContainer.classList.add('d-none');
                btn.disabled = false;
                btn.innerHTML = `<i class="fas fa-search me-2"></i> SCAN AGAIN`;
                showResults();
            }, 800);
        }
    }, 220);
}

function showResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.classList.remove('d-none');

    // Render Photos
    const photosGrid = document.getElementById('photosGrid');
    photosGrid.innerHTML = fakePhotos.map(item => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 shadow-sm" onclick="previewItem(${item.id}, 'photo')">
                <img src="${item.url}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h6 class="card-title text-truncate">${item.name}</h6>
                    <small class="text-muted">${item.size}</small>
                </div>
            </div>
        </div>
    `).join('');

    // Render Videos
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = fakeVideos.map(item => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 shadow-sm" onclick="previewItem(${item.id}, 'video')">
                <div class="position-relative">
                    <img src="${item.thumbnail}" class="card-img-top" alt="${item.name}">
                    <div class="position-absolute top-50 start-50 translate-middle bg-dark rounded-circle text-white p-2">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="card-body">
                    <h6 class="card-title text-truncate">${item.name}</h6>
                    <small class="text-muted">${item.size}</small>
                </div>
            </div>
        </div>
    `).join('');

    // Render Files
    const filesGrid = document.getElementById('filesGrid');
    filesGrid.innerHTML = fakeFiles.map(item => `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm d-flex flex-row p-3" onclick="previewItem(${item.id}, 'file')">
                <i class="${item.icon} fa-3x text-primary me-3"></i>
                <div>
                    <h6 class="card-title">${item.name}</h6>
                    <small class="text-muted">${item.size}</small>
                </div>
            </div>
        </div>
    `).join('');
}

function previewItem(id, type) {
    const modal = new bootstrap.Modal(document.getElementById('previewModal'));
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');

    let item;
    if (type === 'photo') item = fakePhotos.find(i => i.id === id);
    else if (type === 'video') item = fakeVideos.find(i => i.id === id);
    else item = fakeFiles.find(i => i.id === id);

    titleEl.textContent = item.name;

    if (type === 'photo') {
        bodyEl.innerHTML = `<img src="${item.url}" class="img-fluid rounded-3" alt="${item.name}">`;
    } else if (type === 'video') {
        bodyEl.innerHTML = `
            <div class="ratio ratio-16x9">
                <img src="${item.thumbnail}" class="img-fluid rounded-3" alt="${item.name}">
                <div class="position-absolute top-50 start-50 translate-middle text-white fs-1">
                    <i class="fas fa-play-circle"></i>
                </div>
            </div>
            <p class="mt-3 text-center text-muted">Video preview (demo only)</p>
        `;
    } else {
        bodyEl.innerHTML = `
            <div class="text-center py-5">
                <i class="${item.icon} fa-5x text-muted mb-3"></i>
                <h5>File ready to restore</h5>
                <p class="text-muted">${item.size}</p>
            </div>
        `;
    }

    modal.show();
}

function fakeDownload() {
    const toastHTML = `
        <div class="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3" role="alert">
            <div class="d-flex">
                <div class="toast-body">✅ File recovered and downloaded successfully!</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>`;
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();

    setTimeout(() => toastContainer.remove(), 4000);
}

// Keyboard shortcut hint (for fun)
console.log('%c🚀 EasyRecover Web is fully loaded and SEO optimized!', 'color:#0d6efd; font-size:13px; font-weight:bold;');
