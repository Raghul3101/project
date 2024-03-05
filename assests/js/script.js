//HOME PAGE

var picInd = 0;
showPics(picInd);
function nextPic(n){
    showPics(picInd += n);
    document.getElementById("prog").value=0;
}
function showPics(n){
    let i;
    let pic = document.getElementsByClassName("imag");
    if (n > pic.length){
        picInd = 1;
    }
    else if (n < 1){
        picInd = pic.length;
    }
    for (i=0; i<pic.length; i++){
        pic[i].style.display = "none";
    }
    pic[picInd-1].style.display = "block";
    document.getElementById("prog").value=0;
    smoothProgressBar(3000);
}
var interval;
function auto(n=1){
    interval = setTimeout(auto, 3000);
    nextPic(n);
}
auto();
function smoothProgressBar(duration) {
    var progressBar = document.getElementById("prog");
    var startValue = parseInt(progressBar.value, 10);
    var endValue = 100;
    var startTime = null;

    function animateProgress(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }

      var progress = timestamp - startTime;
      var percentage = Math.min(progress / duration, 1);
      progressBar.value = startValue + percentage * (endValue - startValue);

      if (progress < duration) {
        requestAnimationFrame(animateProgress);
      }
    }
    requestAnimationFrame(animateProgress);
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//-------------------------------------------------------------------------------------------
//STORE PAGE
function search(){
    let inp;
    const input1 = document.getElementById('search-input');
    const input2 = document.getElementById('searchInput');
    if (input1.value) {
        inp = input1.value;
    }
    else{
        inp = input2.value;
    }
    const products = document.querySelectorAll('.product-box');
    let pattern = new RegExp(inp, "i");
    if (inp != ""){
        products.forEach(function(product){
            const id = product.getAttribute('data-id');
            if (id.match(pattern) != null){
                product.style.display="block";
                product.style.height="fit-content";
            }
            else{
                product.style.display="none";
            }
        });
    }
    else{
        products.forEach(function(product){
            product.style.display="block";
        });
    }
}
function searchClick(){
    document.getElementById('searchDiv').style.display="flex";
    document.getElementById('searchInput').focus();
    document.getElementById('searchIcon').style.display = "none";
}
function cl(){
    document.getElementById('searchDiv').style.display="none";
    document.getElementById('searchIcon').style.display = "block";
}

function addToCart(img, brand, pid, price, available, size) {
    const popupContainer = document.getElementById('popup');
    popupContainer.classList.add('active');
    var qty = 1;
    var psize = 0;
    setTimeout(() => {
        popupContainer.classList.remove('active');
    }, 1400);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
        img,
        brand,
        pid,
        price,
        qty,
        available,
        size,
        psize
    });
    document.getElementById('cart-count').style.display = 'block';
    document.getElementById('cart-count').innerHTML = cart.length;
    localStorage.setItem('cart',JSON.stringify(cart));
}
function outOfStock(pid){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach((item,i) =>{
        if (item.pid == pid){
            item.available=false;
            console.log("Yes");
        }
    });
}
function check(){
    var checkboxMen = document.getElementById('checkMen');
    var checkboxWomen = document.getElementById('checkWomen');
    var checkboxKids = document.getElementById('checkKids');
    var availableOnly = document.getElementById('available-only');
    var checkboxPride = document.getElementById('checkPride');
    var checkboxStyle = document.getElementById('checkStyle');
    const products = document.querySelectorAll('.product-box');
    products.forEach(function(product){
        const gender = product.getAttribute('data-gender'); 
        const available = product.getAttribute('data-available');
        const brand = product.getAttribute('data-brand');
        if (availableOnly.checked){
            if(checkboxMen.checked && gender == 'm' && available){
                product.style.display="block";
            }
            else if(checkboxWomen.checked && gender == 'w' && available){
                product.style.display="block";
            }
            else if(checkboxKids.checked && gender == 'k' && available){
                product.style.display="block";
            }
            else if(!checkboxMen.checked && !checkboxWomen.checked && !checkboxKids.checked/* && !checkboxPride.checked && !checkboxStyle.checked*/ && available){
                product.style.display="block";
            }
            else{
                product.style.display="none";
            }
        }
        else if(checkboxPride.checked && brand.toLowerCase()=='vkc pride'){
            if(checkboxMen.checked && gender == 'm'){
                product.style.display="block";
            }
            else if(checkboxWomen.checked && gender == 'w'){
                product.style.display="block";
            }
            else if(checkboxKids.checked && gender == 'k'){
                product.style.display="block";
            }
            else if(!checkboxMen.checked && !checkboxWomen.checked && !checkboxKids.checked){
                product.style.display="block";
            }
            else{
                product.style.display="none";
            }
        }
        else if(checkboxStyle.checked && brand.toLowerCase()=='vkc style' || brand.toLowerCase() == 'vkc stile'){
            if(checkboxMen.checked && gender == 'm'){
                product.style.display="block";
            }
            else if(checkboxWomen.checked && gender == 'w'){
                product.style.display="block";
            }
            else if(checkboxKids.checked && gender == 'k'){
                product.style.display="block";
            }
            else if(!checkboxMen.checked && !checkboxWomen.checked && !checkboxKids.checked){
                product.style.display="block";
            }
            else{
                product.style.display="none";
            }
        }
        else{
            if(checkboxMen.checked && gender == 'm' && !checkboxPride.checked && !checkboxStyle.checked){
                product.style.display="block";
            }
            else if(checkboxWomen.checked && gender == 'w' && !checkboxPride.checked && !checkboxStyle.checked){
                product.style.display="block";
            }
            else if(checkboxKids.checked && gender == 'k' && !checkboxPride.checked && !checkboxStyle.checked){
                product.style.display="block";
            }
            else if(!checkboxMen.checked && !checkboxWomen.checked && !checkboxKids.checked && !checkboxPride.checked && !checkboxStyle.checked){
                product.style.display="block";
            }
            else{
                product.style.display="none";
            }
        }
    });
}
function reset(){
    const products = document.querySelectorAll('.product-box');
    var availableOnly = document.getElementById('available-only');
    products.forEach(function(product){
        const available = product.getAttribute('data-available');
        if(availableOnly.checked){
            if (available){
                product.style.display="block";
            }
        }
        else{
            product.style.display="block";
        }
    });
    var checkboxMen = document.getElementById('checkMen');
    var checkboxWomen = document.getElementById('checkWomen');
    var checkboxKids = document.getElementById('checkKids');
    var checkboxPride = document.getElementById('checkPride');
    var checkboxStyle = document.getElementById('checkStyle');
    if (checkboxMen.checked){
        checkboxMen.checked = false;
    }
    if (checkboxWomen.checked){
        checkboxWomen.checked = false;
    }
    if (checkboxKids.checked){
        checkboxKids.checked = false;
    }
    if (checkboxPride.checked){
        checkboxPride.checked = false;
    }
    if (checkboxStyle.checked){
        checkboxStyle.checked = false;
    }
}

//-------------------------------------------------------------------------
//CART PAGE
function subtotal(qty,price){
    return price*qty;
}
function displayCart(){
    var sub = 0;
    const cartTable = document.getElementById('cartTable');
    const cartElements = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartElements.innerHTML = '';
    if (cart.length == 0){
        document.getElementById('total-section').style.display = "none";
        document.getElementById('cart-heading').innerHTML = "Cart is Empty";
        document.getElementById('cart-heading').style.textAlign = "center";
        document.getElementById('cart-heading').style.paddingTop = "55px";
        document.getElementById('cart-heading').style.fontFamily = "Spartan";
        document.getElementById('cart-heading').style.fontSize = "23px";
        document.getElementById('cart-heading').style.color = "gray";
    }
    cart.forEach((item, i) => {
        if (item.available){
            var sizes = item.size.split(',').map(Number);
            console.log(item.psize);
            const row = document.createElement('tr');
            var tableRow  = '';
            tableRow = `
            <td><a onclick="removeProduct(${i})"><i id = "x-icon" class = "far fa-times-circle"></i></a></td>
            <td><div class="cart-prod-img-div"><img class = "cart-prod-img" src = "${item.img}"></div></td>
            <td>${item.pid}</td>
            <td>${item.brand}</td>
            <td>
            <div class="custom-select-wrapper">
                <script src="{% static 'js/script.js' %}"></script>
                <div class="custom-select" id="sizeSelector" onclick="sizes(${i})">`;
            if (item.psize == 0){
                tableRow += `Select Size&nbsp;∨`;
            }
            else{
                tableRow += `${item.psize}`;
            }

            tableRow += `</div>
                <div class="custom-options">
                <div class="custom-option${i} custom-option" data-value="all" onclick="sizes(${i})">All Sizes</div>`;
            sizes.forEach(j => {
                console.log(j);
                tableRow += `<div class="custom-option${i} custom-option" data-value="${j}" onclick="sizes(${i})">${j}</div>`
            });
            tableRow += `
                </div>
            </div>
            </td>`;
            if (item.psize == "All Sizes"){
                tableRow += `<td id="priceColumn">₹${item.price*item.size.split(',').length}</td>`;
            }
            else{
                tableRow += `<td id="priceColumn">₹${item.price}</td>`;
            }
            tableRow += `<td><div class = "qty-column">
                    <button class="minus" onclick="decrement(${i})">-</button>
                    <p id = "qty-display" onclick="changeToInput(${i})">${item.qty}</p>
                    <button class="plus" onclick="increment(${i})">+</button>
                </div></td>`;
            if (item.psize == "All Sizes"){
                tableRow += `<td id="subtotalColumn">₹${item.qty*item.price*item.size.split(',').length}</td>`;
            }
            else{
                tableRow += `<td id="subtotalColumn">₹${item.qty*item.price}</td>`;
            }
            row.innerHTML=tableRow;
            cartElements.appendChild(row);
            if(item.psize == "All Sizes"){
                sub += (item.qty*item.price*item.size.split(',').length);
            }
            else{
                sub += (item.qty*item.price);
            }
        }
    });
    cartTable.style.display = cart.length > 0 ? 'table' : 'none';
    cartTotal(sub);
}

function removeProduct(i){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(i,1);
    localStorage.setItem('cart',JSON.stringify(cart));
    displayCart();
}

function cartTotal(sub){
    document.getElementById('cart-subtotal').innerHTML = "₹"+sub;
    document.getElementById('cart-total').innerHTML = `<strong>₹${sub}</strong>`;
}
function increment(i){
    const priceColumn = document.querySelectorAll("#priceColumn");
    const qtyDisplay = document.querySelectorAll("#qty-display");
    const subtot = document.querySelectorAll("#subtotalColumn");
    var num = parseInt(qtyDisplay[i].innerText);
    qtyDisplay[i].innerText = num + 1;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[i].qty += 1;
    localStorage.setItem('cart',JSON.stringify(cart));
    var price = parseInt((priceColumn[i].innerText).replace(/[^0-9]/g, ''));
    subtot[i].innerText = "₹"+price*(num+1);
    var temp = parseInt((document.getElementById('cart-subtotal').innerHTML).replace(/[^0-9]/g, ''));
    cartTotal(price+temp);
    // displayCart();
}
function decrement(i){
    const priceColumn = document.querySelectorAll("#priceColumn");
    const qtyDisplay = document.querySelectorAll("#qty-display");
    const subtot = document.querySelectorAll("#subtotalColumn");
    var num = parseInt(qtyDisplay[i].innerText);
    if (num > 1){
        qtyDisplay[i].innerText = num - 1;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart[i].qty -= 1;
        localStorage.setItem('cart',JSON.stringify(cart));
        var price = parseInt((priceColumn[i].innerText).replace(/[^0-9]/g, ''));
        var subTot = parseInt((subtot[i].innerText).replace(/[^0-9]/g, ''));
        subtot[i].innerHTML = "₹"+(subTot-price);
        var temp = parseInt((document.getElementById('cart-subtotal').innerHTML).replace(/[^0-9]/g, ''));
        cartTotal(temp-price);
        // displayCart();
    }
    else{
        removeProduct(i);
    }
}

function changeToInput(i){
    var newQuantity = prompt("Enter the new quantity:");
    if (newQuantity !== null && !isNaN(newQuantity)){
        if (newQuantity == 0){
            console.log("hello");
        }
        else{
            newQuantity = parseInt(newQuantity,10);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart[i].qty = newQuantity;
            localStorage.setItem('cart',JSON.stringify(cart));
            displayCart();
        }
    }
    else{
        alert("Please enter a number");
    }
}

function sizes(i){
    var sizeSelector = document.querySelectorAll("#sizeSelector")[i];
    var optionsContainer = document.querySelectorAll(".custom-options")[i];
    var options = document.querySelectorAll(".custom-option"+i);
    const priceColumn = document.querySelectorAll("#priceColumn");
    const subtot = document.querySelectorAll("#subtotalColumn");
    optionsContainer.classList.toggle('active');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    options.forEach(function (option) {
        option.addEventListener('click', function () {
            if (option.innerHTML == "All Sizes"){
                priceColumn[i].innerHTML = "₹"+cart[i].price*cart[i].size.split(',').length;
                subtot[i].innerHTML = "₹"+cart[i].price*(cart[i].size.split(',').length)*cart[i].qty;
                sizeSelector.innerHTML = option.innerHTML;
                cart[i].psize = option.innerHTML;
                localStorage.setItem('cart',JSON.stringify(cart));
                optionsContainer.classList.remove('active');
            }
            else{
                sizeSelector.innerHTML = option.innerHTML;
                priceColumn[i].innerHTML = "₹"+cart[i].price;
                subtot[i].innerHTML = "₹"+cart[i].price*cart[i].qty;
                cart[i].psize = option.innerHTML;
                localStorage.setItem('cart',JSON.stringify(cart));
                optionsContainer.classList.remove('active');
            }
            displayCart();
        });
    });
    window.addEventListener('click', function (e) {
        if (!sizeSelector.contains(e.target)) {
            optionsContainer.classList.remove('active');
        }
    });
}

function checkSize(link){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    var check = true;
    cart.forEach(item =>{
        console.log(item.psize);
        if (item.psize == 0){
            check = false;
        }
    });
    if (check){
        window.location.href = link;
    }
    else{
        alert("Please Select the Size for all the products.");
    }
}

//---------------------------------------------------------------------------
// Email Page

function sendMail(){
    var temp = "";
    var total_cost = 0;
    console.log(document.getElementById('nameInp').value);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach((item, ind) =>{
        if (item.psize == "All Sizes"){
            temp += (ind+1)+") Product Id: "+item.pid+"\n&nbsp;&nbsp;&nbsp;&nbsp;Brand: "+item.brand+"\n&nbsp;&nbsp;&nbsp;&nbsp;Size: "+item.psize+"\n&nbsp;&nbsp;&nbsp;&nbsp;Price: ₹"+item.price*item.size.split(',').length+"\n&nbsp;&nbsp;&nbsp;&nbsp;Quantity: "+item.qty+"\n&nbsp;&nbsp;&nbsp;&nbsp;Subtotal: ₹"+(item.price*item.qty*item.size.split(',').length)+"\n\n";
            total_cost += (item.price*item.qty*item.size.split(',').length);
        }
        else{
            temp += (ind+1)+") Product Id: "+item.pid+"\n&nbsp;&nbsp;&nbsp;&nbsp;Brand: "+item.brand+"\n&nbsp;&nbsp;&nbsp;&nbsp;Size: "+item.psize+"\n&nbsp;&nbsp;&nbsp;&nbsp;Price: ₹"+item.price+"\n&nbsp;&nbsp;&nbsp;&nbsp;Quantity: "+item.qty+"\n&nbsp;&nbsp;&nbsp;&nbsp;Subtotal: ₹"+(item.price*item.qty)+"\n\n";
            total_cost += (item.price*item.qty);
        }
    });
    temp += "Total: ₹"+total_cost;
    var params = {
        name: document.getElementById('nameInp').value,
        contact: document.getElementById('contactInp').value,
        email: document.getElementById('emailInp').value,
        message: temp
    }

    const serviceID = "service_uidk9x8";
    const templateID = "template_j46gobt";
    if (document.getElementById('nameInp').value == "" || document.getElementById('contactInp').value == "" || document.getElementById('emailInp').value == ""){
        alert("Please fill out the details");
    }
    else if (document.getElementById('contactInp').value.length != 10){
        alert("Invalid contact number. Please Enter the correct contact number");
    }
    else if (!validateGmail(document.getElementById('emailInp').value)){
        alert("Invalid gmail address. Please Enter the correct gmail address");
    }
    else{
        emailjs
        .send(serviceID, templateID, params)
        .then((res) =>{
            document.getElementById('nameInp').value = "",
            document.getElementById('contactInp').value = "",
            document.getElementById('emailInp').value = "",
            console.log(res);
            alert("Order Placed Successfully. Check your mail for the order details.");
        })
        .catch((err) => console.log(err));
    }
}

function validateGmail(email) {
    const gmailRegex = /^[^\s@]+@gmail\.com$/;
    return gmailRegex.test(email);
  }

