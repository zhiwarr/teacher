<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !email.isValid }">
        <label for="email">ئیمەڵ</label>
        <input
          type="email"
          id="email"
          v-model.trim="email.val"
          @focus="clearValidity('email')"
        />
        <p v-if="!email.isValid" class="invalid">تکایە ئیمەیڵەکەت داخڵبکە</p>
      </div>
      <div class="form-control" :class="{ invalid: !message.isValid }">
        <label for="message">نامە</label>
        <textarea
          id="message"
          v-model.trim="message.val"
          @focus="clearValidity('message')"
        ></textarea>
        <p v-if="!message.isValid" class="invalid">
          تکایە نامەیەک بەجێبهێڵە لە خانەی سەرەوە
        </p>
      </div>
      <div class="form-actions">
        <base-button>نامە بنێرە</base-button>
        <p v-if="!formValid">تکایە خانەکان پر بکەوە</p>
      </div>
    </form>
  </base-card>
</template>
<script>
export default {
  data() {
    return {
      email: {
        val: "",
        isValid: true,
      },
      message: {
        val: "",
        isValid: true,
      },
      formValid: true,
    };
  },
  methods: {
    formValidate() {
      this.formValid = true;
      if (!this.email.val === "" && this.email.val.includes("@")) {
        this.email.isValid = false;
        this.formValid = false;
      }
      if (this.message.val === "") {
        this.message.isValid = false;
        this.formValid = false;
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },

    submitForm() {
      this.formValidate();

      if (!this.formValid) {
        return;
      }
      this.$store.dispatch("requests/storeRequests", {
        email: this.email.val,
        message: this.message.val,
        coachId: this.$route.params.id,
      });

      this.$router.replace("/requests");
    },
  },
};
</script>
<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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

.errors {
  font-weight: bold;
  color: red;
}
.invalid label {
  color: red;
}
.invalid {
  color: red;
}
.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.actions {
  text-align: center;
}
</style>
