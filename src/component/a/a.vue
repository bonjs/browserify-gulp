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
      msg: moment().format("YYYY-MM-DD HH:mm:ss") + "哈哈"
    };
  },
  methods: {
    test() {
      alert("fds");
    }
  }
};
</script> 