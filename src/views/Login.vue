<template>
  <div class="modal">
    <div class="modal__bg" />
    <div class="modal__content">
      <h2>Login</h2>
      <!--
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            v-model="username"
            name="username"
            class="form-control"
            :class="{ 'is-invalid': submitted && !username }"
          >
          <div
            v-show="submitted && !username"
            class="invalid-feedback"
          >
            Username is required
          </div>
        </div>
        <div class="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            v-model="password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && !password }"
          >
          <div
            v-show="submitted && !password"
            class="invalid-feedback"
          >
            Password is required
          </div>
        </div>
        <div class="form-group">
          <button
            class="btn btn-primary"
            :disabled="status.loggingIn"
          >
            Login
          </button>
          <img
            v-show="status.loggingIn"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          >
          <router-link
            to="/register"
            class="btn btn-link"
          >
            Register
          </router-link>
        </div>
      </form>
      -->
      <button @click="hideModal">closeModal</button>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import MultiModalMixin from '../mixins/MultiModalMixin'

  export default {
    name: 'Login',
    mixins: [MultiModalMixin]
  }
</script>

<style scoped>
.form-group{
    margin-bottom:1rem
}
.form-control{
    display:inline-block;
    width:auto;
    vertical-align:middle
}
.invalid-feedback{
    display:none;
    width:100%;
    margin-top:.25rem;
    font-size:80%;
    color:#dc3545
}
.btn {
    display:inline-block;
    font-weight:400;
    text-align:center;
    white-space:nowrap;
    vertical-align:middle;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    border:1px solid transparent;
    padding:.375rem .75rem;
    font-size:1rem;
    line-height:1.5;
    border-radius:.25rem;
    transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out
}
.btn-primary {
    color:#fff;
    background-color:#007bff;
    border-color:#007bff
}
.btn-primary:hover {
    color:#fff;
    background-color:#0069d9;
    border-color:#0062cc
}
</style>
