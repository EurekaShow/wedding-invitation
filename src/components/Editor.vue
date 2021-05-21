<template>
  <div class="wedding-editor" ref="editor">
    <!--代码编辑区-->
    <pre><code v-html="highlightedCode"></code> </pre>
    <!--模拟编译-->
    <executions
      :canExecute="canExecute"
      @onUpdating="scrollToBottom"
      @onFinish="canOpen = true"
    />
    <!--展示邀请函-->
    <invitation :canOpen="canOpen" />
  </div>
</template>

<script>
import Prism from "prismjs";
import { Howl } from "howler";

import { drawBackground } from "@/utils/background/drawBackground";
import { excuteFireworks } from "@/utils/firework/firework";
import { resize } from "@/utils/createCanvas";

import Executions from "./Executions";
import Invitation from "./Invitation";

import data from "@/mock/data";
import eventBus from "@/eventBus";

let audioBuffer_k;
let audioBuffer_bgm;

function playAudio(audioBuffer, pause) {
  if (!audioBuffer) return;
  if (pause) {
    audioBuffer.pause();
    return;
  }
  audioBuffer.play();
}

export default {
  name: "Editor",
  components: { Executions, Invitation },
  data() {
    return {
      code: data.code,
      preCode: data.preCode, //直接显示
      currentCode: "",
      isCursorVisible: 1,
      canExecute: false,
      canOpen: false,
    };
  },
  updated() {
    this.scrollToBottom();
  },
  computed: {
    highlightedCode() {
      const code = Prism.highlight(
        this.currentCode,
        Prism.languages.javascript
      );
      const codeWithCursor = `${code}<span style="opacity:${this.isCursorVisible};" >▍</span>`;
      return codeWithCursor;
    },
  },
  watch:{

  },
  methods: {
    scrollToBottom() {
      // 保持页面一直滚到最下面
      this.$refs.editor.scrollTop = 100000;
    },
    // 代码输入
    progressivelyTyping() {
      return new Promise((resolve) => {
        let count = 0,
          typingCount = 0,
          start,
          typing;
        // 写代码每一帧的函数
        let step = (timestamp) => {
          if (start === undefined) start = timestamp;
          const elapsed = timestamp - start;
          // 大约每 24 帧光标闪动一次
          if (count % 24 === 0) {
            this.isCursorVisible = this.isCursorVisible === 0 ? 1 : 0;
          }
          count++;
          if (elapsed < 50) {
            typing = requestAnimationFrame(step);
            return;
          }
          if (
            this.code[typingCount - 1] == "\n" &&
            this.code[typingCount - 2] !== "\n"
          ) {
            if (elapsed < 1000) {
              typing = requestAnimationFrame(step);
              return;
            }
          }
          let randomNumber = Math.round(Math.random() * 6);
          // 摸你打字的随机速度
          if (randomNumber % 4 === 0) {
            start = timestamp;
            this.currentCode =
              this.preCode + this.code.substring(0, typingCount);

            typingCount++;
            playAudio(audioBuffer_k);
          }

          if (typingCount <= this.code.length) {
            typing = requestAnimationFrame(step);
          } else {
            resolve();
            this.canExecute = true;
            this.isCursorVisible = 0;
            cancelAnimationFrame(typing);
          }
        };
        typing = requestAnimationFrame(step);
      });
    },
  },
  mounted() {
    audioBuffer_k = new Howl({
      src: [require("/static/media/k.mp3")], //打包时资源会嵌入到js中
      loop: false,
    });
    document.addEventListener(
      "WeixinJSBridgeReady",
      function () {
        playAudio(audioBuffer_k);
      },
      false
    );
    //背景音乐地址获取成功
    eventBus.$on("music_ready", (src) => {
      audioBuffer_bgm = new Howl({
        src,
        loop: true,
      });
      playAudio(audioBuffer_bgm, true);
    });
   eventBus.$on("music_status", (status) => {
     playAudio(audioBuffer_bgm, status);      
    });
    //绘制背景
    drawBackground();
    //放烟花
    excuteFireworks();

    resize();
    //开始打字
    this.progressivelyTyping();
  },
};
</script>

<style lang="less">
.wedding-editor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: 1rem;
  padding-top: 1.5rem;
  pre {
    margin: 0;
    white-space: pre-wrap;
    padding-top: 10rem;
    code {
      margin: 0;
      color: #bbb;
      line-height: 1.2;
      font-family: "Roboto Mono", "Menlo", "Monaco", Courier, monospace;
      font-weight: 500;
    }
  }
}
</style>