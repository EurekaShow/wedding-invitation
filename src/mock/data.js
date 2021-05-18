const groom = "李雷";
const bride = "韩梅梅";
let date = "2005年12月16日";
let address = "天涯八卦";

let preCode = "";

let code = `const { 👦,👧 } = 🌏;
👦.name = "${groom}";
👧.name = "${bride}";

const wedding = new Wedding(👦,👧);
wedding.setDate("${date}");
wedding.setLocation("${address}");
wedding.generateInvitation();
`
export default {
  groom,
  bride,
  date,
  address,
  preCode,
  code,
  executions: [{
    name: '制作中...',
    time: '',
    visible: false
  }]
}