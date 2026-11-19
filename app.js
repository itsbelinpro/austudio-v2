var $ = function (i) {
  return document.getElementById(i);
};
var msgs = [
  { t: "date", x: "HARI INI" },
  {
    t: "in",
    x: "kamu udah makan belum?",
    m: "21:05",
    s: "r",
    n: "Kak Jeno",
  },
  { t: "out", x: "belum, baru pulang", m: "21:06", s: "r" },
  {
    t: "in",
    x: "yaudah aku bawain nasi goreng ya",
    m: "21:07",
    s: "r",
    n: "Kak Jeno",
    q: 1,
  },
];
var avatar = null,
  ed = -1;
function setEd() {
  if (ed >= 0) $("more").open = true;
  $("add").textContent = ti(ed >= 0 ? "save" : "add");
  $("cx").style.display = ed >= 0 ? "" : "none";
  render();
}
function loadEd(i) {
  var m = msgs[i];
  ed = i;
  var kd =
    m.t == "date" || m.t == "sys"
      ? m.t
      : m.dl
      ? "del"
      : m.v != null && m.v !== ""
      ? "voice"
      : m.c
      ? m.c == "vid"
        ? "vcall"
        : "call"
      : "text";
  $("kd").value = kd;
  if (m.t == "in" || m.t == "out") $("sd").value = m.t;
  $("mt").value = m.m || "";
  $("ms").value = m.s || "r";
  $("mn").value = m.n || "";
  $("mx").value = kd == "text" || kd == "date" || kd == "sys" ? m.x : "";
  $("cr").value = m.r || "a";
  $("cd").value = m.d || m.v || "";
  $("edf").checked = !!m.ed;
  setEd();
  $("mr").value = m.q != null ? m.q : "";
  $("mx").scrollIntoView({ block: "center" });
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}
function tick(s) {
  if (s == "n") return "";
  var d = s != "s";
  return (
    '<svg viewBox="0 0 16 11" class="tick ' +
    (s == "r" ? "r" : "") +
    '" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 6l3 3 6-7"/>' +
    (d ? '<path d="M6 8l1 1 6-7"/>' : "") +
    "</svg>"
  );
}
function col(n) {
  var h = 0;
  for (var i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360;
  return "hsl(" + h + ",60%,45%)";
}
function nextTime(t) {
  var p = (t || "00:00").split(":");
  var m =
    (parseInt(p[0]) * 60 + parseInt(p[1]) + (parseInt($("stp").value) || 0)) %
    1440;
  return (
    ("0" + Math.floor(m / 60)).slice(-2) + ":" + ("0" + (m % 60)).slice(-2)
  );
}
var PH =
  "M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z";
var VD =
  "M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z";
function callb(m) {
  var ms = m.r == "m",
    sub = ms
      ? wi("missed")
      : m.r == "x"
      ? wi("declined")
      : m.r == "n"
      ? wi("noans")
      : m.d || "0:42";
  var ar = m.t == "out" ? "↗" : "↙";
  return (
    '<div class="call"><div class="ci ' +
    (ms ? "ms" : "") +
    '"><svg viewBox="0 0 24 24" fill="currentColor"><path d="' +
    (m.c == "vid" ? VD : PH) +
    '"/></svg></div><div><div class="ct">' +
    esc(mtx(m, 1)) +
    '</div><div class="cs"><i class="' +
    (ms || m.r == "x" ? "ms" : "") +
    '">' +
    ar +
    "</i>" +
    esc(sub) +
    "</div></div></div>"
  );
}
function sbarA() {
  var p = Math.max(1, Math.min(100, parseInt($("bt").value) || 80));
  return (
    '<svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 11.5L.5 3.2A11 11 0 0 1 8 .3a11 11 0 0 1 7.5 2.9z"/></svg><svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M12 0v12H0z"/></svg><svg width="22" height="12" viewBox="0 0 22 12"><rect x=".5" y="1" width="18" height="10" rx="2" fill="none" stroke="currentColor" opacity=".5"/><rect x="2" y="2.5" width="' +
    Math.round((p / 100) * 15) +
    '" height="7" rx="1" fill="currentColor"/><rect x="19.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".5"/></svg>'
  );
}
function sbar() {
  if ($("pf").value == "and") return sbarA();
  var p = Math.max(1, Math.min(100, parseInt($("bt").value) || 80)),
    w = Math.round((p / 100) * 21);
  var sig =
    '<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>';
  var wf =
    '<svg width="17" height="12" viewBox="0 0 17 12" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M1.5 4.2a10 10 0 0 1 14 0"/><path d="M4 6.9a6.300 6.300 0 0 1 9 0"/><circle cx="8.5" cy="10" r="1" fill="currentColor"/></svg>';
  var bat =
    '<svg width="27" height="13" viewBox="0 0 27 13"><defs><clipPath id="cf"><rect x="1.5" y="1.5" width="' +
    w +
    '" height="10"/></clipPath><clipPath id="ce"><rect x="' +
    (1.5 + w) +
    '" y="1.5" width="' +
    (21 - w) +
    '" height="10"/></clipPath></defs><rect x=".5" y=".5" width="22" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="1.5" y="1.5" width="' +
    w +
    '" height="10" rx="2.6" fill="currentColor"/><path d="M24 4.500v4c.8-.3 1.500-1.100 1.500-2s-.7-1.700-1.500-2z" fill="currentColor" opacity=".45"/></svg>';
  return sig + wf + bat;
}
var vimg = { r: null, s: null, t: null, n: null };
var stt, tt, ct2;
var FLD = [
  "kd",
  "sd",
  "imn",
  "ub",
  "stp",
  "stx",
  "sbg",
  "scp",
  "stm",
  "ssg",
  "sac",
  "nt",
  "nd",
  "lg",
  "wl",
  "pf",
  "cn",
  "cs",
  "ct",
  "bt",
  "th",
  "gm",
  "pi2",
  "vw",
  "vt",
  "vn",
  "mt",
  "ms",
];
function saveS() {
  function pack(img) {
    var d = {
      m: msgs,
      n: nots,
      f: {},
      c: { sp: $("vsp").checked, mu: $("vmu").checked },
    };
    FLD.forEach(function (i) {
      d.f[i] = $(i).value;
    });
    if (img) {
      d.av = avatar;
      d.vi = vimg;
    } else {
      d.m = msgs.map(function (x) {
        var y = Object.assign({}, x);
        delete y.img;
        return y;
      });
    }
    return JSON.stringify(d);
  }
  try {
    localStorage.setItem("wagen1", pack(true));
  } catch (e) {
    try {
      localStorage.setItem("wagen1", pack(false));
    } catch (e2) {}
  }
}
function loadS() {
  try {
    var d = JSON.parse(localStorage.getItem("wagen1") || "null");
    if (!d) return;
    if (d.m) msgs = d.m;
    if (d.n) nots = d.n;
    FLD.forEach(function (i) {
      if (d.f && d.f[i] != null) $(i).value = d.f[i];
    });
    if (d.c) {
      $("vsp").checked = !!d.c.sp;
      $("vmu").checked = !!d.c.mu;
    }
    avatar = d.av || null;
    if (d.vi) vimg = d.vi;
  } catch (e) {}
}
function syncSeg() {
  document.querySelectorAll("button[data-t]").forEach(function (b) {
    b.classList.toggle("on", $(b.dataset.t).value == b.dataset.v);
  });
}
function toast(m) {
  var t = $("toast");
  t.textContent = m;
  t.className = "on";
  clearTimeout(tt);
  tt = setTimeout(function () {
    t.className = "";
  }, 1600);
}
document.addEventListener("click", function (e) {
  var b = e.target.closest("button[data-t]");
  if (!b) return;
  $(b.dataset.t).value = b.dataset.v;
  render();
});
function goTab(k) {
  document.querySelector(".wrap").dataset.tab = k;
  document.querySelectorAll(".tabs button").forEach(function (x) {
    x.classList.toggle("on", x.dataset.k == k);
  });
}
document.querySelectorAll(".tabs button").forEach(function (b) {
  b.onclick = function () {
    goTab(b.dataset.k);
  };
});
function onScr() {
  var f = $("fab");
  if (f)
    f.classList.toggle("on", window.innerWidth < 860 && window.scrollY > 520);
}
window.addEventListener("scroll", onScr, { passive: true });
$("fab").onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
function sample() {
  $("cn").value = "Kak Arka 🌙";
  $("imn").value = "Saya";
  $("ub").value = "3";
  $("cs").value = "online";
  $("mt").value = "21:13";
  msgs = [
    { t: "date", x: "Hari ini" },
    { t: "in", x: "kamu udah sampe rumah?", m: "21:02", s: "r" },
    { t: "out", x: "udah kak, barusan", m: "21:04", s: "r" },
    { t: "out", x: "kenapa emang?", m: "21:04", s: "r" },
    { t: "in", x: "gapapa", m: "21:05", s: "r" },
    { t: "in", x: "", dl: 1, m: "21:05", s: "r" },
    { t: "in", x: "cuma mau mastiin aja", m: "21:05", s: "r" },
    {
      t: "in",
      x: "soalnya tadi kamu lupa bawa payung 🙂",
      m: "21:06",
      s: "r",
    },
    { t: "out", x: "KAK ARKA KOK TAU 😭", m: "21:08", s: "r", q: 7 },
    { t: "in", x: "", v: "0:07", m: "21:09", s: "r" },
    {
      t: "in",
      x: "payungnya ada di tas aku sekarang. besok aku balikin, *sekalian sarapan bareng* ya",
      m: "21:10",
      s: "r",
      ed: 1,
    },
    { t: "out", x: "...oke", m: "21:12", s: "r" },
  ];
  ed = -1;
  setEd();
  toast("OK");
}
$("smp").onclick = sample;
$("emp").onclick = function () {
  msgs = [];
  ed = -1;
  setEd();
  toast(ti("deld"));
};
$("impb").onclick = function () {
  var me = ($("imn").value || "Saya").trim().toLowerCase(),
    tm = $("mt").value,
    c = 0;
  $("imp")
    .value.split("\n")
    .forEach(function (l) {
      l = l.trim();
      if (!l) return;
      var mm = l.match(/^\[?(\d{1,2}[.:]\d{2})\]?\s*[-\u2013]?\s*(.*)$/),
        t = tm;
      if (mm) {
        t = mm[1].replace(".", ":");
        l = mm[2];
      }
      var p = l.indexOf(":");
      if (p < 1 || p > 30) {
        msgs.push({ t: "sys", x: l });
        return;
      }
      var n = l.slice(0, p).trim(),
        x = l.slice(p + 1).trim(),
        out = n.toLowerCase() == me;
      msgs.push({
        t: out ? "out" : "in",
        x: x,
        m: t,
        s: "r",
        n: out ? "" : n,
      });
      tm = nextTime(t);
      c++;
    });
  $("imp").value = "";
  $("mt").value = tm;
  toast(c + " " + ti("imported"));
  render();
  goTab("chat");
};
$("ch").addEventListener("click", function (e) {
  var b = e.target.closest("[data-i]");
  if (!b) return;
  goTab("chat");
  loadEd(parseInt(b.dataset.i));
});
$("rst").onclick = function () {
  try {
    localStorage.removeItem("wagen1");
  } catch (e) {}
  location.reload();
};
var IC = {
  spk: '<path d="M3 9v6h4l5 4V5L7 9z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  vid: '<path d="' + VD + '"/>',
  mic: '<path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11z"/>',
  add: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0z"/><path d="M19 6v6M16 9h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  end: '<path transform="rotate(135 12 12)" d="' + PH + '"/>',
  dots: '<circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>',
  min: '<path d="M14 10l6-6M20 9V4h-5M10 14l-6 6M4 15v5h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  flip: '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><path d="M9 13a3.5 3.5 0 0 1 6-1.5M15 13a3.5 3.5 0 0 1-6 1.5" fill="none" stroke="#555" stroke-width="1.5" stroke-linecap="round"/>',
  fx: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
};
IC.mics =
  IC.mic +
  '<path d="M4 4l16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
IC.key = "";
for (var ky = 0; ky < 3; ky++)
  for (var kx = 0; kx < 3; kx++)
    IC.key +=
      '<circle cx="' + (5 + kx * 7) + '" cy="' + (5 + ky * 7) + '" r="1.9"/>';
function ico(k, z) {
  return (
    '<svg width="' +
    z +
    '" height="' +
    z +
    '" viewBox="0 0 24 24" fill="currentColor">' +
    IC[k] +
    "</svg>"
  );
}
function fit(d, ar, w, cb) {
  var im = new Image();
  im.onload = function () {
    var iw = im.width,
      ih = im.height,
      cw,
      ch;
    if (iw / ih > ar) {
      ch = ih;
      cw = ih * ar;
    } else {
      cw = iw;
      ch = iw / ar;
    }
    var c = document.createElement("canvas");
    c.width = w;
    c.height = Math.round(w / ar);
    var x = c.getContext("2d");
    x.imageSmoothingQuality = "high";
    x.drawImage(
      im,
      (iw - cw) / 2,
      (ih - ch) / 2,
      cw,
      ch,
      0,
      0,
      c.width,
      c.height
    );
    cb(c.toDataURL("image/jpeg", 0.92));
  };
  im.src = d;
}
$("vr").onchange = function () {
  readF(this, function (d) {
    if (!d) {
      vimg.r = null;
      render();
      return;
    }
    fit(d, 348 / 688, 1044, function (u) {
      vimg.r = u;
      render();
    });
  });
};
$("vs").onchange = function () {
  readF(this, function (d) {
    if (!d) {
      vimg.s = null;
      render();
      return;
    }
    fit(d, 130 / 195, 390, function (u) {
      vimg.s = u;
      render();
    });
  });
};
function sbh() {
  return (
    '<div class="sb"><span>' +
    esc($("ct").value) +
    '</span><span style="display:flex;gap:5px;align-items:center">' +
    sbar() +
    "</span></div>"
  );
}
function vcall(nm, tm) {
  var sp = $("vsp").checked,
    mu = $("vmu").checked;
  function b(k, l, on, red) {
    return (
      '<div class="cb"><div class="cc' +
      (on ? " on" : "") +
      (red ? " rd" : "") +
      '">' +
      ico(k, 28) +
      "</div><div>" +
      l +
      "</div></div>"
    );
  }
  return (
    sbh() +
    '<div class="vt"><div class="vtm">' +
    esc(tm) +
    '</div><div class="vnm">' +
    esc(nm) +
    "</div></div>" +
    '<div class="vg">' +
    b("spk", wi("spk"), sp) +
    b("vid", wi("ft")) +
    b(mu ? "mics" : "mic", wi("mute"), mu) +
    b("add", wi("add")) +
    b("end", wi("end"), 0, 1) +
    b("key", wi("key")) +
    '</div><div class="hb"></div>'
  );
}
function vvid(nm, tm) {
  var sp = $("vsp").checked,
    mu = $("vmu").checked;
  var bg = vimg.r
    ? '<img class="vbg" src="' + vimg.r + '" alt="">'
    : '<div class="vbg" style="background:linear-gradient(#5a524b,#2a2522)"></div>';
  var pp = vimg.s ? '<img src="' + vimg.s + '" alt="">' : "";
  function c(k, on, red) {
    return (
      '<div class="cc' +
      (on ? " on" : "") +
      (red ? " rd" : "") +
      '">' +
      ico(k, 26) +
      "</div>"
    );
  }
  return (
    bg +
    '<div class="vsh"></div>' +
    sbh() +
    '<div class="wt"><div class="rb">' +
    ico("min", 20) +
    '</div><div class="nm2"><b>' +
    esc(nm) +
    "</b><span>" +
    esc(tm) +
    '</span></div><div class="rb">' +
    ico("add", 20) +
    "</div></div>" +
    '<div class="pp">' +
    pp +
    '<div class="rb" style="top:8px">' +
    ico("flip", 20) +
    '</div><div class="rb" style="top:52px">' +
    ico("fx", 20) +
    "</div></div>" +
    '<div class="wb">' +
    c("dots") +
    c("vid", 1) +
    c("spk", sp) +
    c(mu ? "mics" : "mic") +
    c("end", 0, 1) +
    "</div>"
  );
}
var TX = {
  t_in: ["Masuk", "Incoming"],
  t_out: ["Keluar", "Outgoing"],
  t_date: ["Tanggal", "Date"],
  t_sys: ["Info", "Info"],
  empty: ["Belum ada pesan.", "No messages yet."],
  none: ["- tidak -", "- none -"],
  add: ["Tambah ke chat", "Add to chat"],
  save: ["Simpan perubahan", "Save changes"],
  delall: ["Hapus semua", "Delete all"],
  sure: ["Yakin? Ketuk lagi", "Sure? Tap again"],
  added: ["Pesan ditambahkan", "Message added"],
  saved: ["Perubahan disimpan", "Changes saved"],
  deld: ["Semua pesan dihapus", "All messages deleted"],
  exp: ["Unduh PNG", "Download PNG"],
  imported: ["pesan diimpor", "messages imported"],
  proc: ["Memproses...", "Processing..."],
  fail: ["Gagal, coba screenshot saja", "Failed, try a screenshot instead"],
  photo: ["Foto", "Photo"],
  nempty: ["Belum ada notifikasi.", "No notifications yet."],
  nadded: ["Notifikasi ditambahkan", "Notification added"],
  items: ["item", "item"],
  deleted: ["Pesan dihapus", "Message deleted"],
  voice: ["Voice note", "Voice note"],
};
var WX = {
  you: ["Kamu", "You"],
  photo: ["Foto", "Photo"],
  cvoice: ["Panggilan suara", "Voice call"],
  cvid: ["Panggilan video", "Video call"],
  missed: ["Tidak terjawab", "Missed"],
  declined: ["Ditolak", "Declined"],
  noans: ["Tidak ada jawaban", "No answer"],
  msg: ["Pesan", "Message"],
  spk: ["Speaker", "Speaker"],
  ft: ["FaceTime", "FaceTime"],
  mute: ["Bisukan", "Mute"],
  add: ["Tambah", "Add"],
  end: ["Akhiri", "End"],
  key: ["Keypad", "Keypad"],
  reply: ["Balas", "Reply"],
  deleted: ["Pesan ini telah dihapus", "This message was deleted"],
  voice: ["Voice note", "Voice note"],
  edited: ["Diedit", "Edited"],
};
function ti(k) {
  return TX[k][$("lg").value == "en" ? 1 : 0];
}
function wi(k) {
  return WX[k][$("wl").value == "en" ? 1 : 0];
}
function mtx(m, wa) {
  var f = wa ? wi : ti;
  return m.dl
    ? f("deleted")
    : m.v
    ? "🎤 " + f("voice") + " " + m.v
    : m.c
    ? f(m.c == "vid" ? "cvid" : "cvoice")
    : m.x || f("photo");
}
function fmt(x) {
  return esc(x)
    .replace(/\*([^*\n]+)\*/g, "<b>$1</b>")
    .replace(/_([^_\n]+)_/g, "<i>$1</i>")
    .replace(/~([^~\n]+)~/g, "<s>$1</s>");
}
function voiceb(m, i) {
  var bars = "",
    sd = (i + 3) * 7919;
  for (var k = 0; k < 26; k++) {
    sd = (sd * 9301 + 49297) % 233280;
    bars +=
      '<i style="height:' + (4 + Math.round((sd / 233280) * 14)) + 'px"></i>';
  }
  return (
    '<div class="vn"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg><div class="wf">' +
    bars +
    "</div><span>" +
    esc(m.v) +
    "</span></div>"
  );
}
var EN = {
  "Generator Chat WA": "WA Chat Generator",
  "Buat chat WhatsApp palsu untuk AU. Tulis pesan, cek hasil, ekspor gambar. Data tersimpan otomatis di perangkat ini.":
    "Make fake WhatsApp chats for your AU. Write messages, check the result, export an image. Data is saved automatically on this device.",
  "Tulis pesan": "Write message",
  Masuk: "Incoming",
  Keluar: "Outgoing",
  Tanggal: "Date",
  "Isi pesan": "Message text",
  "Tulis pesan...": "Type a message...",
  "Otomatis gantian Masuk / Keluar": "Auto-alternate Incoming / Outgoing",
  "Opsi lain: jam, centang, balas, gambar, panggilan":
    "More options: time, ticks, reply, image, call",
  Jam: "Time",
  Centang: "Ticks",
  Dibaca: "Read",
  Terkirim: "Delivered",
  "Terkirim 1": "Sent",
  Tanpa: "None",
  "Nama pengirim (untuk grup)": "Sender name (for groups)",
  "mis. Haechan": "e.g. Haechan",
  "Balas ke pesan": "Reply to message",
  "Gambar (opsional)": "Image (optional)",
  Panggilan: "Call",
  Jenis: "Type",
  "Pesan teks": "Text message",
  "Telepon suara": "Voice call",
  "Hasil panggilan": "Call result",
  Terjawab: "Answered",
  "Tidak terjawab": "Missed",
  Ditolak: "Declined",
  "Tidak ada jawaban": "No answer",
  Durasi: "Duration",
  "Batal edit": "Cancel edit",
  "Daftar pesan": "Message list",
  "Ketuk teks pesan untuk mengedit.": "Tap a message to edit it.",
  Perangkat: "Device",
  "Bahasa aplikasi": "App language",
  "Bahasa tampilan WhatsApp": "WhatsApp display language",
  Kontak: "Contact",
  Nama: "Name",
  "Jam HP": "Phone time",
  "Baterai %": "Battery %",
  "Chat pribadi": "Private chat",
  Grup: "Group",
  "Pesan disematkan (kosong = tanpa)": "Pinned message (empty = none)",
  "mis. Photo": "e.g. Photo",
  "Foto profil": "Profile photo",
  "Layar panggilan": "Call screen",
  "Dipakai saat tampilan Telepon atau Video call dipilih di tab Hasil.":
    "Used when the Voice call or Video call view is chosen in the Result tab.",
  "Nama di layar (kosong = nama kontak)":
    "Name on screen (empty = contact name)",
  "Speaker aktif": "Speaker on",
  "Mute aktif": "Mute on",
  "Foto lawan bicara (layar penuh, video call)":
    "Other person's photo (full screen, video call)",
  "Foto kamu (kotak kecil, video call)": "Your photo (small box, video call)",
  "Reset semua ke awal": "Reset everything",
  Telepon: "Voice call",
  Terang: "Light",
  Gelap: "Dark",
  "Info sistem": "System info",
  Notifikasi: "Notification",
  "Status dan notifikasi": "Status and notifications",
  "Dipakai saat tampilan Status atau Notifikasi dipilih di tab Hasil.":
    "Used when the Status or Notification view is chosen in the Result tab.",
  "Teks status": "Status text",
  "Warna latar": "Background color",
  "Waktu status": "Status time",
  "Jumlah bar status": "Number of status bars",
  "Bar yang aktif": "Active bar",
  "Foto status (opsional)": "Status photo (optional)",
  "Keterangan foto": "Photo caption",
  "Daftar notifikasi (satu baris satu notifikasi, format Nama: pesan)":
    "Notification list (one per line, format Name: message)",
  "Label waktu notifikasi": "Notification time label",
  "Tanggal layar kunci": "Lock screen date",
  "Wallpaper layar kunci": "Lock screen wallpaper",
  Aplikasi: "App",
  "Judul / nama": "Title / name",
  "Waktu (kosong = label di bawah)": "Time (empty = use label below)",
  "Isi notifikasi": "Notification text",
  "+ Tambah notifikasi": "+ Add notification",
  "Daftar notifikasi": "Notification list",
  Tampilan: "View",
  Tema: "Theme",
  "Dibuat untuk karya fiksi dan AU. Tidak berafiliasi dengan WhatsApp, Instagram, Google, atau X.":
    "Made for fiction and AU work. Not affiliated with WhatsApp, Instagram, Google, or X.",
  "Data hanya tersimpan di perangkatmu. Jangan dipakai untuk menipu orang.":
    "Data stays on your device only. Please do not use it to deceive people.",
  "Generator chat WhatsApp buat AU-mu": "WhatsApp chat generator for your AU",
  "Tulis plotnya,": "Write the plot,",
  "biar chat-nya": "let the chat",
  "yang bercerita.": "tell the story.",
  Contoh: "Example",
  Kosongkan: "Clear",
  Impor: "Import",
  "Impor chat": "Import chat",
  "Impor ke chat": "Import to chat",
  "Namamu (pengirim Keluar)": "Your name (Outgoing sender)",
  "Tempel chat di sini": "Paste chat here",
  "Satu baris satu pesan. Format: Nama: pesan, atau 21.05 Nama: pesan. Nama selain namamu dianggap pesan masuk.":
    "One message per line. Format: Name: message, or 21.05 Name: message. Any name other than yours counts as incoming.",
  "Sertakan bingkai HP": "Include phone frame",
  "Ketuk bubble untuk edit · geser layar untuk lihat pesan lama":
    "Tap a bubble to edit · scroll the screen for older messages",
  "Draf tersimpan otomatis di browser ini":
    "Draft is saved automatically in this browser",
  Pratinjau: "Preview",
  "Urutan chat": "Chat order",
  "Chat belum dibaca": "Unread chats",
  Pengirim: "Sender",
  "Tambah jam": "Time step",
  "Balas pesan": "Reply to message",
  Diedit: "Edited",
  Tukar: "Swap",
  "Tambah ke chat": "Add to chat",
  "Voice note": "Voice note",
  "Pesan dihapus": "Deleted message",
  "Dukung *tebal*, _miring_, ~coret~. Enter untuk kirim, Shift+Enter baris baru.":
    "Supports *bold*, _italic_, ~strike~. Enter to send, Shift+Enter for a new line.",
  "Opsi lain: nama grup, gambar, otomatis gantian":
    "More options: group name, image, auto-alternate",
  Atur: "Settings",
  Hasil: "Result",
  Pesan: "Chat",
  "Tekan lama (HP) atau klik kanan (komputer) gambar untuk simpan. Ketuk di luar untuk tutup.":
    "Long-press (phone) or right-click (computer) the image to save. Tap outside to close.",
};
function applyLang() {
  var en = $("lg").value == "en";
  document
    .querySelectorAll(".edit,.ov,.prev,.hdr,.ftr,.fab")
    .forEach(function (r) {
      var tw = document.createTreeWalker(r, NodeFilter.SHOW_TEXT, null),
        n;
      while ((n = tw.nextNode())) {
        if (
          n.parentNode.closest("#ph,#ph2,#list,#nlist,#mr,textarea,#cnt,#toast")
        )
          continue;
        var o = n.__o !== undefined ? n.__o : n.nodeValue,
          k = o.trim();
        if (!k || !Object.prototype.hasOwnProperty.call(EN, k)) continue;
        n.__o = o;
        n.nodeValue = en
          ? o.replace(k, function () {
              return EN[k];
            })
          : o;
      }
    });
  document.querySelectorAll("[placeholder]").forEach(function (e) {
    if (e.closest("#ph,#ph2")) return;
    var o = e.__p !== undefined ? e.__p : e.getAttribute("placeholder");
    if (!Object.prototype.hasOwnProperty.call(EN, o)) return;
    e.__p = o;
    e.setAttribute("placeholder", en ? EN[o] : o);
  });
}
function dynL() {
  $("add").textContent = ti(ed >= 0 ? "save" : "add");
  if (!$("clr").dataset.s) $("clr").textContent = ti("delall");
  $("ex").textContent = ti("exp");
  $("ipt").textContent = wi("msg");
  $("comp").dataset.k = $("kd").value;
  $("sdin").textContent = $("cn").value || ti("t_in");
  $("sdout").textContent = $("imn").value || ti("t_out");
  var u = parseInt($("ub").value) || 0;
  $("ubd").textContent = u > 0 ? u : "";
  nlistRender();
  $("thw").style.opacity = $("vw").value == "chat" ? 1 : 0.4;
  applyLang();
}
IC.back =
  '<path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
IC.up =
  '<path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
IC.flash = '<path d="M8 2h8v5l-2 3v11a2 2 0 0 1-4 0V10L8 7z"/>';
IC.cam =
  '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5" fill="#333"/>';
var WAI =
  '<svg width="36" height="36" viewBox="0 0 36 36"><rect width="36" height="36" rx="9" fill="#25d366"/><path d="M18 7a11 11 0 0 0-9.4 16.7L7.2 29l5.5-1.4A11 11 0 1 0 18 7z" fill="none" stroke="#fff" stroke-width="2"/><path transform="translate(10.5 10.5) scale(.62)" d="' +
  PH +
  '" fill="#fff"/></svg>';
$("si").onchange = function () {
  readF(this, function (d) {
    if (!d) {
      vimg.t = null;
      render();
      return;
    }
    fit(d, 348 / 688, 1044, function (u) {
      vimg.t = u;
      render();
    });
  });
};
$("nw").onchange = function () {
  readF(this, function (d) {
    if (!d) {
      vimg.n = null;
      render();
      return;
    }
    fit(d, 348 / 688, 1044, function (u) {
      vimg.n = u;
      render();
    });
  });
};
function vstat(nm) {
  var bg = $("sbg").value || "#128c7e",
    tx = $("stx").value,
    cap = $("scp").value,
    tm = $("stm").value;
  var sg = Math.max(1, Math.min(12, parseInt($("ssg").value) || 3)),
    ac = Math.max(1, Math.min(sg, parseInt($("sac").value) || 1)),
    bars = "";
  for (var i = 1; i <= sg; i++)
    bars += '<i class="' + (i < ac ? "d" : i == ac ? "a" : "") + '"></i>';
  var body = vimg.t
    ? '<img class="vbg" src="' + vimg.t + '" alt="">'
    : '<div class="vbg" style="background:' +
      esc(bg) +
      '"></div><div class="stx">' +
      esc(tx) +
      "</div>";
  if (vimg.t && cap) body += '<div class="scap">' + esc(cap) + "</div>";
  var av = avatar
    ? '<img src="' + avatar + '" alt="">'
    : esc((nm[0] || "?").toUpperCase());
  return (
    body +
    '<div class="vsh"></div>' +
    sbh() +
    '<div class="sbars">' +
    bars +
    '</div><div class="sth"><div class="rb2">' +
    ico("back", 22) +
    '</div><div class="sav">' +
    av +
    '</div><div class="snm"><b>' +
    esc(nm) +
    "</b><span>" +
    esc(tm) +
    '</span></div><div class="rb2">' +
    ico("dots", 22) +
    '</div></div><div class="srp">' +
    ico("up", 20) +
    "<div>" +
    wi("reply") +
    "</div></div>"
  );
}
var nots = [
  { a: "wa", n: "Kak Jeno", x: "kamu udah makan belum?" },
  { a: "ig", n: "haechan", x: "menyukai fotomu." },
  { a: "gm", n: "Kampus", x: "Jadwal ujian sudah terbit." },
];
var GRAD =
  '<defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#feda75"/><stop offset=".35" stop-color="#fa7e1e"/><stop offset=".6" stop-color="#d62976"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs>';
var APPN = { wa: "WhatsApp", ig: "Instagram", gm: "Gmail", tw: "X" };
function appIcon(a, z) {
  var b =
    {
      wa:
        '<rect width="36" height="36" rx="9" fill="#25d366"/><path d="M18 7a11 11 0 0 0-9.4 16.7L7.2 29l5.5-1.4A11 11 0 1 0 18 7z" fill="none" stroke="#fff" stroke-width="2"/><path transform="translate(10.5 10.5) scale(.62)" d="' +
        PH +
        '" fill="#fff"/>',
      ig:
        GRAD +
        '<rect width="36" height="36" rx="9" fill="url(#ig)"/><rect x="9" y="9" width="18" height="18" rx="5.5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="18" cy="18" r="4.3" fill="none" stroke="#fff" stroke-width="2"/><circle cx="23.3" cy="12.7" r="1.2" fill="#fff"/>',
      gm: '<rect width="36" height="36" rx="9" fill="#fff"/><path d="M9 26V12" stroke="#4285f4" stroke-width="3"/><path d="M27 26V12" stroke="#34a853" stroke-width="3"/><path d="M9 12l9 7 9-7" fill="none" stroke="#ea4335" stroke-width="3" stroke-linejoin="round"/>',
      tw: '<rect width="36" height="36" rx="9" fill="#000"/><path d="M11 11l14 14M25 11L11 25" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>',
    }[a] || "";
  return (
    '<svg width="' +
    z +
    '" height="' +
    z +
    '" viewBox="0 0 36 36">' +
    b +
    "</svg>"
  );
}
function nlistRender() {
  var h = "";
  nots.forEach(function (o, i) {
    h +=
      '<div class="item"><span class="t"><span class="tag">' +
      APPN[o.a] +
      "</span>" +
      esc(((o.n ? o.n + ": " : "") + (o.x || "")).slice(0, 50)) +
      '</span><button class="g" data-a="up" data-i="' +
      i +
      '">\u2191</button><button class="g" data-a="dn" data-i="' +
      i +
      '">\u2193</button><button class="g" data-a="rm" data-i="' +
      i +
      '">\u2715</button></div>';
  });
  $("nlist").innerHTML = h || '<p class="sub">' + ti("nempty") + "</p>";
}
$("nadd").onclick = function () {
  var x = $("nm2").value,
    n = $("ntl").value;
  if (!x && !n) return;
  nots.push({ a: $("na").value, n: n, x: x, t: $("ntt").value });
  $("nm2").value = "";
  $("ntl").value = "";
  toast(ti("nadded"));
  render();
};
$("nlist").onclick = function (e) {
  var b = e.target.closest("button");
  if (!b) return;
  var i = parseInt(b.dataset.i),
    a = b.dataset.a;
  if (a == "rm") nots.splice(i, 1);
  else {
    var j = a == "up" ? i - 1 : i + 1;
    if (j < 0 || j >= nots.length) return;
    var q = nots[i];
    nots[i] = nots[j];
    nots[j] = q;
  }
  render();
};
function vnotif() {
  var an = $("pf").value == "and",
    tm = $("nt").value,
    dt = $("nd").value,
    ck = $("ct").value,
    h = "";
  nots.slice(0, 6).forEach(function (o) {
    var t2 = o.t || tm,
      ti2 = o.n || APPN[o.a];
    h += an
      ? '<div class="nc a"><div class="nah">' +
        appIcon(o.a, 14) +
        APPN[o.a] +
        " \u2022 " +
        esc(t2) +
        "</div><b>" +
        esc(ti2) +
        '</b><div class="nx">' +
        esc(o.x || "") +
        "</div></div>"
      : '<div class="nc"><div class="ni">' +
        appIcon(o.a, 36) +
        '</div><div class="nb"><div class="nh"><b>' +
        esc(ti2) +
        "</b><span>" +
        esc(t2) +
        '</span></div><div class="nx">' +
        esc(o.x || "") +
        "</div></div></div>";
  });
  var bg = vimg.n
    ? '<img class="vbg" src="' + vimg.n + '" alt="">'
    : '<div class="vbg" style="background:linear-gradient(160deg,#35457a,#0e1325)"></div>';
  return (
    bg +
    sbh() +
    '<div class="nlk"><div class="nd">' +
    esc(dt) +
    '</div><div class="ntm">' +
    esc(ck) +
    '</div></div><div class="nls">' +
    h +
    '</div><div class="nbt"><div class="rb">' +
    ico("flash", 22) +
    '</div><div class="rb">' +
    ico("cam", 22) +
    '</div></div><div class="hb" style="position:absolute;bottom:8px;left:50%;margin-left:-60px;z-index:2"></div>'
  );
}
function drawV() {
  syncSeg();
  dynL();
  clearTimeout(stt);
  stt = setTimeout(saveS, 500);
  var m = $("vw").value,
    p2 = $("ph2");
  $("ph").style.display = m == "chat" ? "" : "none";
  p2.style.display = m == "chat" ? "none" : "flex";
  if (m == "chat") return;
  var nm = $("vn").value || $("cn").value,
    tm = $("vt").value;
  p2.className =
    "phone dark " +
    { voice: "v", video: "w", status: "s", notif: "n" }[m] +
    ($("pf").value == "and" ? " and" : "");
  p2.innerHTML =
    m == "voice"
      ? vcall(nm, tm)
      : m == "video"
      ? vvid(nm, tm)
      : m == "status"
      ? vstat($("cn").value)
      : vnotif();
}
function render() {
  var g = $("gm").value == "1",
    nm = $("cn").value;
  $("ph").className =
    "phone " + $("th").value + ($("pf").value == "and" ? " and" : "");
  $("pt").textContent = $("ct").value;
  $("pr").innerHTML = sbar();
  var pv = $("pi2").value;
  $("pinb").style.display = pv ? "flex" : "none";
  $("pint").textContent = pv;
  $("pn").textContent = nm;
  $("ps").textContent = $("cs").value;
  var a = $("pa");
  a.innerHTML = avatar
    ? '<img src="' +
      avatar +
      '" alt="" style="width:100%;height:100%;display:block">'
    : esc((nm[0] || "?").toUpperCase());
  var h = "",
    prev = "";
  msgs.forEach(function (m, i) {
    if (m.t == "date") {
      h += '<div class="dt" data-i="' + i + '">' + esc(m.x) + "</div>";
      prev = "";
      return;
    }
    if (m.t == "sys") {
      h += '<div class="sy" data-i="' + i + '">' + esc(m.x) + "</div>";
      prev = "";
      return;
    }
    var first = prev != m.t + (g ? m.n : "");
    prev = m.t + (g ? m.n : "");
    h +=
      '<div class="b ' +
      m.t +
      (first ? " first" : "") +
      '" data-i="' +
      i +
      '">';
    if (g && m.t == "in" && first && m.n)
      h +=
        '<div class="nm" style="color:' + col(m.n) + '">' + esc(m.n) + "</div>";
    if (m.q != null && msgs[m.q]) {
      var r = msgs[m.q];
      h +=
        '<div class="q"><b>' +
        (r.t == "out" ? wi("you") : esc(r.n || nm)) +
        "</b>" +
        esc(mtx(r, 1)) +
        "</div>";
    }
    if (m.img) h += '<img src="' + m.img + '" alt="">';
    h +=
      (m.dl
        ? '<span class="dl2" style="filter: grayscale(100%); opacity: 0.7;">🚫 ' + wi("deleted") + "</span>"
        : m.v
        ? voiceb(m, i)
        : m.c
        ? callb(m)
        : fmt(m.x)) +
      '<span class="meta">' +
      (m.ed && !m.dl ? "<em>" + wi("edited") + "</em>" : "") +
      esc(m.m || "") +
      (m.t == "out" ? tick(m.s) : "") +
      '</span><div style="clear:both"></div></div>';
  });
  var c = $("ch"),
    kp = c.scrollTop,
    nb = !c.__i || c.scrollHeight - c.scrollTop - c.clientHeight < 60;
  c.innerHTML = h;
  c.scrollTop = nb ? c.scrollHeight : kp;
  c.__i = 1;
  drawV();
  var o = '<option value="">' + ti("none") + "</option>";
  msgs.forEach(function (m, i) {
    if (m.t == "in" || m.t == "out")
      o +=
        '<option value="' +
        i +
        '">' +
        (i + 1) +
        ". " +
        esc(mtx(m, 0).slice(0, 24)) +
        "</option>";
  });
  var cur = $("mr").value;
  $("mr").innerHTML = o;
  $("mr").value = cur;
  var L = "",
    meN = $("imn").value || ti("t_out");
  msgs.forEach(function (m, i) {
    var lbl = ti("t_" + m.t),
      io = m.t == "in" || m.t == "out",
      who = m.t == "out" ? meN : m.n || nm;
    L +=
      '<div class="item"' +
      (i == ed
        ? ' style="background:color-mix(in srgb,var(--ac) 18%,transparent)"'
        : "") +
      '><span class="num">' +
      (i + 1) +
      '</span><span class="t" data-a="ed" data-i="' +
      i +
      '">' +
      (io
        ? "<b>" + esc(who) + ":</b> "
        : '<span class="tag tg-' + m.t + '">' + lbl + "</span>") +
      esc(mtx(m, 0).slice(0, 60)) +
      (m.m ? '<em class="tm">' + esc(m.m) + "</em>" : "") +
      "</span>" +
      '<button class="g" data-a="ed" data-i="' +
      i +
      '">✎</button><button class="g" data-a="up" data-i="' +
      i +
      '">↑</button><button class="g" data-a="dn" data-i="' +
      i +
      '">↓</button><button class="g" data-a="rm" data-i="' +
      i +
      '">✕</button></div>';
  });
  $("list").innerHTML = L || '<p class="sub">' + ti("empty") + "</p>";
  $("cnt").textContent = msgs.length + " " + ti("items");
}
function readF(inp, cb) {
  var f = inp.files[0];
  if (!f) {
    cb(null);
    return;
  }
  var r = new FileReader();
  r.onload = function () {
    cb(r.result);
  };
  r.readAsDataURL(f);
}
$("cp").onchange = function () {
  readF(this, function (d) {
    if (!d) {
      avatar = null;
      render();
      return;
    }
    var im = new Image();
    im.onload = function () {
      var s = Math.min(im.width, im.height),
        sx = (im.width - s) / 2,
        sy = (im.height - s) / 2;
      var cur = document.createElement("canvas");
      cur.width = cur.height = s;
      cur.getContext("2d").drawImage(im, sx, sy, s, s, 0, 0, s, s);
      while (cur.width / 2 >= 400) {
        var n = document.createElement("canvas");
        n.width = n.height = Math.floor(cur.width / 2);
        var nx = n.getContext("2d");
        nx.imageSmoothingQuality = "high";
        nx.drawImage(cur, 0, 0, n.width, n.height);
        cur = n;
      }
      var c = document.createElement("canvas");
      c.width = c.height = 400;
      var x = c.getContext("2d");
      x.imageSmoothingQuality = "high";
      x.drawImage(cur, 0, 0, 400, 400);
      avatar = c.toDataURL("image/png");
      render();
    };
    im.src = d;
  });
};
[
  "cn",
  "cs",
  "ct",
  "th",
  "gm",
  "bt",
  "pi2",
  "vw",
  "vt",
  "vn",
  "vsp",
  "vmu",
  "stx",
  "sbg",
  "scp",
  "stm",
  "ssg",
  "sac",
  "nt",
  "nd",
  "kd",
  "imn",
  "ub",
  "stp",
].forEach(function (i) {
  $(i).oninput = render;
});
$("add").onclick = function () {
  readF($("mi"), function (img) {
    var kd = $("kd").value,
      side = $("sd").value,
      x = $("mx").value,
      m;
    var mt = $("mt").value,
      ms = $("ms").value,
      mn = $("mn").value || $("cn").value;
    var hasOld = ed >= 0 && msgs[ed] && msgs[ed].img;
    if (kd == "date" || kd == "sys") {
      if (!x.trim()) return;
      m = { t: kd, x: x };
    } else if (kd == "voice") {
      m = {
        t: side,
        x: "",
        v: $("cd").value || "0:07",
        m: mt,
        s: ms,
        n: mn,
      };
    } else if (kd == "del") {
      m = { t: side, x: "", dl: 1, m: mt, s: ms, n: mn };
    } else if (kd == "call" || kd == "vcall") {
      m = {
        t: side,
        x: "",
        c: kd == "call" ? "v" : "vid",
        r: $("cr").value,
        d: $("cd").value,
        m: mt,
        s: ms,
        n: mn,
      };
    } else {
      if (!x && !img && !hasOld) return;
      m = { t: side, x: x, m: mt, s: ms, n: mn };
      if ($("edf").checked) m.ed = 1;
    }
    if (img && kd == "text") m.img = img;
    var q = $("mr").value;
    if (q !== "" && kd != "date" && kd != "sys") m.q = parseInt(q);
    var wasEd = ed >= 0;
    if (wasEd) {
      if (!img && kd == "text" && msgs[ed].img) m.img = msgs[ed].img;
      msgs[ed] = m;
      ed = -1;
      setEd();
    } else msgs.push(m);
    $("mx").value = "";
    $("mi").value = "";
    $("mr").value = "";
    $("edf").checked = false;
    if (!wasEd) {
      $("mt").value = nextTime($("mt").value);
      if ($("alt").checked && kd != "date" && kd != "sys")
        $("sd").value = side == "in" ? "out" : "in";
    }
    toast(ti(wasEd ? "saved" : "added"));
    render();
  });
};
$("swp").onclick = function () {
  $("sd").value = $("sd").value == "in" ? "out" : "in";
  render();
};
$("mx").addEventListener("keydown", function (e) {
  if (
    e.key == "Enter" &&
    !e.shiftKey &&
    window.matchMedia("(pointer:fine)").matches
  ) {
    e.preventDefault();
    $("add").click();
  }
});
$("list").onclick = function (e) {
  var b = e.target.closest("[data-a]");
  if (!b) return;
  var i = parseInt(b.dataset.i),
    a = b.dataset.a;
  if (a == "ed") {
    loadEd(i);
    return;
  }
  if (ed >= 0) {
    ed = -1;
    setEd();
  }
  if (a == "rm") {
    msgs.splice(i, 1);
    msgs.forEach(function (m) {
      if (m.q == i) delete m.q;
      else if (m.q > i) m.q--;
    });
  } else {
    var j = a == "up" ? i - 1 : i + 1;
    if (j < 0 || j >= msgs.length) return;
    var t = msgs[i];
    msgs[i] = msgs[j];
    msgs[j] = t;
    msgs.forEach(function (m) {
      if (m.q == i) m.q = j;
      else if (m.q == j) m.q = i;
    });
  }
  render();
};
$("clr").onclick = function () {
  var b = this;
  if (b.dataset.s) {
    clearTimeout(ct2);
    b.dataset.s = "";
    b.textContent = ti("delall");
    msgs = [];
    ed = -1;
    setEd();
    toast(ti("deld"));
    return;
  }
  b.dataset.s = "1";
  b.textContent = ti("sure");
  ct2 = setTimeout(function () {
    b.dataset.s = "";
    b.textContent = ti("delall");
  }, 3000);
};
$("cx").onclick = function () {
  ed = -1;
  $("mx").value = "";
  setEd();
};
$("ex").onclick = function () {
  var b = $("ex");
  b.textContent = ti("proc");
  html2canvas($($("vw").value == "chat" ? "ph" : "ph2"), {
    scale: 4,
    useCORS: true,
    backgroundColor: null,
    logging: false,
    onclone: function (d) {
      var st = $("ch").scrollTop,
        k = d.getElementById("ch");
      if (k) {
        k.style.overflow = "hidden";
        k.scrollTop = st;
      }
      ["ph", "ph2"].forEach(function (i) {
        var p = d.getElementById(i);
        p.style.boxShadow = "none";
        if (!$("frm").checked) {
          p.style.borderRadius = "0";
          p.style.border = "0";
        }
      });
    },
  })
    .then(function (c) {
      $("oi").src = c.toDataURL("image/png");
      $("ov").className = "ov on";
      b.textContent = ti("exp");
    })
    .catch(function () {
      b.textContent = ti("fail");
    });
};
$("ov").onclick = function () {
  $("ov").className = "ov";
};
loadS();
render();
