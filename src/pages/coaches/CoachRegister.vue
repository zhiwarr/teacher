<template>
  <base-card> <coach-form @submit="saveData"></coach-form> </base-card>
</template>
<script>
import coachForm from "../../components/coaches/coachForm.vue";
export default {
  components: {
    coachForm,
  },
  methods: {
    saveData(coachData) {
      // this.$store.dispatch("coaches/addCoach", coachData);
      this.$store.dispatch("coaches/rigisterCoach", coachData);
      this.$router.replace("/coaches");
      console.log(this.$store.state.userId, coachData);
    },
  },
};
</script>
