<style>
.red {
  color: #f00;
}
</style>
 
<template>
  <div>
    <h1 class="red">{{msg}}</h1>
    <button @click="test">test</button>
  </div>
</template>
 
<script>
import moment from "moment";
export default {
  name: "test",
  data() {
    return {
      msg: moment().format("YYYY-MM-DD HH:mm:ss") + " bbb"
    };
  },
  methods: {
    test() {
      alert("fds");
    }
  }
};
</script> 