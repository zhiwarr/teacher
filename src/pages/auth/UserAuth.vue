<template>
  <base-card>
    <base-dialog fixed :show="isLoading" title="چاوەڕوانبە...">
      <p>چاوەڕوان بە.....</p>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog
      :show="!!error"
      @close="handleError"
      title="هەڵەیەک هەیە تایە دووبارە هەوڵبدەوە"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">ئیـمەیڵ</label>
        <input
          type="email"
          id="email"
          placeholder="something....@gmail.something"
          v-model.trim="email"
        />
      </div>
      <div class="form-control">
        <label for="password">وشەی نهێنیی</label>
        <input
          type="password"
          id="password"
          placeholder="something*****"
          v-model.trim="password"
        />
      </div>
      <p v-if="!formIsValid">
        تکایە پاسوۆردەکە با لە شەش پیت یان ژمارە کەمتر نەبێت!🙂
      </p>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">{{
        switchModeButtonCaption
      }}</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "چوونەژوورەوە";
      } else {
        return "خۆت تۆمار بکە";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "ئەکاونتت نییە؟خۆت تۆمار بکە";
      } else {
        return "ئەکاونتت هەیە؟بچۆ ژوورەوە";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      this.isLoading = true;
      if (this.email === "" || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }
      // send http request...
      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
        const urlRedirect = "/" + (this.$route.query.redirect || "coaches");
        this.$router.replace(urlRedirect);
      } catch (err) {
        this.error = err.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
