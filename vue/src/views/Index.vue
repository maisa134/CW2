<template>
  <div id="app">
    <h1>Lesson Ad Board</h1>
    <div class="sort-div">
    <p class="select-label">Sort by: </p>
    <select v-model="sort" class="select">
      <option disabled value="">Sort by</option>
      <option value="topic">Topic</option>
      <option value="location">Location</option>
      <option value="cost">Cost</option>
      <option value="spaces">Spaces</option>
    </select>
    </div>
    <div class="grid-wrap">
    <div class="grid-item" v-for="ad in products_sorted" :key="ad.id"> 
      <ul>
        <li>Topic: {{ ad.topic }}</li>
        <li>Location: {{ ad.location }}</li>
        <li>Cost: {{ ad.cost }}</li>
        <li>Spaces: {{ ad.spaces }}</li>
      </ul>
      <img class="icon" v-bind:src="ad.image" />
      <button v-on:click="add(this, ad)" :disabled="is_disabled(ad)"> Add </button>
    </div>
    </div>
    <div class="button-checkout">
    <button >
      <router-link
      class="button-text"
      :disabled="is_cart_empty"
      :event="is_cart_empty() ? '' : 'click'"
      :to="{name: 'Checkout'}">Shopping Cart</router-link></button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return{
      products: [],
      sort: "",
      cart_items: [],
    }
  },
  async created() { 
    const result = await fetch('/lessons')
          .then(response => response.json())
          .then(data => {
            console.log(data)
            return data
            });
      this.products = result;
  },
  computed:{ 
    products_sorted: function(){
      function spaces(a, b)
      {
        if (a.spaces > b.spaces)
          return 1;
        if (a.spaces < b.spaces)
          return -1;
        return 0;
      }
      function locations(a, b)
      {
        if (a.location > b.location)
          return 1;
        if (a.location < b.location)
          return -1;
        return 0;
      }
      function costs(a, b)
      {
        if (a.cost > b.cost)
          return 1;
        if (a.cost < b.cost)
          return -1;
        return 0;
      }
      function topics(a, b)
      {
        if (a.topic > b.topic)
          return 1;
        if (a.topic < b.topic)
          return -1;
      }

      if(this.sort == "topic")
      {
        var temp = this.products;
        temp.sort(topics);
        return temp;
      }
      else if(this.sort == "location")
      {
        temp = this.products;
        temp.sort(locations);
        return temp;
      }
      else if (this.sort == "cost")
      {
        temp = this.products;
        temp.sort(costs);
        return temp;
      }
      else if (this.sort == "spaces")
      {
        temp = this.products;
        temp.sort(spaces);
        return temp;
      }
      return this.products;
    }
  },
  methods:
  { 
    is_cart_empty() 
    {
      if( this.cart_items.length == 0)
      {
        return true;
      }
      else 
      {
        return false;
      }
    },
    is_disabled(product)
    {
      if (product.spaces === 0)
      {
        return true;
      }
      else
      {
        return false;
      }
    },
    add(button, product)
    { 
      if (product.spaces > 0)
      {
        product.spaces -= 1;
        this.cart_items.push({ id: product.id, topic: product.topic, location: product.location, cost: product.cost, spaces: product.spaces })

        const parsed = JSON.stringify(this.cart_items);
        localStorage.setItem('cart_items', parsed);

        const options = { 
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            id: product.id,
            topic: product.topic,
            location: product.location,
            cost: product.cost,
            spaces: product.spaces,
            image: product.image
            })
        };
        fetch("/lessons/update-lesson", options)
        .then(response => console.log(response))
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: 60,60,60;
  margin-top: 60px;
}

h1 {
  text-align: center;
}

.sort-div {
  margin-left: 50px;
  display: flex;
  align-items: center;
}

.button-text {
  font-size: 20px;
  text-decoration: none;
  color: black;
}

button {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid gray;
}

.button-checkout {
  margin: auto;
  text-align: center;
}

.select {
  font-size: 10px;
  padding: 5px;
  margin: 5px;
  text-align: center;
}

.grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
  }

.grid-item {
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    padding: 18px;
    position: relative;
    width: 15%;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.icon {
  width: 120px;
  height: 120px;
}
</style>
