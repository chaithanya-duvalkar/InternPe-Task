// Product Data (12 products)
const products = [
  {id:1, name:"Wireless Headphones", price:1999, category:"Electronics", img:"wirelessheadphone.jpg"},
  {id:2, name:"Smartphone", price:14999, category:"Electronics", img:"Smartphone.jpg"},
  {id:3, name:"Sports Shoes", price:2999, category:"Clothing", img:"SportsShoes.jpg"},
  {id:4, name:"Backpack", price:1299, category:"Clothing", img:"Backpack.jpg"},
  {id:5, name:"Smart Watch", price:3999, category:"Electronics", img:"smartwatch.jpg"},
  {id:6, name:"Gaming Laptop", price:59999, category:"Electronics", img:"gaminglaptop.jpg"},
  {id:7, name:"Bluetooth Speaker", price:2499, category:"Electronics", img:"bluetoothspeaker.jpg"},
  {id:8, name:"Digital Camera", price:21999, category:"Electronics", img:"digitalcamera.jpg"},
  {id:9, name:"Office Chair", price:6999, category:"Home", img:"officechair.jpg"},
  {id:10, name:"Microwave Oven", price:8499, category:"Home", img:"microwave.jpg"},
  {id:11, name:"Coffee Maker", price:3499, category:"Home", img:"coffeemaker.jpg"},
  {id:12, name:"Toy Car Set", price:999, category:"Toys", img:"toycarset.jpg"}
];

// Cart & Wishlist
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// DOM Elements
const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const wishlistCount = document.getElementById("wishlist-count");

// Display Products
function displayProducts(items){
  productList.innerHTML = "";
  items.forEach(p=>{
    productList.innerHTML += `
      <div class="product-card">
        <button class="wishlist-btn" onclick="toggleWishlist(${p.id})">${wishlist.some(w=>w.id===p.id)?'❤️':'🤍'}</button>
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}
displayProducts(products);

// Cart Functions
function addToCart(id){
  const product = products.find(p=>p.id===id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCounts();
}

// Wishlist Functions
function toggleWishlist(id){
  const product = products.find(p=>p.id===id);
  if(wishlist.some(w=>w.id===id)){
    wishlist = wishlist.filter(w=>w.id!==id);
  } else {
    wishlist.push(product);
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  displayProducts(products);
  updateCounts();
}

// Update Counts
function updateCounts(){
  cartCount.innerText = cart.length;
  wishlistCount.innerText = wishlist.length;
}
updateCounts();

// Search Functionality
document.getElementById("search").addEventListener("input",(e)=>{
  const val = e.target.value.toLowerCase();
  const filtered = products.filter(p=>p.name.toLowerCase().includes(val));
  displayProducts(filtered);
});

// Category Filter
document.querySelectorAll(".category-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".category-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.dataset.category;
    const filtered = category==="All"?products:products.filter(p=>p.category===category);
    displayProducts(filtered);
  });
});

// Sort by price
document.getElementById("sort").addEventListener("change",(e)=>{
  let sorted = [...products];
  if(e.target.value==="low") sorted.sort((a,b)=>a.price-b.price);
  if(e.target.value==="high") sorted.sort((a,b)=>b.price-a.price);
  displayProducts(sorted);
});
