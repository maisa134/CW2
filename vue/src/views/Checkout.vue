<template>
  <div id="app">
    <router-view></router-view>
    <div class="main">
    <h1>Checkout</h1>
    <p>Enter your details:</p>
    <p>Name   <input v-model="name"></p>
    <p>Phone number   <input v-model="number"></p>
    <button :disabled="is_disabled()" v-on:click="message">Checkout</button>

    
    <h2>Your cart items</h2>
    <div v-for="lesson in cart_items" :key="lesson.id"> 
      <ul>
        <li>Topic: {{ lesson.topic}}</li>
        <li>Location: {{ lesson.location}} </li>
        <li>Cost: {{ lesson.cost}}</li>
        <li>Spaces: {{ lesson.spaces}}</li>
      </ul>
      <button class="button"  v-on:click="remove(lesson)" >Remove</button>
    </div>
    <button>
      <router-link to="/">Back to Index</router-link>
    </button>     

    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      cart_items: [],
      name: "",
      number: "",
    };
  },
  mounted() 
  {
    if (localStorage.getItem('cart_items')) 
    {
        this.cart_items = JSON.parse(localStorage.getItem('cart_items'));
    }
  },
  methods: {
    is_disabled() 
    {
      const letters_only = /^[a-zA-Z]+$/;
      const numbers_only = /^[0-9]+$/;
      if ( this.name && this.number)
      {
        if( !this.name.match(letters_only) || !this.number.match(numbers_only) )
        {
          return true;
        }
        return false;
      }
      else 
      {
        return true;
      }
    },
    message: function()
    {
      var array_length = this.cart_items.length;
      var product = this.cart_items[0];
      for (var i = 0; i < array_length; i++) {
        product = this.cart_items[i];

        const requestOptions = { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: product.id, 
            name: this.name,
            number: this.number,
            spaces: product.spaces,
            })
        };
        fetch("/orders", requestOptions)
        .then(response => console.log(response))
        .then(data => console.log(data))
      }
      
      alert(this.name + ", thank you. Your order has been submitted"); 
    },
  }
}
</script>

<style scoped>
.main {
  text-align: center;
}

.grid-item {
    align-items: center;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-bottom: 2%;
    padding: 18px;
    position: relative;
    width: 15%;
}


</style>