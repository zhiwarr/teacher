<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/coaches">گشت مامۆستاکان</router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link to="/requests">داواکاریەکانت</router-link>
        </li>

        <li v-else>
          <router-link to="/auth"> خۆت تۆمار بکە </router-link>
        </li>
        <li v-if="isAuthenticated">
          <base-button mode="outline" @click="logout">چوونە دەرەوە</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/coaches");
    },
  },
};
</script>
<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
@media screen and (max-width: 768px) {
  li {
    margin: 0;
  }
  a {
    font-size: 0.8rem;
    padding: 0;
  }
}
</style>
