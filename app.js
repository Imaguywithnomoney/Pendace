const products = [
  { id: 'waterfall', name: 'Waterfall Mod', price: 1400, size: 'Length: 22cm / Weight: 15g', badge: 'Popular', image: 'images/WATERFALL_MOD_1_270x200.png' },
  { id: 'ivan', name: 'Ivan Mod', price: 700, size: 'Length: 21cm / Weight: 20g', badge: 'Heavy-weight', image: 'images/pen_4x3_white_padded_1_270x200.png' },
  { id: 'buster', name: 'Buster CYL', price: 950, size: 'Length: 21.5cm / Weight: 22g', badge: 'Pro choice', image: 'images/Buster_CYL_1_270x202.png' },
  { id: 'menowa', name: 'Menowa* VGG', price: 1200, size: 'Length: 22.2cm / Weight: 18.5g', badge: 'Elite', image: 'images/ee5ce842-6105-44d9-ad7d-2df0a1286c92_1_266x198.png' },
  { id: 'grips', name: 'Pilot Dr. Grips', price: 150, size: 'Dr. Grip grips from Pilot with various colors', badge: 'Grips', image: 'images/image_4_270x160.png' },
  { id: 'tips', name: 'Pilot Dr. Grips Tips', price: 130, size: 'Dr. Grips Tips from Pilot', badge: 'Tips', image: 'images/image_6_270x160.png' },
  { id: 'body', name: 'Pentel Color Twin Barrel', price: 100, size: 'Color Twin Barrel from Pentel', badge: 'Barrels', image: 'images/image_7_270x160.png' }
];
const state = { cart: [], favorites: [], view: 'home', user: null, searchQuery: '', builder: { name: 'Carbon Fiber Body', price: 12.99, image: 'images/image_7_270x160.png' }, payment: 'GCash' };
const credentials = { User8999: { password: 'pendace-user-2026', role: 'user' }, Admin8999: { password: 'pendace-admin-2026', role: 'admin' } };
const app = document.querySelector('#app');
const header = document.querySelector('#store-header');
const footer = document.querySelector('#store-footer');
const money = value => `₱${Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function productCard(product, compact = false) {
  const saved = state.favorites.includes(product.id);
  return `<article class="product-card" data-product-card="${product.id}" tabindex="0"><span class="badge">${product.badge}</span><button class="favorite-button ${saved ? 'is-favorite' : ''}" data-favorite="${product.id}" aria-label="${saved ? 'Remove' : 'Add'} ${product.name} from favorites">${saved ? '♥' : '♡'}</button><img src="${product.image}" alt="${product.name}" /><div class="card-content"><div class="rating">★★★★★ <span>4.9/5</span></div><h3>${product.name}</h3><p>${product.size}</p><div class="product-bottom"><strong>${money(product.price)}</strong><button class="add-button" data-add="${product.id}" aria-label="Add ${product.name}">+</button></div></div></article>`;
}
function pageHead(title, crumb = 'Home') { return `<div class="breadcrumbs"><button data-view="home">Home</button> › ${crumb}</div><h1 class="page-title">${title}</h1>`; }
function homePage() {
  return `<div class="page page-home"><section class="hero"><div class="hero-copy"><p class="eyebrow">Nationwide shipping / Version 4.0 active</p><h1>For spinners,<br /><span>By spinners.</span></h1><p>Premium pen mods crafted by Filipino modders and parts fit for every spinner. Well-balanced, weighted to specs, built for competition.</p><div class="button-row"><button class="btn dark" data-view="shop">Shop now</button><button class="btn" data-view="builder">Build your own mod</button></div><div class="stats"><div><strong>1,000</strong><small>Shipped out mods</small></div><div><strong>2,000</strong><small>Premium parts in stock</small></div><div><strong>10</strong><small>Mod collaborators</small></div></div></div><div class="schematic"><div class="scheme-head"><span>Schematic: V.09<br /></span></div><div class="pen-drawing"><i></i><i></i><i></i><i></i><i></i></div><div class="scheme-data"><span>Weight: 18.2g</span><span>Center of gravity: perfect</span></div></div></section><section class="home-section"><div class="section-head"><div><h2>Featured Pen Mods</h2><p>Hand-assembled by experts. Tuned, tested, and ready to elevate your combos.</p></div><button class="text-action" data-view="shop">View all products →</button></div><div class="product-grid">${products.slice(0, 4).map(productCard).join('')}</div></section><section class="home-section"><div class="section-head"><div><p class="eyebrow">• Pen parts</p><h2>Popular Pen Parts</h2><p>Build your own mod from scratch. We’ll take care of the modding.</p></div></div><div class="parts-grid">${products.slice(4).concat(products[1]).map(productCard).join('')}</div></section><section class="home-section"><div class="section-head"><div><p class="eyebrow">• Fresh drops</p><h2>New Arrivals</h2><p>The absolute latest creations and parts sourced from worldwide spinners.</p></div></div><div class="arrival-grid">${products.slice(4).map(productCard).join('')}</div></section><section class="why-section"><p class="eyebrow">• The Pendace advantage</p><h2 class="section-title">Why choose Pendace?</h2><div class="benefits"><article class="benefit"><span>01</span><h3>Quality Parts</h3><p>We curate only authentic, premium pen parts. No cheap replicas, guaranteed consistency.</p></article><article class="benefit"><span>02</span><h3>Custom Builds</h3><p>Every pre-made mod is tuned to microscopic precision tolerances and centered for every order.</p></article><article class="benefit"><span>03</span><h3>Fast Shipping</h3><p>All inventory is ready-to-ship. Orders leave our specialized facility within 24 hours.</p></article></div></section></div>`;
}
function shopPage() {
  return `<div class="page">${pageHead('Shop', 'Shop')}<div class="shop-layout"><aside class="filters"><div><h3>Categories</h3><div class="filter-list">${['Pen Mods','Grips','Tips','Bodies','Caps','Accessories'].map((name,i)=>`<label><input type="checkbox" ${i===0?'checked':''} /> ${name}</label>`).join('')}</div></div><hr class="filter-rule" /><div><h3>Price range</h3><div class="filter-list"><label>Min <input value="₱0" /></label><label>Max <input value="₱2,500" /></label></div></div><hr class="filter-rule" /><div><h3>Skill level</h3><div class="filter-list"><label><input type="radio" name="skill" /> Beginner</label><label><input type="radio" name="skill" checked /> Intermediate</label><label><input type="radio" name="skill" /> Advanced</label></div></div></aside><section><div class="catalog-toolbar"><span>Showing <b>24</b> products &nbsp; | &nbsp; Sort by: Most Popular</span><input id="catalog-search" placeholder="Find pen mods..." /></div><div id="catalog-grid" class="catalog-grid">${[...products,...products.slice(0,2)].map(productCard).join('')}</div></section></div></div>`;
}
builderPage = () => {
  const choices = [['Carbon Fiber Body',12.99],['Polycarbonate Clear',9.50],['Aluminum Pro',14],['Bamboo Natural',11.20],['Titanium Elite',18.50],['Acrylic Glow',13.25]];
  return `<div class="page">${pageHead('Build Your Custom Pen Mod','Pen Mod Builder')}<p class="page-subtitle">Design your perfect spinner from premium components.</p><div class="steps"><span>● Step 1<b>Select Body</b></span><span>—</span><span>2 Step 2<b>Grip Options</b></span><span>—</span><span>3 Step 3<b>Tips Material</b></span><span>—</span><span>4 Step 4<b>Caps & Extras</b></span></div><div class="builder-layout"><section><p class="eyebrow">● Select Body Component</p><div class="choice-grid">${choices.map(([name,price], index)=>`<article class="choice ${state.builder.name===name?'selected':''}"><div class="blank-img"></div><strong>${name}</strong><small>${money(price)}</small><button data-component="${index}">${state.builder.name===name?'Selected':'Select'}</button></article>`).join('')}</div></section><aside class="checkout-card"><h3>Your Custom Mod</h3><div class="summary-preview">MOD PREVIEW</div><div class="summary-lines"><div><span>Body:</span><b>${state.builder.name}</b></div><div><span>Grip:</span><em>(Not selected)</em></div><div><span>Tips:</span><em>(Not selected)</em></div><div><span>Caps:</span><em>(Not selected)</em></div></div><div class="summary-total"><span>Estimated Total</span><b>${money(state.builder.price)}</b></div><button class="btn cyan" data-add-custom>Add custom mod to cart</button><button class="btn small" data-reset-builder>Reset build</button></aside></div></div>`;
};
function cartPage() {
  const total = state.cart.reduce((sum, item) => sum + item.price, 0);
  const rows = state.cart.map((item, index) => {
    const visual = item.image ? `<img src="${item.image}" alt="" />` : '<div class="cart-placeholder">MOD</div>';
    return `<article class="cart-item">${visual}<div><h3>${item.name}</h3><p>${item.size || 'Custom configured build'}</p><button class="remove" data-remove="${index}">Remove</button></div><div><strong>${money(item.price)}</strong><p>Qty: 1</p></div></article>`;
  }).join('');
  const list = state.cart.length ? `<div class="cart-list">${rows}</div>` : '<div class="empty">Your cart is waiting for its first spin.<br /><button class="btn dark" data-view="shop">Browse the shop</button></div>';
  return `<div class="page">${pageHead('Your Cart','Cart')}<div class="cart-layout"><section>${list}</section><aside class="cart-summary"><h3>Order Summary</h3><div class="summary-lines"><div><span>Subtotal</span><b>${money(total)}</b></div><div><span>Shipping</span><em>Calculated at checkout</em></div></div><div class="summary-total"><span>Total</span><b>${money(total)}</b></div><button class="btn cyan" data-view="checkout">Proceed to checkout</button><button class="btn small" data-view="shop">Continue shopping</button></aside></div></div>`;
}
function checkoutPage() {
  const total=state.cart.reduce((sum,item)=>sum+item.price,0);
  return `<div class="page">${pageHead('Checkout','Cart / Checkout')}<div class="checkout-layout"><div><section class="form-card"><h2>┃ Delivery Information</h2><div class="form-grid"><label>First name<input value="John" /></label><label>Last name<input value="Spinner" /></label><label>Email protocol<input value="john@spinworx.com" /></label><label>Rotational dispatch phone<input value="+63 912 345 6789" /></label><label class="wide">Tactical address line 1<input value="Unit 402, Cyber Tower 1" /></label><label class="wide">Tactical address line 2<input value="Megaworld Blvd" /></label><label>City<input value="Quezon City" /></label><label>Province / state<input value="Metro Manila" /></label><label>Postal code<input value="1110" /></label><label>Country dropdown<input value="Philippines" /></label></div></section><section class="form-card" style="margin-top:14px"><h2>┃ Payment Method</h2><div class="payment-options">${['GCash','Maya','Cash on Delivery'].map(name=>`<button class="payment ${state.payment===name?'selected':''}" data-payment="${name}">${name}</button>`).join('')}</div></section></div><aside class="cart-summary"><h3>┃ Order Summary</h3>${state.cart.map(item=>`<div class="receipt-row"><span>${item.name}<br /><small>Qty: 1</small></span><b>${money(item.price)}</b></div>`).join('')}<div class="summary-total"><span>Total Allocation</span><b>${money(total)}</b></div><button class="btn cyan" data-place-order>Place order</button></aside></div></div>`;
}
function confirmationPage() { const total=state.cart.reduce((sum,item)=>sum+item.price,0); return `<div class="page"><div class="confirmation"><div class="avatar">✓</div><h1>Order Confirmed!</h1><p>Your spinning gear is on its way to the launch site!</p><div class="receipt"><div class="receipt-row"><span>Order Protocol</span><b>#SPW-2024-0847</b></div><div class="receipt-row"><span>Dispatch Date</span><b>September 23, 2026</b></div><div class="receipt-row"><span>Payment Authorized</span><b>${state.payment} secured</b></div><h3>Items dispatched</h3>${state.cart.map(item=>`<div class="receipt-row"><span>${item.name}<br /><small>Qty: 1</small></span><b>${money(item.price)}</b></div>`).join('')}<div class="summary-total"><span>Total settlement</span><b>${money(total)}</b></div></div><div class="button-row"><button class="btn dark" data-view="profile">Track order</button><button class="btn" data-view="shop">Continue shopping</button></div></div></div>`; }
function profilePage() { const username=state.user?.username||'John Spinner'; return `<div class="page">${pageHead('My Account','My Account')}<div class="profile-layout"><aside class="profile-menu"><div class="avatar">◎</div><h3>${username}</h3><p>${username.toLowerCase()}@pendace.com</p><button class="active">Account Info</button><button>Order History</button><button>Wishlist</button><button>Saved Mods</button><button>Settings</button></aside><section><div class="profile-block"><h2>Welcome back, ${username}!</h2><div class="form-grid"><div class="form-card"><h3>Personal Information</h3><div class="summary-lines"><div><span>Full name</span><b>${username}</b></div><div><span>Email address</span><b>${username.toLowerCase()}@pendace.com</b></div><div><span>Phone number</span><b>+1 (555) 019-2834</b></div></div></div><div class="form-card"><h3>Default Shipping Address</h3><div class="summary-lines"><div><span>Street address</span><b>128 Rotational Lane</b></div><div><span>City / State</span><b>San Francisco, CA</b></div><div><span>Postal / ZIP</span><b>94107</b></div></div></div></div></div><div class="profile-block"><h2>Recent Orders</h2>${['#SPW-2024-0847','#SPW-2024-0812','#SPW-2024-0798'].map((id,i)=>`<div class="order-strip"><span>Order ${id}<br /><small>Sept ${23-i*4}, 2026</small></span><b>${i===0?'₱100.95':'₱34.99'} &nbsp; <span class="status ${i===0?'yellow':'green'}">${i===0?'Processing':'Delivered'}</span></b></div>`).join('')}</div><div class="profile-block"><h2>My Wishlist</h2><div class="product-grid">${products.slice(0,3).map(productCard).join('')}</div></div></section></div></div>`; }
function loginPage() { return `<section class="login-page"><div class="login-box"><div class="avatar">P</div><p class="eyebrow">Secure account access</p><h1>Welcome back.</h1><p>Sign in to access your Pendace account.</p><form id="login-form"><label>Username<input name="username" autocomplete="username" required /></label><label>Password<input name="password" type="password" autocomplete="current-password" required /></label><p id="login-error" class="login-error"></p><button class="btn dark" type="submit">Sign in →</button></form><p>New to Pendace? <button class="text-action" data-view="signup">Create an account</button></p></div></section>`; }
function signupPage() { return `<section class="login-page"><div class="login-box"><p class="eyebrow">Create your account</p><h1>Join Pendace.</h1><p>New-account registration will connect to the secure account service in the next build.</p><button class="btn dark" data-view="login">Back to sign in</button></div></section>`; }
function aboutPage() { return `<div class="page"><p class="eyebrow">About Pendace</p><h1 class="page-title">The community<br />behind every spin.</h1><p class="page-subtitle">Pendace is built around precision, practice, and the people who keep pen spinning moving forward.</p><section class="why-section"><h2 class="section-title">Built with the<br />spinner in mind.</h2><div class="benefits"><article class="benefit"><span>01</span><h3>Filipino modders</h3><p>Designed and assembled by people who know every balance point matters.</p></article><article class="benefit"><span>02</span><h3>Practice ready</h3><p>Parts selected for dependable everyday practice and competition sessions.</p></article><article class="benefit"><span>03</span><h3>Growing community</h3><p>A shop that supports the next generation of spinners and makers.</p></article></div></section></div>`; }
function adminShell(tab='dashboard') {
  const user=state.user?.username||'Admin8999'; const labels={dashboard:'Dashboard',orders:'Orders',sales:'Sales Reports',products:'Products'}; let body='';
  if(tab==='dashboard') body=`<div class="metrics"><article class="metric"><small>Total sales</small><strong class="cyan">₱48,250</strong></article><article class="metric"><small>Total orders</small><strong>128</strong></article><article class="metric"><small>Pending orders</small><strong class="yellow">14</strong></article><article class="metric"><small>Completed orders</small><strong class="green">114</strong></article><article class="metric"><small>Total products</small><strong>45</strong></article><article class="metric"><small>Low stock products</small><strong class="red">3</strong></article></div><div class="admin-grid"><section class="admin-card"><h2>Recent Orders</h2>${adminTable()}</section><section class="admin-card"><h2>Weekly Trend</h2><div class="line-chart"></div><p><small>Peak day</small><br /><b>Friday</b></p><p class="cyan">+14.8%</p></section></div>`;
  if(tab==='orders') body=`<div class="orders-toolbar"><input placeholder="⌕ Search order ID or customer..." /><select><option>Status: All Orders</option><option>Processing</option><option>Delivered</option></select></div><section class="admin-card">${adminTable(true)}</section>`;
  if(tab==='sales') body=`<div class="metrics"><article class="metric"><small>Total revenue</small><strong class="cyan">₱48,250</strong></article><article class="metric"><small>Total orders</small><strong>128</strong></article><article class="metric"><small>Avg order value</small><strong>₱377</strong></article></div><div class="admin-grid"><section class="admin-card"><h2>Monthly Sales Trend</h2><div class="line-chart"></div></section><section class="admin-card"><h2>Sales by Category</h2>${['Pen Mods','Grips','Tips','Bodies','Caps','Accessories'].map((x,i)=>`<small>${x}</small><div class="bar"><i style="width:${94-i*11}%"></i></div>`).join('')}</section><section class="admin-card admin-wide"><h2>Best Selling Products</h2>${adminTable()}</section></div>`;
  if(tab==='products') body=`<section class="admin-card"><h2>Product inventory</h2>${products.map(product=>`<div class="receipt-row"><span>${product.name}<br /><small>${product.size}</small></span><b class="cyan">${money(product.price)}</b></div>`).join('')}</section>`;
  return `<div class="admin"><aside class="admin-sidebar"><div class="admin-brand"><img src="images/PENDACE_1_59x59.png" alt="" />PENDACE<small>Admin panel</small></div><nav>${Object.entries(labels).map(([key,label])=>`<button class="${key===tab?'active':''}" data-admin="${key}">${label}</button>`).join('')}<button data-admin="logout">Logout</button></nav></aside><section class="admin-content"><header class="admin-top"><div><h1>${labels[tab]}</h1><p>${tab==='dashboard'?'Store performance at a glance':'Manage and monitor store data'}</p></div><div class="admin-user">${user}<br /><b>Super Admin</b></div></header><main class="admin-body"><div class="admin-welcome">Welcome back, <b>${user}</b>! Here’s your current store activity.</div>${body}</main></section></div>`;
}
function adminTable(links=false) { return `<table class="admin-table"><thead><tr><th>Order #</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th>${links?'<th>Action</th>':''}</tr></thead><tbody>${[['#PEN-1024','Gabriel Santos','Sept 24, 2026','₱750','Processing'],['#PEN-1023','Julius Alvarez','Sept 23, 2026','₱450','Shipped'],['#PEN-1022','Angelo Cruz','Sept 22, 2026','₱980','Delivered'],['#PEN-1021','Maria Santos','Sept 21, 2026','₱1,200','Delivered']].map((r,i)=>`<tr><td class="cyan">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><span class="status ${i===0?'yellow':i===1?'cyan':'green'}">${r[4]}</span></td>${links?'<td><button class="btn small" data-order-detail>View</button></td>':''}</tr>`).join('')}</tbody></table>`; }
function orderDetailPage() {
  const detail = `<button class="btn small" data-admin="orders">← Back to orders</button><h2>Order #PEN-1024</h2><div class="order-details"><div class="detail-stack"><section class="admin-card"><h2>Customer Information</h2><div class="summary-lines"><div><span>Name</span><b>Gabriel Santos</b></div><div><span>Email</span><b>gabriel@email.com</b></div><div><span>Phone</span><b>+63 912 345 6789</b></div></div></section><section class="admin-card"><h2>Delivery Information</h2><p>123 Spin Street, Quezon City, Philippines 1100</p><p class="cyan">PH-TRACK-78901</p></section></div><div class="detail-stack"><section class="admin-card"><h2>Order Timeline</h2><p class="cyan">◉ Pending</p><p class="cyan">┃ Processing</p><p>○ Shipped</p><p>○ Delivered</p></section><section class="admin-card"><h2>Payment Information</h2><p>GCash</p><b class="green">Paid</b></section></div></div><section class="admin-card" style="margin-top:14px"><h2>Ordered Products</h2>${adminTable()}</section>`;
  return adminShell('orders').replace(/<div class="admin-welcome">[\s\S]*?<\/div>[\s\S]*?<\/main>/, `${detail}</main>`);
}
function render(view=state.view) { state.view=view; const isAdmin=view.startsWith('admin')||view==='order-detail'; header.hidden=isAdmin; footer.hidden=isAdmin; const pages={home:homePage,shop:shopPage,builder:builderPage,cart:cartPage,checkout:checkoutPage,confirmation:confirmationPage,profile:profilePage,login:loginPage,signup:signupPage,about:aboutPage,favorites:favoritesPage,'admin-dashboard':()=>adminShell('dashboard'),'admin-orders':()=>adminShell('orders'),'admin-sales':()=>adminShell('sales'),'admin-products':()=>adminShell('products'),'order-detail':orderDetailPage}; app.innerHTML=(pages[view]||homePage)(); updateNav(); window.scrollTo({top:0,behavior:'instant'}); app.focus(); }
function updateNav(){document.querySelector('#cart-count').textContent=state.cart.length;document.querySelectorAll('.store-nav [data-view]').forEach(button=>button.classList.toggle('active',button.dataset.view===state.view));}
function addToCart(id){const item=products.find(product=>product.id===id);if(item){state.cart.push(item);updateNav();showToast(`${item.name} added to cart.`)}}
function showToast(message){const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}
document.addEventListener('click',event=>{const view=event.target.closest('[data-view]');if(view){render(view.dataset.view);document.querySelector('#store-nav').classList.remove('open');return}const add=event.target.closest('[data-add]');if(add){addToCart(add.dataset.add);return}const remove=event.target.closest('[data-remove]');if(remove){state.cart.splice(Number(remove.dataset.remove),1);render('cart');return}const component=event.target.closest('[data-component]');if(component){const choices=[['Carbon Fiber Body',12.99],['Polycarbonate Clear',9.50],['Aluminum Pro',14],['Bamboo Natural',11.20],['Titanium Elite',18.50],['Acrylic Glow',13.25]];state.builder={name:choices[component.dataset.component][0],price:choices[component.dataset.component][1]};render('builder');return}if(event.target.closest('[data-add-custom]')){state.cart.push({name:`Custom Mod: ${state.builder.name}`,price:state.builder.price});showToast('Custom mod added to cart.');render('builder');return}if(event.target.closest('[data-reset-builder]')){state.builder={name:'Carbon Fiber Body',price:12.99};render('builder');return}const payment=event.target.closest('[data-payment]');if(payment){state.payment=payment.dataset.payment;render('checkout');return}if(event.target.closest('[data-place-order]')){if(!state.cart.length){showToast('Your cart is empty.');render('shop')}else render('confirmation');return}const admin=event.target.closest('[data-admin]');if(admin){if(admin.dataset.admin==='logout'){state.user=null;render('login')}else render(`admin-${admin.dataset.admin}`);return}if(event.target.closest('[data-order-detail]'))render('order-detail');});
document.addEventListener('input',event=>{if(event.target.id==='catalog-search'){const query=event.target.value.toLowerCase();document.querySelector('#catalog-grid').innerHTML=products.filter(product=>product.name.toLowerCase().includes(query)).map(productCard).join('')||'<div class="empty">No products matched that search.</div>'}});
document.addEventListener('submit',event=>{if(event.target.id!=='login-form')return;event.preventDefault();const data=new FormData(event.target);const username=data.get('username').trim();const account=credentials[username];if(!account||account.password!==data.get('password')){document.querySelector('#login-error').textContent='Those credentials do not match a prototype account.';return}state.user={username,role:account.role};render(account.role==='admin'?'admin-dashboard':'profile');});
document.querySelector('#mobile-menu').addEventListener('click',event=>{const nav=document.querySelector('#store-nav');nav.classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',nav.classList.contains('open'));});
checkoutPage = () => {
  const total = state.cart.reduce((sum, item) => sum + item.price, 0);
  const items = state.cart.map(item => `<div class="receipt-row"><span>${item.name}<br /><small>Qty: 1</small></span><b>${money(item.price)}</b></div>`).join('');
  const field = (label, name, type = 'text', wide = false) => `<label class="${wide ? 'wide' : ''}">${label}<input name="${name}" type="${type}" required /></label>`;
  return `<div class="page">${pageHead('Checkout','Cart / Checkout')}<form id="checkout-form"><div class="checkout-layout"><div><section class="form-card"><h2>┃ Delivery Information</h2><div class="form-grid">${field('First name', 'firstName')}${field('Last name', 'lastName')}${field('Email address', 'email', 'email')}${field('Phone number', 'phone', 'tel')}${field('Address line 1', 'address1', 'text', true)}${field('Address line 2', 'address2', 'text', true)}${field('City', 'city')}${field('Province / state', 'province')}${field('Postal code', 'postal')}${field('Country', 'country')}</div><p id="checkout-error" class="checkout-error" aria-live="polite"></p></section><section class="form-card" style="margin-top:14px"><h2>┃ Payment Method</h2><div class="payment-options">${['GCash','Maya','Cash on Delivery'].map(name => `<button type="button" class="payment ${state.payment === name ? 'selected' : ''}" data-payment="${name}">${name}</button>`).join('')}</div></section></div><aside class="cart-summary"><h3>┃ Order Summary</h3>${items}<div class="summary-total"><span>Total Allocation</span><b>${money(total)}</b></div><button type="button" class="btn cyan" data-place-order>Place order</button></aside></div></form></div>`;
};

const builderParts = [
  { name: 'Pentel Color Twin Barrel', price: 100.00, image: 'images/image_7_270x160.png' },
  { name: 'Buster CYL', price: 950.00, image: 'images/pen_4x3_white_padded_1_270x200.png' },
  { name: 'Ivan Mod', price: 700.00, image: 'images/Buster_CYL_1_270x202.png' },
  { name: 'Dong-A Comssa Marker Caps', price: 65.00, image: 'images/image_5_270x160.png' },
  { name: 'Pilot Dr. Grips Tips', price: 130.00, image: 'images/image_6_270x160.png' },
  { name: 'Pilot Dr. Grips', price: 150.00, image: 'images/image_4_270x160.png' }
];

builderPage = () => {
  const selected = builderParts.find(part => part.name === state.builder.name) || builderParts[0];
  const cards = builderParts.map((part, index) => `<article class="choice ${selected.name === part.name ? 'selected' : ''}" data-component="${index}" tabindex="0"><div class="blank-img"><img src="${part.image}" alt="${part.name}" /></div><strong>${part.name}</strong><small>${money(part.price)}</small><button data-component="${index}">${selected.name === part.name ? 'Selected' : 'Select'}</button></article>`).join('');
  return `<div class="page">${pageHead('Build Your Custom Pen Mod','Pen Mod Builder')}<p class="page-subtitle">Design your perfect spinner from premium components.</p><div class="steps"><span>● Step 1<b>Select Body</b></span><span>—</span><span>2 Step 2<b>Grip Options</b></span><span>—</span><span>3 Step 3<b>Tips Material</b></span><span>—</span><span>4 Step 4<b>Caps & Extras</b></span></div><div class="builder-layout"><section><p class="eyebrow">● Select Body Component</p><div class="choice-grid">${cards}</div></section><aside class="checkout-card"><h3>Your Custom Mod</h3><div class="summary-preview"><img src="${selected.image}" alt="${selected.name} preview" /></div><div class="summary-lines"><div><span>Body:</span><b>${selected.name}</b></div><div><span>Grip:</span><em>(Not selected)</em></div><div><span>Tips:</span><em>(Not selected)</em></div><div><span>Caps:</span><em>(Not selected)</em></div></div><div class="summary-total"><span>Estimated Total</span><b>${money(selected.price)}</b></div><button class="btn cyan builder-action-primary" data-add-custom>Add custom mod to cart</button><button class="btn builder-action-secondary" data-reset-builder>Reset build</button></aside></div></div>`;
};

const originalProfilePage = profilePage;
profilePage = () => state.user ? originalProfilePage() : loginPage();

const originalUpdateNav = updateNav;
updateNav = () => {
  originalUpdateNav();
  document.querySelector('#favorite-count').textContent = state.favorites.length;
  document.querySelector('#account-label').textContent = state.user ? state.user.username : 'Account';
};

function favoritesPage() {
  const saved = products.filter(product => state.favorites.includes(product.id));
  return `<div class="page">${pageHead('Favorites', 'Favorites')}<p class="page-subtitle">Save pen mods and parts you want to revisit.</p>${saved.length ? `<div class="product-grid">${saved.map(productCard).join('')}</div>` : '<div class="empty">You have not saved any favorites yet.<br /><button class="btn dark" data-view="shop">Explore the shop</button></div>'}</div>`;
}

document.addEventListener('click', event => {
  const favorite = event.target.closest('[data-favorite]');
  if (favorite) {
    event.stopImmediatePropagation();
    if (!state.user) { requireSignIn('Sign in to save favorites.'); return; }
    const id = favorite.dataset.favorite;
    state.favorites = state.favorites.includes(id) ? state.favorites.filter(item => item !== id) : [...state.favorites, id];
    showToast(state.favorites.includes(id) ? 'Saved to favorites.' : 'Removed from favorites.');
    render(state.view);
    return;
  }
  const account = event.target.closest('[data-account]');
  if (account) {
    event.stopImmediatePropagation();
    const menu = document.querySelector('#account-menu');
    if (!menu.hidden) { menu.hidden = true; return; }
    menu.innerHTML = state.user ? `<p>Signed in as <b>${state.user.username}</b></p><button data-account-action="profile">My account</button><button data-account-action="orders">My orders</button><button class="signout" data-account-action="signout">Sign out</button>` : '<p>You are currently signed out.</p><button data-account-action="login">Sign in</button>';
    menu.hidden = false;
    return;
  }
  const accountAction = event.target.closest('[data-account-action]');
  if (accountAction) {
    event.stopImmediatePropagation();
    document.querySelector('#account-menu').hidden = true;
    const action = accountAction.dataset.accountAction;
    if (action === 'signout') { state.user = null; showToast('You have been signed out.'); render('home'); return; }
    if (action === 'login') { render('login'); return; }
    render(action === 'orders' ? 'profile' : action);
    return;
  }
  const favorites = event.target.closest('[data-view="favorites"]');
  if (favorites) {
    event.stopImmediatePropagation();
    if (!state.user) { showToast('Sign in to view your favorites.'); render('login'); return; }
    state.view = 'favorites';
    header.hidden = false;
    footer.hidden = false;
    app.innerHTML = favoritesPage();
    updateNav();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}, true);

document.querySelector('#global-search').addEventListener('submit', event => {
  event.preventDefault();
  state.searchQuery = document.querySelector('#global-search-input').value.trim();
  render('shop');
  const search = document.querySelector('#catalog-search');
  if (search) {
    search.value = state.searchQuery;
    search.dispatchEvent(new Event('input', { bubbles: true }));
  }
});

function getTemporaryAccounts() {
  try { return JSON.parse(sessionStorage.getItem('pendaceTemporaryAccounts') || '{}'); }
  catch { return {}; }
}

function saveTemporaryAccounts(accounts) {
  sessionStorage.setItem('pendaceTemporaryAccounts', JSON.stringify(accounts));
}

loginPage = () => `<section class="login-page"><div class="login-box"><div class="avatar">P</div><p class="eyebrow">Secure account access</p><h1>Welcome back.</h1><p>Sign in to access your Pendace account.</p><form id="login-form"><label>Username<input name="username" autocomplete="username" required /></label><label>Password<input name="password" type="password" autocomplete="current-password" required /></label><p id="login-error" class="login-error"></p><button class="btn dark" type="submit">Sign in →</button></form><p>New to Pendace? <button class="text-action" data-view="signup">Create an account</button></p></div></section>`;

signupPage = () => `<section class="login-page"><div class="login-box"><p class="eyebrow">Create your account</p><h1>Join Pendace.</h1><p>Create a temporary prototype account to access the shop’s member features.</p><form id="signup-form" class="signup-form"><div class="form-row"><label>First name<input name="firstName" autocomplete="given-name" required /></label><label>Last name<input name="lastName" autocomplete="family-name" required /></label></div><label>Username<input name="username" autocomplete="username" minlength="3" required /></label><label>Email address<input name="email" type="email" autocomplete="email" required /></label><label>Password<input name="password" type="password" autocomplete="new-password" minlength="6" required /></label><label>Confirm password<input name="confirmPassword" type="password" autocomplete="new-password" minlength="6" required /></label><p id="signup-error" class="form-error"></p><button class="btn dark" type="submit">Create account</button></form><p class="auth-note">Your details stay in this browser session for this prototype and are used to validate your sign-in.</p><p>Already registered? <button class="text-action" data-view="login">Back to sign in</button></p></div></section>`;

function requireSignIn(message = 'Sign in to use this feature.') {
  if (state.user) return false;
  showToast(message);
  render('login');
  return true;
}

function selectBuilderPart(index) {
  const part = builderParts[index];
  if (!part) return;
  state.builder = { ...part };
  render('builder');
  showToast('Product Selected');
  document.querySelector('#toast').classList.add('product-selected-toast');
  setTimeout(() => document.querySelector('#toast').classList.remove('product-selected-toast'), 2300);
}

document.addEventListener('click', event => {
  const restrictedView = event.target.closest('[data-view]')?.dataset.view;
  if (['cart', 'favorites', 'checkout', 'profile'].includes(restrictedView) && requireSignIn('Sign in to access this area.')) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  if (event.target.closest('[data-add], [data-add-custom]') && requireSignIn('Sign in to add items to your cart.')) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  const favorite = event.target.closest('[data-favorite]');
  if (favorite && !state.user) {
    event.preventDefault();
    event.stopImmediatePropagation();
    requireSignIn('Sign in to save favorites.');
    return;
  }
  const component = event.target.closest('[data-component]');
  if (component) {
    event.preventDefault();
    event.stopImmediatePropagation();
    selectBuilderPart(Number(component.dataset.component));
    return;
  }
  const card = event.target.closest('[data-product-card]');
  if (card && !event.target.closest('button')) {
    const product = products.find(item => item.id === card.dataset.productCard);
    if (product) showToast(`${product.name} selected — use + to add it to your cart.`);
  }
}, true);

document.addEventListener('keydown', event => {
  if (!['Enter', ' '].includes(event.key)) return;
  const choice = event.target.closest('.choice[data-component]');
  if (!choice) return;
  event.preventDefault();
  selectBuilderPart(Number(choice.dataset.component));
});

document.addEventListener('submit', event => {
  if (event.target.id === 'signup-form') {
    event.preventDefault();
    event.stopImmediatePropagation();
    const form = new FormData(event.target);
    const username = form.get('username').trim();
    const password = form.get('password');
    const error = document.querySelector('#signup-error');
    const accounts = getTemporaryAccounts();
    if (credentials[username] || accounts[username]) { error.textContent = 'That username is already taken.'; return; }
    if (password !== form.get('confirmPassword')) { error.textContent = 'Passwords do not match.'; return; }
    accounts[username] = { password, role: 'user', firstName: form.get('firstName').trim(), lastName: form.get('lastName').trim(), email: form.get('email').trim() };
    saveTemporaryAccounts(accounts);
    showToast('Account created. Please sign in.');
    render('login');
    return;
  }
  if (event.target.id === 'login-form') {
    event.preventDefault();
    event.stopImmediatePropagation();
    const form = new FormData(event.target);
    const username = form.get('username').trim();
    const account = getTemporaryAccounts()[username] || credentials[username];
    if (!account || account.password !== form.get('password')) { document.querySelector('#login-error').textContent = 'The username or password is incorrect.'; return; }
    state.user = { username, role: account.role, ...account };
    render(account.role === 'admin' ? 'admin-dashboard' : 'profile');
  }
}, true);

Object.assign(state, {
  shopFilters: { categories: [], min: 0, max: 2500, skill: 'all', sort: 'popular', query: '' },
  savedMods: [],
  orders: [],
  settings: { darkMode: false, notifications: true, privacy: true }
});

Object.assign(products[0], { category: 'Pen Mods', skill: 'Intermediate', popularity: 98 });
Object.assign(products[1], { category: 'Pen Mods', skill: 'Beginner', popularity: 85 });
Object.assign(products[2], { category: 'Pen Mods', skill: 'Advanced', popularity: 92 });
Object.assign(products[3], { category: 'Pen Mods', skill: 'Advanced', popularity: 89 });
Object.assign(products[4], { category: 'Grips', skill: 'Beginner', popularity: 82 });
Object.assign(products[5], { category: 'Tips', skill: 'Intermediate', popularity: 80 });
Object.assign(products[6], { category: 'Bodies', skill: 'Intermediate', popularity: 77 });
products.push(
  { id: 'comssa-caps', name: 'Comssa Caps', price: 65, size: '14 colors · Dong-A Comssa marker caps', badge: 'New', image: 'images/image_5_270x160.png', category: 'Caps', skill: 'Beginner', popularity: 74 },
  { id: 'practice-kit', name: 'Spinner Practice Kit', price: 250, size: 'Parts case and practice guide', badge: 'Starter', image: 'images/ee5ce842-6105-44d9-ad7d-2df0a1286c92_1_266x198.png', category: 'Accessories', skill: 'Beginner', popularity: 70 }
);

const builderInventory = {
  bodies: [
    { id: 'colortwin', name: 'Pentel Color Twin Barrel', price: 100, image: 'images/image_7_270x160.png' },
    { id: 'polycarbonate', name: 'Clear Polycarbonate Barrel', price: 95, image: 'images/pen_4x3_white_padded_1_270x200.png' },
    { id: 'aluminum', name: 'Machined Aluminum Barrel', price: 180, image: 'images/Buster_CYL_1_270x202.png' },
    { id: 'carbon', name: 'Carbon Fiber Barrel', price: 160, image: 'images/image_7_270x160.png' }
  ],
  grips: [
    { id: 'pilot-grip', name: 'Pilot Dr. Grip Silicone Set', price: 150, image: 'images/image_4_270x160.png' },
    { id: 'hybrid-grip', name: 'Hybrid Gel Grip Pair', price: 90, image: 'images/image_4_270x160.png' },
    { id: 'comssa-grip', name: 'Comssa Soft Grip Set', price: 80, image: 'images/image_4_270x160.png' },
    { id: 'clear-grip', name: 'Clear Ring Grip Pair', price: 70, image: 'images/image_4_270x160.png' }
  ],
  tips: [
    { id: 'pilot-tip', name: 'Pilot Dr. Grip Metal Tips', price: 130, image: 'images/image_6_270x160.png' },
    { id: 'signo-tip', name: 'Signo Broad Metal Tips', price: 100, image: 'images/image_6_270x160.png' },
    { id: 'hgg-tip', name: 'HGG Precision Tip Pair', price: 110, image: 'images/image_6_270x160.png' },
    { id: 'steel-tip', name: 'Stainless Balance Tip Set', price: 160, image: 'images/image_6_270x160.png' }
  ],
  caps: [
    { id: 'comssa', name: 'Dong-A Comssa Marker Caps', price: 65, image: 'images/image_5_270x160.png' },
    { id: 'weighted-cap', name: 'Weighted Balance Cap Set', price: 120, image: 'images/image_5_270x160.png' },
    { id: 'sailor-cap', name: 'Sailor Fine Cap Pair', price: 75, image: 'images/image_5_270x160.png' },
    { id: 'metal-cap', name: 'Metal End Cap Pair', price: 140, image: 'images/image_5_270x160.png' }
  ],
  prebuilt: [
    { id: 'waterfall-build', name: 'Waterfall Mod', price: 1400, image: 'images/WATERFALL_MOD_1_270x200.png', components: ['Clear Polycarbonate Barrel', 'Pilot Dr. Grip Silicone Set', 'Signo Broad Metal Tips', 'Weighted Balance Cap Set'] },
    { id: 'buster-build', name: 'Buster CYL', price: 950, image: 'images/Buster_CYL_1_270x202.png', components: ['Machined Aluminum Barrel', 'Hybrid Gel Grip Pair', 'Pilot Dr. Grip Metal Tips', 'Dong-A Comssa Marker Caps'] },
    { id: 'menowa-build', name: 'Menowa* VGG', price: 1200, image: 'images/ee5ce842-6105-44d9-ad7d-2df0a1286c92_1_266x198.png', components: ['Carbon Fiber Barrel', 'Comssa Soft Grip Set', 'HGG Precision Tip Pair', 'Sailor Fine Cap Pair'] }
  ]
};

state.builder = { section: 'bodies', body: null, grip: null, tips: null, caps: null, special: null };

function builderTotal() {
  if (state.builder.special) return state.builder.special.price;
  return ['body', 'grip', 'tips', 'caps'].reduce((total, key) => total + (state.builder[key]?.price || 0), 0);
}

function builderPreview() {
  return state.builder.special || state.builder.body || state.builder.grip || state.builder.tips || state.builder.caps;
}

function selectBuilderItem(section, id) {
  const item = builderInventory[section]?.find(part => part.id === id);
  if (!item) return;
  if (section === 'prebuilt') {
    const [body, grip, tips, caps] = item.components;
    state.builder = { ...state.builder, special: item, body: { name: body }, grip: { name: grip }, tips: { name: tips }, caps: { name: caps } };
  } else {
    const key = section === 'bodies' ? 'body' : section === 'grips' ? 'grip' : section;
    state.builder = { ...state.builder, [key]: item, special: null };
  }
  render('builder');
  showToast('Product Selected');
  document.querySelector('#toast').classList.add('product-selected-toast');
  setTimeout(() => document.querySelector('#toast').classList.remove('product-selected-toast'), 2300);
}

builderPage = () => {
  const section = state.builder.section;
  const sectionTitle = { bodies: 'Select Body Component', grips: 'Select Grip Options', tips: 'Select Tips Material', caps: 'Select Caps & Extras', prebuilt: 'Select a Pre-Built Mod' };
  const preview = builderPreview();
  const activeItems = builderInventory[section];
  const selectedItem = section === 'prebuilt' ? state.builder.special : state.builder[section === 'bodies' ? 'body' : section];
  const cards = activeItems.map(item => `<article class="choice ${selectedItem?.id === item.id ? 'selected' : ''}" data-builder-select="${section}:${item.id}" tabindex="0"><div class="blank-img"><img src="${item.image}" alt="${item.name}" /></div><strong>${item.name}</strong><small>${money(item.price)}</small><button data-builder-select="${section}:${item.id}">${selectedItem?.id === item.id ? 'Selected' : 'Select'}</button></article>`).join('');
  const value = item => item?.name || '(Not selected)';
  const special = state.builder.special ? `<div class="builder-special"><h4>Special Parts</h4><ul>${state.builder.special.components.map(component => `<li>${component}</li>`).join('')}</ul></div>` : '';
  return `<div class="page">${pageHead('Build Your Custom Pen Mod','Pen Mod Builder')}<p class="page-subtitle">Design your perfect spinner from premium components.</p><div class="steps"><span>● Step 1<b>Select Body</b></span><span>—</span><span>2 Step 2<b>Grip Options</b></span><span>—</span><span>3 Step 3<b>Tips Material</b></span><span>—</span><span>4 Step 4<b>Caps & Extras</b></span></div><div class="builder-layout"><section><div class="builder-category-bar">${[['bodies','Body'],['grips','Grips'],['tips','Tips'],['caps','Caps'],['prebuilt','Pre-Built Mods']].map(([key,label]) => `<button class="${section === key ? 'active' : ''}" data-builder-section="${key}">${label}</button>`).join('')}</div><p class="eyebrow">● ${sectionTitle[section]}</p><p class="builder-help">Select a component to add it to your custom mod.</p><div class="choice-grid">${cards}</div></section><aside class="checkout-card"><h3>Your Custom Mod</h3><div class="summary-preview">${preview ? `<img src="${preview.image}" alt="${preview.name} preview" />` : 'MOD PREVIEW'}</div><div class="summary-lines"><div><span>Body:</span><b>${value(state.builder.body)}</b></div><div><span>Grip:</span><em>${value(state.builder.grip)}</em></div><div><span>Tips:</span><em>${value(state.builder.tips)}</em></div><div><span>Caps:</span><em>${value(state.builder.caps)}</em></div></div>${special}<div class="summary-total"><span>Estimated Total</span><b>${money(builderTotal())}</b></div><div class="builder-actions"><button class="btn cyan builder-action-primary" data-builder-action="cart">Add custom mod to cart</button><button class="btn" data-builder-action="save">Save mod</button><button class="btn builder-action-secondary" data-builder-action="reset">Reset build</button></div></aside></div></div>`;
};

function shopPage() {
  const filter = state.shopFilters;
  const categoryOptions = ['Pen Mods', 'Grips', 'Tips', 'Bodies', 'Caps', 'Accessories'];
  return `<div class="page">${pageHead('Shop', 'Shop')}<div class="shop-layout"><aside class="filters"><div><h3>Categories</h3><div class="filter-list">${categoryOptions.map(category => `<label><input type="checkbox" data-filter-category="${category}" ${filter.categories.includes(category) ? 'checked' : ''} /> ${category}</label>`).join('')}</div></div><hr class="filter-rule" /><div><h3>Price range</h3><div class="filter-list"><label>Min <input type="number" min="0" data-filter-min value="${filter.min}" /></label><label>Max <input type="number" min="0" data-filter-max value="${filter.max}" /></label></div></div><hr class="filter-rule" /><div><h3>Skill level</h3><div class="filter-list">${['all','Beginner','Intermediate','Advanced'].map(level => `<label><input type="radio" name="skill" data-filter-skill="${level}" ${filter.skill === level ? 'checked' : ''} /> ${level === 'all' ? 'All levels' : level}</label>`).join('')}</div></div><div class="filter-actions"><button data-filter-reset>Reset</button><button class="apply" data-filter-apply>Apply</button></div></aside><section><div class="catalog-toolbar"><span class="filter-count" id="filter-count"></span><input id="catalog-search" value="${filter.query}" placeholder="Find pen mods..." /><select id="catalog-sort"><option value="popular" ${filter.sort === 'popular' ? 'selected' : ''}>Most Popular</option><option value="price-low" ${filter.sort === 'price-low' ? 'selected' : ''}>Price: Low to High</option><option value="price-high" ${filter.sort === 'price-high' ? 'selected' : ''}>Price: High to Low</option><option value="name" ${filter.sort === 'name' ? 'selected' : ''}>Name: A to Z</option></select></div><div id="catalog-grid" class="catalog-grid"></div></section></div></div>`;
}

function applyShopFilters() {
  const grid = document.querySelector('#catalog-grid');
  const count = document.querySelector('#filter-count');
  if (!grid || !count) return;
  const filter = state.shopFilters;
  let result = products.filter(product => (!filter.categories.length || filter.categories.includes(product.category)) && product.price >= filter.min && product.price <= filter.max && (filter.skill === 'all' || product.skill === filter.skill) && product.name.toLowerCase().includes(filter.query.toLowerCase()));
  result = [...result].sort((a, b) => filter.sort === 'price-low' ? a.price - b.price : filter.sort === 'price-high' ? b.price - a.price : filter.sort === 'name' ? a.name.localeCompare(b.name) : b.popularity - a.popularity);
  count.textContent = `Showing ${result.length} product${result.length === 1 ? '' : 's'}`;
  grid.innerHTML = result.length ? result.map(productCard).join('') : '<div class="empty">No products match the selected filters.<br /><button class="btn dark" data-filter-reset>Clear filters</button></div>';
}

profilePage = () => {
  if (!state.user) return loginPage();
  const section = state.accountSection || 'account';
  const displayName = [state.user.firstName, state.user.lastName].filter(Boolean).join(' ') || state.user.username;
  const email = state.user.email || `${state.user.username.toLowerCase()}@pendace.com`;
  const navigation = [['account','Account Info'],['orders','Order History'],['wishlist','Wishlist'],['saved','Saved Mods'],['settings','Settings']];
  let content = '';
  if (section === 'account') content = `<div class="profile-block"><h2>Welcome back, ${displayName}!</h2><div class="form-grid"><div class="form-card"><h3>Personal Information</h3><div class="summary-lines"><div><span>Full name</span><b>${displayName}</b></div><div><span>Username</span><b>${state.user.username}</b></div><div><span>Email address</span><b>${email}</b></div></div></div><div class="form-card"><h3>Account Status</h3><div class="summary-lines"><div><span>Member type</span><b>Spinner</b></div><div><span>Saved favorites</span><b>${state.favorites.length}</b></div><div><span>Cart items</span><b>${state.cart.length}</b></div></div></div></div></div>`;
  if (section === 'orders') content = `<div class="profile-block"><h2>Order History</h2>${state.orders.length ? state.orders.map(order => `<article class="saved-mod"><div><b>${order.id}</b><p>${order.date} · ${order.items} item${order.items === 1 ? '' : 's'} · ${order.payment}</p></div><div><b>${money(order.total)}</b><br /><span class="status cyan">${order.status}</span></div></article>`).join('') : '<div class="empty">You have not placed an order yet.<br /><button class="btn dark" data-view="shop">Explore the shop</button></div>'}</div>`;
  if (section === 'wishlist') { const saved = products.filter(product => state.favorites.includes(product.id)); content = `<div class="profile-block"><h2>Wishlist</h2>${saved.length ? `<div class="product-grid">${saved.map(productCard).join('')}</div>` : '<div class="empty">Your wishlist is empty.<br /><button class="btn dark" data-view="shop">Explore the shop</button></div>'}</div>`; }
  if (section === 'saved') content = `<div class="profile-block"><h2>Saved Mods</h2>${state.savedMods.length ? state.savedMods.map((mod, index) => `<article class="saved-mod"><div><b>${mod.name}</b><p>${mod.parts}</p></div><div><b>${money(mod.price)}</b><br /><button class="btn small" data-reorder-mod="${index}">Add to cart</button></div></article>`).join('') : '<div class="empty">Save a custom mod from the builder to keep it here.<br /><button class="btn dark" data-view="builder">Open builder</button></div>'}</div>`;
  if (section === 'settings') content = `<div class="profile-block"><h2>Settings</h2><div class="settings-panel"><label class="settings-option"><span><h3>Dark Mode</h3><p>Use the darker Pendace interface.</p></span><input type="checkbox" data-setting="darkMode" ${state.settings.darkMode ? 'checked' : ''} /></label><label class="settings-option"><span><h3>Order Notifications</h3><p>Receive updates for orders and saved mods.</p></span><input type="checkbox" data-setting="notifications" ${state.settings.notifications ? 'checked' : ''} /></label><label class="settings-option"><span><h3>Private Profile</h3><p>Keep your account information private.</p></span><input type="checkbox" data-setting="privacy" ${state.settings.privacy ? 'checked' : ''} /></label><div class="settings-option"><span><h3>Account preferences</h3><p>Member account: ${state.user.username}</p></span><button class="btn small" data-account-signout>Sign out</button></div></div></div>`;
  return `<div class="page">${pageHead('My Account','My Account')}<div class="profile-layout"><aside class="profile-menu"><div class="avatar">◎</div><h3>${displayName}</h3><p>${email}</p>${navigation.map(([key,label]) => `<button class="${section === key ? 'active' : ''}" data-account-section="${key}">${label}</button>`).join('')}</aside><section>${content}</section></div></div>`;
};

document.addEventListener('click', event => {
  const section = event.target.closest('[data-builder-section]');
  if (section) { event.preventDefault(); event.stopImmediatePropagation(); state.builder.section = section.dataset.builderSection; render('builder'); return; }
  const selection = event.target.closest('[data-builder-select]');
  if (selection) { event.preventDefault(); event.stopImmediatePropagation(); const [part, id] = selection.dataset.builderSelect.split(':'); selectBuilderItem(part, id); return; }
  const action = event.target.closest('[data-builder-action]')?.dataset.builderAction;
  if (action) {
    event.preventDefault(); event.stopImmediatePropagation();
    if (action === 'reset') { state.builder = { section: 'bodies', body: null, grip: null, tips: null, caps: null, special: null }; render('builder'); return; }
    if (requireSignIn(action === 'save' ? 'Sign in to save a custom mod.' : 'Sign in to add a custom mod to your cart.')) return;
    const preview = builderPreview();
    if (!preview) { showToast('Select at least one part first.'); return; }
    const parts = ['body','grip','tips','caps'].map(key => state.builder[key]?.name).filter(Boolean).join(' · ');
    const mod = { name: state.builder.special ? state.builder.special.name : 'Custom Pen Mod', price: builderTotal(), image: preview.image, parts };
    if (action === 'save') { state.savedMods.push(mod); showToast('Custom mod saved.'); render('profile'); }
    else { state.cart.push(mod); updateNav(); showToast('Custom mod added to cart.'); render('cart'); }
    return;
  }
  const accountSection = event.target.closest('[data-account-section]');
  if (accountSection) { event.preventDefault(); event.stopImmediatePropagation(); state.accountSection = accountSection.dataset.accountSection; render('profile'); return; }
  if (event.target.closest('[data-account-signout]')) { event.preventDefault(); event.stopImmediatePropagation(); state.user = null; state.accountSection = 'account'; showToast('You have been signed out.'); render('home'); return; }
  const reorder = event.target.closest('[data-reorder-mod]');
  if (reorder) { event.preventDefault(); event.stopImmediatePropagation(); const mod = state.savedMods[Number(reorder.dataset.reorderMod)]; if (mod) { state.cart.push(mod); updateNav(); showToast('Saved mod added to cart.'); } return; }
  if (event.target.closest('[data-filter-apply]')) { event.preventDefault(); event.stopImmediatePropagation(); applyShopFilters(); return; }
  if (event.target.closest('[data-filter-reset]')) { event.preventDefault(); event.stopImmediatePropagation(); state.shopFilters = { categories: [], min: 0, max: 2500, skill: 'all', sort: 'popular', query: '' }; render('shop'); applyShopFilters(); return; }
}, true);

document.addEventListener('change', event => {
  if (event.target.matches('[data-filter-category]')) { const category = event.target.dataset.filterCategory; state.shopFilters.categories = event.target.checked ? [...new Set([...state.shopFilters.categories, category])] : state.shopFilters.categories.filter(item => item !== category); applyShopFilters(); }
  if (event.target.matches('[data-filter-min]')) { state.shopFilters.min = Math.max(0, Number(event.target.value) || 0); applyShopFilters(); }
  if (event.target.matches('[data-filter-max]')) { state.shopFilters.max = Math.max(state.shopFilters.min, Number(event.target.value) || 0); applyShopFilters(); }
  if (event.target.matches('[data-filter-skill]')) { state.shopFilters.skill = event.target.dataset.filterSkill; applyShopFilters(); }
  if (event.target.id === 'catalog-sort') { state.shopFilters.sort = event.target.value; applyShopFilters(); }
  if (event.target.matches('[data-setting]')) { state.settings[event.target.dataset.setting] = event.target.checked; document.body.classList.toggle('dark-mode', state.settings.darkMode); }
}, true);

document.addEventListener('input', event => {
  if (event.target.id === 'catalog-search') { event.stopImmediatePropagation(); state.shopFilters.query = event.target.value; applyShopFilters(); }
}, true);

function placeOrder() {
  const form = document.querySelector('#checkout-form');
  if (!form) return;
  if (!form.checkValidity()) {
    document.querySelector('#checkout-error').textContent = 'Complete every delivery field before placing your order.';
    form.reportValidity();
    return;
  }
  const total = state.cart.reduce((sum, item) => sum + item.price, 0);
  const order = { id: `#PEN-${String(1025 + state.orders.length).padStart(4, '0')}`, date: new Intl.DateTimeFormat('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date()), items: state.cart.length, total, payment: state.payment, status: 'Processing' };
  state.orders.unshift(order);
  state.latestOrder = { ...order, products: [...state.cart] };
  state.cart = [];
  updateNav();
  render('confirmation');
}

document.addEventListener('click', event => {
  if (!event.target.closest('[data-place-order]')) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  placeOrder();
}, true);

document.addEventListener('submit', event => {
  if (event.target.id !== 'checkout-form') return;
  event.preventDefault();
  event.stopImmediatePropagation();
  placeOrder();
}, true);

confirmationPage = () => {
  const order = state.latestOrder;
  if (!order) return `<div class="page"><div class="confirmation"><h1>No order to confirm.</h1><button class="btn dark" data-view="shop">Return to shop</button></div></div>`;
  return `<div class="page"><div class="confirmation"><div class="avatar">✓</div><h1>Order Confirmed!</h1><p>Your spinning gear is on its way to the launch site.</p><div class="receipt"><div class="receipt-row"><span>Order Protocol</span><b>${order.id}</b></div><div class="receipt-row"><span>Order Date</span><b>${order.date}</b></div><div class="receipt-row"><span>Payment Authorized</span><b>${order.payment}</b></div><h3>Items dispatched</h3>${order.products.map(item => `<div class="receipt-row"><span>${item.name}<br /><small>Qty: 1</small></span><b>${money(item.price)}</b></div>`).join('')}<div class="summary-total"><span>Total settlement</span><b>${money(order.total)}</b></div></div><div class="button-row"><button class="btn dark" data-account-section="orders">Track order</button><button class="btn" data-view="shop">Continue shopping</button></div></div></div>`;
};

const originalRender = render;
render = view => { originalRender(view); if (state.view === 'shop') applyShopFilters(); document.body.classList.toggle('dark-mode', state.settings.darkMode); };

render();
