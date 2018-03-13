<template>
  <div>
    <p>vc-page-globalerr404</p>
    <p>path: {{$route.path}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  mounted: function () {
    console.log("global404 mounted");
  }
}
</script>