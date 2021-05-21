import lottie from 'lottie-web';

let animationData;

const lottie_name = "partyyy";

export function loadAnimationData() {

  return new Promise((resolve, reject) => {
    fetch(`./static/lottie/${lottie_name}.json`).then((res) => res.json()).then((json) => {
      resolve();
      animationData = json;
    }).catch(() => {
      reject()
    })
  })
}

export function playExplosion(anchor,callback) {
  if (!lottie || !animationData) return;

  const explosionAnimeEle = anchor.appendChild(document.createElement("div"));
  let width = anchor.scrollWidth;
  let height = anchor.scrollHeight;
  explosionAnimeEle.style.position = "absolute";
  explosionAnimeEle.style.width = width + "px";
  explosionAnimeEle.style.height = height + "px";
  explosionAnimeEle.style.zIndex = 1000;
  explosionAnimeEle.style.top = 0;
  explosionAnimeEle.style.left = 0;

  explosionAnimeEle.addEventListener("click",(evt)=>{
    if(callback){
      //传回点击事件
      callback(evt)
    }
  })

  const explosionPlayer = lottie.loadAnimation({
    container: explosionAnimeEle,
    renderer: "svg",
    loop: false,
    autoplay: true,
    animationData
  });
  explosionPlayer.setSpeed(0.8);
  // 播放完成后，销毁爆炸相关的动画和元素
  explosionPlayer.addEventListener("complete", () => {
    explosionPlayer.destroy();
    explosionAnimeEle.parentNode.remove(explosionAnimeEle);
  });
}