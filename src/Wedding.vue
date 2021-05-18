<template>
  <div class="wedding">
    <Editor />
  </div>
</template>

<script>
import Editor from "./components/Editor.vue";

export default {
  props: [],
  components: {
    Editor,
  },
  name: "Wedding",
};
</script>

<style lang="less">
@import "./assets/base.less";

.wedding {
  width: 980/40rem;
  margin: 0 auto;
  height: 100%;
  position: relative;
  z-index: 2;
}
</style>
