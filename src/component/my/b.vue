<style>
.red {
  color: blue;

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
  name: "b",
  data() {
    return {
      msg: moment().format("YYYY-MM-DD HH:mm:ss") + " this is bb"
    };
  },
  methods: {
    test() {
      alert("fds");
    }
  }
};
</script> 