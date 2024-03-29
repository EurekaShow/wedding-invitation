<template>
  <div class="executions">
    <!--执行命令-->
    <p
      class="code"
      v-for="(execution, index) in executions"
      :key="index"
      v-show="execution.visible"
    >
      <span class="addon">~</span>
      [<span class="time">{{ execution.time }}</span
      >]
      <span class="task">{{ execution.name }}</span>
      <span class="duration" v-if="execution.duration !== undefined"
        >{{ execution.duration }} ms</span
      >
    </p>
    <!--进度条-->
    <p class="code" v-show="isProcessed">
      <span class="addon">~</span>
      {{ progressBarText }}
      <span class="percentage">{{ percentage }}%</span>
    </p>
    <!--执行命令-->
    <p class="code" v-show="endExecution.visible">
      <span class="addon">~</span>
      [<span class="time">{{ endExecution.time }}</span
      >]
      <span class="task">{{ endExecution.name }}</span>
      <a href="#" @click="showInvitation">查看</a>
    </p>
  </div>
</template>

<script>
import data from "@/mock/data";
import { get } from "@/utils/http";
import eventBus from "@/eventBus";

//请求lottie动画资源
export function loadAnimationData(callback) {
  return get(`./static/lottie/${data.lottie_name}.json`, (json) => {
    if (callback) {
      callback(json);
    }
  });
}

//请求music163音乐地址
function loadBGM(callback) {
  return get(
    `https://autumnfish.cn/song/url?id=${data.music163_id}`,
    (json) => {
      if (json.code == 200 && callback) {
        callback(json.data[0].url);
      }
    }
  );
}

export default {
  name: "Executions",
  props: ["canExecute"],
  data() {
    return {
      executions: data.executions,
      isProcessed: false,
      progressBarText: "--------------------------",
      endExecution: {
        name: "制作完成",
        time: "",
        visible: false,
      },
    };
  },
  computed: {
    percentage() {
      const hashL = this.progressBarText.split("").filter((c) => c === "#")
        .length;
      const l = this.progressBarText.length;
      return Math.floor((hashL * 100) / l);
    },
  },
  watch: {
    canExecute: function (val) {
      if (val === true) {
        this.runExecutions();
      }
    },
  },
  updated() {
    this.$emit("onUpdating");
  },
  methods: {
    showInvitation() {
      this.$emit("onFinish");
    },
    // 逐条执行命令
    runExecutions: async function () {
      for (const execution of this.executions) {
        await this.progressivelyRun(execution);
      }
      // 执行完命令，开始显示进度条
      await this.successProcessing(Math.floor(Math.random() * 50 + 20));
      try {
        //加载lottie动画
        await loadAnimationData((json) => {
          eventBus.$emit("lottie_ready", json);
        });
        //动画资源加载完成
        await this.successProcessing(Math.random() * 20 + 75, 2);
        //加载背景音乐
        await loadBGM((src) => {
          eventBus.$emit("music_ready", src);
        });
      } catch (error) {
        console.log(error);
      }

      //BGM资源加载完成
      await this.successProcessing(100, 2);
      // 执行最后一条命令
      await this.progressivelyRun(this.endExecution);

      setTimeout(() => {
        this.$emit("onFinish");
      }, 800);
    },
    // 执行一条命令
    progressivelyRun(execution, customDuration) {
      return new Promise((resolve) => {
        let now = new Date(),
          duration = customDuration ? customDuration : Math.random() * 50 + 250,
          showCode = () => {
            execution.time = now.toLocaleTimeString();
            execution.duration =
              execution.duration !== undefined
                ? duration.toFixed(2)
                : undefined;
            execution.visible = true;
            resolve();
          };
        setTimeout(showCode, duration);
      });
    },
    // 显示进度条
    successProcessing(random, mode = 3) {
      return new Promise((resolve) => {
        let progressing,
          progressingCount = 0;
        this.isProcessed = true;
        let step = () => {
          let percent = this.percentage;
          if (progressingCount % mode === 0) {
            this.progressBarText = this.progressBarText.replace("-", "#");
          }
          progressingCount++;
          if (percent < random) {
            progressing = requestAnimationFrame(step);
          } else {
            resolve();
            cancelAnimationFrame(progressing);
            if (random == 100) {
              this.progressBarText = this.progressBarText.replace(/-/g, "#");
            }
          }
        };
        progressing = requestAnimationFrame(step);
      });
    },
  },
};
</script>

<style lang="less">
.executions {
  .addon {
    color: #68fcfb;
  }
  .time {
    color: #666;
  }
  .task {
    color: #009ab2;
  }
  .duration {
    margin-left: 1rem;
    color: #bf36b7;
  }
  .code {
    margin: 0;
    color: rgb(112, 112, 112);
    line-height: 1.2;
    font-family: "Roboto Mono", "Menlo", "Monaco", Courier, monospace;
    font-weight: 500;
  }
}
</style>