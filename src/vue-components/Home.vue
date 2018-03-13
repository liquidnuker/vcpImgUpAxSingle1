<template>
<div id="vee-form">
  <!-- name target v-validate -->
  <form id="form" name="form" enctype="multipart/form-data" @submit.prevent="validateBeforeSubmit">
    <div>
      <input type="file" name="f_file"
      v-validate="'required|image'"
      v-on:change="handleFileUpload($event)"/>
      <small v-show="errors.has('f_file')" role="alert">{{ errors.first('f_file') }}</small>
      <label for="email">Email</label>
      <small v-show="errors.has('email')" role="alert">{{ errors.first('email') }}</small>
      <input id="email" v-validate="'required|email'" type="text" name="email">
      <button type="submit">Submit</button>
      <!-- <button v-on:click="submitFile()">Submit</button> -->
    </div>
  </form>  
</div>
</template>

<script>
import axios from "axios";
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import { Validator } from 'vee-validate';
const validator = new Validator();

export default {
  data() {
      return {
        file: ""
      };
    },
    mounted: function () {},
    methods: {
      handleFileUpload: function (e) {
        this.file = e.target.files[0];
        // this.file = this.$refs.file.files[0];
      },
      submitFile: function () {
        let formData = new FormData();
        formData.append("f_file", this.file);

        axios.post("./src/php/process.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(function (response) {
          console.log(response.data);
        }).catch(function () {
          console.log("error");
        });
      },
      validateBeforeSubmit: function () {
        console.dir(validator);
      }
    }
};  
</script>