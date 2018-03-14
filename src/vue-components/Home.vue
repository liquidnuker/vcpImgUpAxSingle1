<template>
<div id="vee-form">
  <!-- name target v-validate -->
  <form id="form" name="form" enctype="multipart/form-data" @submit="validate()">
    <div>
      <!-- file -->
      <label for="f_file">Choose file to upload</label>
      <input type="file" name="f_file"
      v-validate="'required|image'"
      v-on:change="handleFileUpload($event)" 
      accept=".jpg, .gif, .png, .jpeg" />
      <br />
      <small v-show="errors.has('f_file')" role="alert">{{ errors.first('f_file') }}</small>
      <!-- /file -->

      <!-- email -->
      <label for="email">Email</label>
      <br />
      <small v-show="errors.has('email')" role="alert">{{ errors.first('email') }}</small>
      <input id="email" v-validate="'required|email'" type="text" name="email" v-model="email">
      <!-- /email -->

      <br />
      <button type="submit">Submit</button>
      <!-- <button v-on:click="validate()">submit</button> -->
    </div>
  </form> 
  <br />
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
        file: "",
        email: ""

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
        formData.append("f_email", this.email);

        let self = this;
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
      validate: function (event) {
        
        this.$validator.validateAll().then(() => {
          // console.log("valid");
          this.submitFile();
        }).catch(() => {
          console.log("invalid");
          return false;   
        });

        event.preventDefault();

        
      }
    }
};  
</script>