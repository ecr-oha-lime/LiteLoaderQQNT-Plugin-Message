var e,a=LiteLoader.plugins.MESSAGE.path.plugin,r=`local:///${a}/src/view/message.css`;MESSAGE.upDateConfig((t,o)=>{e=o,location.hash==="#/main/message"&&(document.body.style.setProperty("--bubble_guest",e.otherColor),document.body.style.setProperty("--bubble_guest_text",e.otherFontColor),document.body.style.setProperty("--host_bubble_bg_css_value",e.myColor),document.body.style.setProperty("--on_bubble_host_text",e.myFontColor))});async function l(){if(e=await MESSAGE.getConfig(),location.hash==="#/main/message"){let t=document.createElement("link");t.rel="stylesheet",t.href=r,document.head.appendChild(t),document.body.style.setProperty("--bubble_guest",e.otherColor),document.body.style.setProperty("--bubble_guest_text",e.otherFontColor),document.body.style.setProperty("--host_bubble_bg_css_value",e.myColor),document.body.style.setProperty("--on_bubble_host_text",e.myFontColor)}}async function d(t){document.querySelectorAll(".nav-item.liteloader").forEach(o=>{o.textContent==="message"&&o.addEventListener("click",()=>{if(!document.querySelector(".message")?.__vue_app__){let s=document.createElement("link");s.rel="stylesheet",s.href="local:///H:/\u9879\u76EE/LiteLoader/LiteLoaderQQNT-Plugin-Message/dist/assets/css/index.css ",document.head.appendChild(s);let n=document.createElement("script");n.type="module",n.src="local:///H:/\u9879\u76EE/LiteLoader/LiteLoaderQQNT-Plugin-Message/dist/assets/js/index.js",document.head.appendChild(n)}})})}location.hash==="#/blank"?navigation.addEventListener("navigatesuccess",l,{once:!0}):l();export{d as onSettingWindowCreated};