<template>
  <main>
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <!-- e v-slot="slotProps" syntax is used to capture the data and components associated with the currently active route. The slotProps variable will contain information about the current route and its associated components. -->
      <transition name="route" mode="out-in">
        <!-- <component :is="slotProps.Component"></component>: Inside the transition, this line dynamically renders a component based on the slotProps.Component value. The slotProps.Component refers to the component associated with the current route, which is provided by the <router-view> component. The :is attribute is a dynamic binding that tells Vue to render the component specified in the slotProps.Component variable. -->
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/coaches");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: speeda system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
main {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
