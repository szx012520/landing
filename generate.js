const fs = require("fs");

const DOMAIN = "https://szx012520.github.io/landing";
const TOTAL = 500; // ← 500, 1000 자유롭게 변경 가능

const keywords = [
"비대면 급전 당일 대출",
"사업자 대출 상담",
"직장인 소액 대출",
"무직자 생활비 대출",
"당일 입금 급전",
"월변 상담 가능",
"텔레그램 대출 상담",
"소액 긴급 자금",
"신용 상관없는 상담",
"개인 사업자 운영 자금"
];

function pageTemplate(title, desc, links){

return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="keywords" content="${title}, 급전, 당일대출, 사업자대출, 텔레그램상담">
<meta name="robots" content="index,follow">

<style>
*{box-sizing:border-box}
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto;background:linear-gradient(135deg,#f8f9fb,#eef1f5);color:#222}
.wrap{max-width:720px;margin:auto;padding:20px}
.hero{text-align:center;padding:40px 10px 20px}
.card{background:#fff;padding:22px;border-radius:18px;box-shadow:0 8px 24px rgba(0,0,0,.08);margin-top:22px}
.btn{width:100%;padding:15px;border-radius:12px;font-size:16px;font-weight:700;border:none;cursor:pointer;margin-top:10px}
.btn-main{background:#111;color:#fff}
.btn-telegram{background:#27A7E7;color:#fff;text-decoration:none;display:block;text-align:center}
input,select,textarea{width:100%;padding:14px;margin:6px 0 16px;border:1px solid #e2e2e2;border-radius:10px;background:#fafafa}
.footer{text-align:center;font-size:12px;color:#888;margin-top:30px}
a{color:#111}
</style>
</head>

<body>
<div class="wrap">

<div class="hero">
<h1>${title}</h1>
<p>한도 · 금리 · 상환 조건 무료 상담 진행</p>
</div>

<div class="card">
<h2>📩 무료 상담 신청</h2>

<p>
${desc}. 
당일 상담 가능하며 사업자·직장인·프리랜서 모두 신청 가능합니다.
간편 접수 후 빠르게 안내드립니다.
</p>

<form action="https://formsubmit.co/kduck0101@gmail.com" method="POST">
<input type="hidden" name="_captcha" value="false">
<input name="name" placeholder="이름" required>
<input name="phone" placeholder="연락처" required>
<input name="talkid" placeholder="텔레그램/카카오 ID" required>
<select name="amount">
<option>100만원 이하</option>
<option>500만원 이하</option>
<option>1,000만원 이상</option>
</select>
<button class="btn btn-main">무료 상담 신청하기 🚀</button>
</form>

<a href="https://t.me/szx012520" class="btn btn-telegram">텔레그램 바로 상담</a>
</div>

<div class="card">
<h2>서비스 안내</h2>
<p>
급하게 자금이 필요한 고객을 위해 비대면 상담을 제공합니다.
복잡한 절차 없이 빠르게 조건 확인이 가능하며,
신용등급과 관계없이 다양한 상담 사례를 보유하고 있습니다.
</p>
</div>

<div class="card">
<h2>추천 정보</h2>
${links}
</div>

<div class="footer">© 상담 서비스</div>

</div>
</body>
</html>`;
}


// ===== 생성 시작 =====

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for(let i=1;i<=TOTAL;i++){

  const kw = keywords[i % keywords.length];
  const file = `loan${i}.html`;

  // 내부링크 자동 생성 (SEO 핵심)
  let links = "";
  for(let j=1;j<=10;j++){
    const r = Math.floor(Math.random()*TOTAL)+1;
    links += `<a href="loan${r}.html">${keywords[r % keywords.length]}</a><br>`;
  }

  const html = pageTemplate(
    `${kw} | 텔레그램 상담`,
    `${kw} 빠른 당일 상담 가능합니다`,
    links
  );

  fs.writeFileSync(file, html);

  sitemap += `<url><loc>${DOMAIN}/${file}</loc></url>\n`;
}

sitemap += `</urlset>`;
fs.writeFileSync("sitemap.xml", sitemap);

fs.writeFileSync("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${DOMAIN}/sitemap.xml`);

console.log("✅ 고급 랜딩 500페이지 + sitemap + robots 생성 완료");
