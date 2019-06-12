<template>
  <div>
    <div class="modal">
      <div class="modal__bg"/>
      <div class="modal__content">
        <h2>Register</h2>
        <!--
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">E-mail</label>
            <input
              type="text"
              v-model="user.email"
              v-validate="'required|email'"
              name="email"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('email') }"
            >
            <div
              v-if="submitted && errors.has('email')"
              class="invalid-feedback"
            >{{ errors.first('email') }}</div>
          </div>
          <div class="form-group">
            <label for="pseudo">Pseudo</label>
            <input
              type="text"
              v-model="user.pseudo"
              v-validate="'required|alpha_num|alpha_dash|min:3'"
              name="pseudo"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('pseudo') }"
            >
            <div
              v-if="submitted && errors.has('pseudo')"
              class="invalid-feedback"
            >{{ errors.first('pseudo') }}</div>
          </div>
          <div class="form-group">
            <label for="wallet">Wallet address</label>
            <input
              type="text"
              v-model="user.wallet"
              v-validate="'alpha_num|size:44'"
              name="wallet"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('wallet') }"
            >
            <div
              v-if="submitted && errors.has('wallet')"
              class="invalid-feedback"
            >{{ errors.first('wallet') }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="user.password"
              v-validate="{ required: true, min: 6 }"
              name="password"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('password') }"
            >
            <div
              v-if="submitted && errors.has('password')"
              class="invalid-feedback"
            >{{ errors.first('password') }}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" :disabled="status.registering">Register</button>
            <img
              v-show="status.registering"
              src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
            >
            <router-link to="/login" class="btn btn-link">Cancel</router-link>
          </div>
        </form>
        -->
        <button @click="hideModal">closeModal</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import MultiModalMixin from '../mixins/MultiModalMixin'
  
  export default {
    name: 'Register',
    mixins: [MultiModalMixin]
  }
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.form-control {
  display: inline-block;
  width: auto;
  vertical-align: middle;
}
.invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
</style>
