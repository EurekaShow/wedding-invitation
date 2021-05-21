<template>
  <div
    class="wedding-invitation"
    :class="{ 'invitation-bounce': canOpen }"
    ref="wedding"
  >
    <div class="invitation-container" :class="{ 'invitation-down': isOpening }">
      <div class="invitation-cover">
        <div class="cover-content">
          <div class="content-inside">
            <img class="photo" :src="require('/static/images/photo.jpeg')" />
            <p>{{ data.groom }} & {{ data.bride }}</p>
            <p>地点：{{ data.address }}</p>
            <p>时间：{{ data.date }}{{ data.dateEx }}</p>
          </div>
        </div>
        <div class="cover left">
          <div class="border">
            <qing-jian class="title" />
            <img
              class="seal"
              :src="require('/static/images/seal.png')"
              @click="openInvitation"
              ref="seal"
            />
          </div>
        </div>
        <div class="cover right">
          <div class="border"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "@/mock/data";
import QingJian from "./QingJian.vue";
import { playExplosion } from "@/utils/playlottie";

export default {
  components: { QingJian },
  props: ["canOpen"],
  data() {
    return {
      data: data,
      isOpening: false,
    };
  },
  watch: {
    canOpen(val) {
      if (val) {
        setTimeout(() => {
          playExplosion(this.$refs.wedding, (evt) => {
            console.log(evt);
            console.log(this.$refs.seal.getBoundingClientRect());
            this.openInvitation();
          });
        }, 600);
      }
    },
  },
  methods: {
    openInvitation() {
      this.isOpening = true;
    },
  },
};
</script>

<style lang="less">
.wedding-invitation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(0.05);
  opacity: 0;
  transition: transform 0.8s cubic-bezier(0.26, 1.7, 0.38, 0.6),
    opacity 0.5s linear;
  background-size: 100%;
  &.invitation-bounce {
    opacity: 1;
    transform: scale(1);
  }

  .invitation-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .invitation-cover {
      position: absolute;
      width: 23rem;
      height: 36rem;
      background: url("../../static/images/lyonnette.png");
      background-color: #d65047;
      border-radius: 10px;
      box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);
      .cover-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0.5rem;

        .content-inside {
          height: 100%;
          padding: 1.2rem;
          color: #a9895d;
          background: url("../../static/images/handmade-paper.png");
          background-color: #fff1de;
          text-align: center;
          overflow: auto;
        }
      }
      .cover {
        position: absolute;
        height: 100%;
        border-radius: 10px;
        top: 0;
        background: url("../../static/images/simple-dashed.png");
        background-color: #730000;

        transition: transform 0.5s;
        transform-origin: 0 50%;
        .border {
          width: 100%;
          height: 100%;

          background: url("../../static/images/border.png");
          background-repeat: no-repeat;
          background-size: cover;
        }
        &.left {
          width: 70%;
          left: 0;
          box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
          z-index: 6;

          .title {
            position: absolute;

            width: 100%;
            height: 100%;

            transform: translateY(-10%);
          }

          .seal {
            position: absolute;
            right: -2rem;
            bottom: 25%;
            opacity: 1;
            width: 3rem;

            transform-origin: 50% 50%;
            transform: rotate(30deg) scale(2);
            transition: all 0.6s cubic-bezier(0.4, 0, 1, 1);
          }
        }
        &.right {
          right: 0;
          width: 40%;

          box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
          z-index: 5;

          transform-origin: 100% 50%;

          .border {
            background-position-x: right;
          }
        }
      }
    }
    &.invitation-down {
      .invitation-cover {
        transform: translateY(0.5rem);
        transition: transform 0.6s 0.5s;

        .cover-content {
          transform: translateY(-2rem);
          transition: transform 0.6s 0.5s;
          .content-inside {
            min-height: 100%;
            height: auto;
            overflow: unset;
            .photo {
              width: 100%;
            }
          }
        }
        .cover {
          background: url("../../static/images/lyonnette.png");
          background-color: #d65047;
          transition: transform 0.5s;
          .border {
            background: none;
          }
          &.left {
            transform: rotate3d(0, 1, 0, -140deg);
            .seal {
              opacity: 0;
            }
            .title {
              display: none;
            }
          }
          &.right {
            transform: rotate3d(0, 1, 0, 180deg);
          }
        }
      }
    }
  }
}
</style>
