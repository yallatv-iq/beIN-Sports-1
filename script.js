// رابط البث DASH + مفتاح ClearKey
const dashUrl = "https://todtv-live-spo-prod.akamaized.net/Content/Channel/svc-spo-hd-08-dt/DASH/hdntl=exp=1756577237~acl=*%2fContent%2fChannel%2fsvc-spo-hd-08-dt%2fDASH%2f*~id=06801505-1039-490d-ab7b-d3a6c039fbea~data=hdntl,aXA9MmEwMjo0NzgwOjY6MTg4NjowOjM3MmI6N2IzZDox~hmac=0225db2322a3baee1885bfee27c4a947d9831fd0a262b9f00330354e4f04915c/playlist_ha.mpd";
const clearkey = {
  "f1dac2f937c9338f8e7c33963d06c489": "8ab19f639fe1552c7463f4b978c41c9d"
};

const player = jwplayer("player");

player.setup({
  playlist: [{
    sources: [{
      file: dashUrl,
      type: "dash",
      drm: { clearkey }
    }]
  }],
  width: "100%",
  height: "100%",
  autostart: false,
  controls: true
});

// زر تبديل الأبعاد
let currentFit = "fill";
function toggleAspect() {
  currentFit = currentFit === "fill" ? "contain" : "fill";
  const video = document.querySelector(".jwplayer video");
  if(video) video.style.objectFit = currentFit;
}

// أضف زر Aspect Ratio
player.addButton(
  "https://img.icons8.com/ios-glyphs/24/ffffff/resize.png",
  "تبديل الأبعاد",
  toggleAspect,
  "aspect-toggle"
);

// فرض Object-fit كل ثانية لتجنب مشاكل fullscreen
setInterval(() => {
  const video = document.querySelector(".jwplayer video");
  if(video) video.style.objectFit = currentFit;
}, 1000);