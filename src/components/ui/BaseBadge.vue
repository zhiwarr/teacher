<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.زانستی {
  background-color: #3d008d;
  color: white;
}

.وێژەیی {
  background-color: #71008d;
  color: white;
}

.پیشەیی {
  background-color: #8d006e;
  color: white;
}
</style>
