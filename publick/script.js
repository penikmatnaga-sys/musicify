const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const tracksEl = document.getElementById('tracks');
const player = document.getElementById('player');
let tracks = [];
let current = 0;

async function loadTracks() {
  const res = await fetch('/api/files');
  tracks = await res.json();
  renderList();
}

function renderList() {
  tracksEl.innerHTML = '';
  tracks.forEach((t, i) => {
    const div = document.createElement('div');
    div.innerHTML = `<b>${i + 1}. ${t.name}</b>
      <button onclick="playTrack(${i})">Play</button>`;
    tracksEl.appendChild(div);
  });
}

async function uploadFile() {
  const files = fileInput.files;
  if (!files.length) return alert('Pilih file dulu');
  const fd = new FormData();
  for (let f of files) fd.append('files', f);
  await fetch('/api/upload', { method: 'POST', body: fd });
  loadTracks();
}

function playTrack(i) {
  current = i;
  player.src = tracks[i].url;
  player.play();
}

uploadBtn.addEventListener('click', uploadFile);
loadTracks();
