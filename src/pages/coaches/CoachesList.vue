<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls mb-flex">
          <base-button v-if="!isAuthenticated" link to="/auth?redirect=register"
            >برۆ ناوەوە بەشدار بە وەک مامۆستا</base-button
          >
          <base-button mode="outline" @click="loadCoaches(true)"
            >پەیجەکە تازە بکەرەوە</base-button
          >
          <!-- redirect is a queryParameter that holds register url -->
          <base-button
            v-if="isAuthenticated && !isCoach && !isLoading"
            link
            to="/register"
            >بەشدار بە وەک مامۆستا</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :waneName="coach.wane"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>هیچ مامۆستایەک نەدۆزرایەوە دووبارە سەردانمان بکەرەوە.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];

      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("زانستی")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("وێژەیی")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("پیشەیی")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error =
          error.message || "هەڵەیەک ڕووی دا تکایە دووبارە هەوڵبدەوە!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
