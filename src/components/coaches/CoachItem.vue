<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/بۆ هەر کاتژمێرێک</h4>

    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <h2>{{ waneName }}</h2>
    <div class="actions">
      <base-button mode="outline" link :to="coachContactLink"
        >پەیوەندی بکە</base-button
      >
      <base-button link :to="coachDetailsLink">زانیاری زیاتر </base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "firstName", "lastName", "rate", "areas", "waneName"],
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    coachContactLink() {
      return this.$route.path + "/" + this.id + "/contact"; // /coaches/c1/contact
    },
    coachDetailsLink() {
      return this.$route.path + "/" + this.id; // /coaches/c1
    },
  },
  created() {
    console.log(this.waneName);
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}
h2 {
  font-size: 1.2rem;
  color: white;
  background-color: rgb(13, 3, 71);
  display: inline-block;
  padding: 0.6rem 1rem;
  border-radius: 99999px;
  margin-right: 10px;
}
h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width: 768px) {
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin: 10px 0 0 0;
  }
  .actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
