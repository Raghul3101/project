//HOME PAGE

var picInd = 1;
showPics(picInd);

function nextPic(n){
    showPics(picInd += n)
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
function addToCart(img, brand, pid, price, available, size) {
    const popupContainer = document.getElementById('popup');
    popupContainer.classList.add('active');
    var qty = 1;
    var psize = 0;
    setTimeout(() => {
        popupContainer.classList.remove('active');
    }, 1400);
    // localStorage.clear();
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
    const products = document.querySelectorAll('.product-box');
    products.forEach(function(product){
        const gender = product.getAttribute('data-gender'); 
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
    });
}
function reset(){
    const products = document.querySelectorAll('.product-box');
    products.forEach(function(product){
        product.style.display="block";
    });
    var checkboxMen = document.getElementById('checkMen');
    var checkboxWomen = document.getElementById('checkWomen');
    var checkboxKids = document.getElementById('checkKids');
    if (checkboxMen.checked){
        checkboxMen.checked = false;
    }
    if (checkboxWomen.checked){
        checkboxWomen.checked = false;
    }
    if (checkboxKids.checked){
        checkboxKids.checked = false;
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
            <td><img class = "cart-prod-img" src = "${item.img}"></td>
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
                <div class="custom-options">`;
            sizes.forEach(j => {
                console.log(j);
                tableRow += `<div class="custom-option${i} custom-option" data-value="${j}" onclick="sizes(${i})">${j}</div>`
            });
            tableRow += `
                </div>
            </div>
            </td>
            <td id="priceColumn">₹${item.price}</td>
            <td><div class = "qty-column">
                    <button class="minus" onclick="decrement(${i})">-</button>
                    <p id = "qty-display" onclick="changeToInput(${i})">${item.qty}</p>
                    <button class="plus" onclick="increment(${i})">+</button>
                </div></td>
            <td id="subtotalColumn">₹${subtotal(item.qty,item.price)}</td>
            `;
            row.innerHTML=tableRow;
            cartElements.appendChild(row);
            sub += subtotal(item.qty,item.price);
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
    displayCart();
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
        displayCart();
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
    // console.log(sizeSelector);
    var optionsContainer = document.querySelectorAll(".custom-options")[i];
    var options = document.querySelectorAll(".custom-option"+i);
    optionsContainer.classList.toggle('active');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    options.forEach(function (option) {
        // console.log(option);
        option.addEventListener('click', function () {
            sizeSelector.innerHTML = option.innerHTML;
            cart[i].psize = option.innerHTML;
            console.log(cart[i].psize);
            localStorage.setItem('cart',JSON.stringify(cart));
            optionsContainer.classList.remove('active');
        });
    });
    window.addEventListener('click', function (e) {
        if (!sizeSelector.contains(e.target)) {
            optionsContainer.classList.remove('active');
        }
    });
}

//---------------------------------------------------------------------------
// Email Page

function sendMail(){
    var temp = "";
    var total_cost = 0;
    console.log(document.getElementById('nameInp').value);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach((item, ind) =>{
        temp += (ind+1)+") Product Id: "+item.pid+"\n&nbsp;&nbsp;&nbsp;&nbsp;Brand: "+item.brand+"\n&nbsp;&nbsp;&nbsp;&nbsp;Size: "+item.psize+"\n&nbsp;&nbsp;&nbsp;&nbsp;Price: ₹"+item.price+"\n&nbsp;&nbsp;&nbsp;&nbsp;Quantity: "+item.qty+"\n&nbsp;&nbsp;&nbsp;&nbsp;Subtotal: ₹"+(item.price*item.qty)+"\n\n";
        total_cost += (item.price*item.qty);
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
            alert("sent");
        })
        .catch((err) => console.log(err));
    }
}

function validateGmail(email) {
    const gmailRegex = /^[^\s@]+@gmail\.com$/;
    return gmailRegex.test(email);
  }

