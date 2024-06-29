<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">ناو</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">تکایە ناوت بنوسە!</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">ناوی باوک</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">تکایە ناوی باوکت بنوسە!</p>
    </div>
    <div class="form-control" :class="{ invalid: !waneName.isValid }">
      <label for="lastname">مامۆستای وانە</label>
      <input
        type="text"
        id="waneName"
        v-model.trim="waneName.val"
        @blur="clearValidity('waneName')"
      />
      <p v-if="!waneName.isValid">تکایە ناوی وانەکە بنوسە!</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">زانیاری زیاتر</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">پێویستە ئەم بۆشایە پر بکەیتەوە!</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">نرخی بۆ هەر کاتژمێرێک</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.val"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid">نرخەکە پێویستە لە سەروو سفرەوە بێت!</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>مامۆستا لە</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="زانستی"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">زانستی</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="وێژەیی"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">وێژەیی</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="پیشەیی"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">پیشەیی</label>
      </div>
      <p v-if="!areas.isValid">تکایە پسوۆریەکەت دیاری بکە !</p>
    </div>
    <p v-if="!formIsValid">
      هەڵەیەک هەیە لە فۆرمەکەتدا تکایە دووبارە هەوڵبدەوە
    </p>
    <base-button>بەشداری کردن</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      waneName: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.waneName.val === "") {
        this.waneName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        wane: this.waneName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };

      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
