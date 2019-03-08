<template>
  <div class="home">
    <div class="col-container">
      <div class="column1">
        <h2>Column 1</h2>
        <p>Some text..</p>
      </div>
      <div class="column2" >
        <h2>Column 2</h2>
        <p>Some text..</p>
        <p>Some text..</p>
        <p>Some text..</p>
                                                     
      </div>
      <div class="column3">
        <h2>Column 3</h2>
        <p>Some text..</p>
      </div>      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data(){
    return{
      menuItems: []
    }
  }
};
</script>

<style scoped>
.home {
  background: #111;

}
.col-container {
    display: table; /* Make the container element behave like a table */
    width: 80%; /* Set full-width to expand the whole page */
    margin-left:auto; 
    margin-right:auto;

}
.column1 {
    display: table-cell;
    width: 25%;
    background: #abe;

}
.column2 {
    display: table-cell;
    background: #bcf;
}
.column3 {
    display: table-cell;
    width: 25%;
    background: #abe;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .5);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}
/* Create two equal columns that floats next to each other */

</style>
