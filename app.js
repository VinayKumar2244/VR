let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let btnopt=document.querySelector('.btnopt')

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'MATTRESS',
        image: '1.PNG',
        price: 12000
    },
    {
        id: 2,
        name: 'COTTON SHEETS',
        image: 'p2.webp',
        price: 12000
    },
    {
        id: 3,
        name: 'Upholstered Bed',
        image: 'p3.WEBP',
        price: 22000
    },
    {
        id: 4,
        name: 'Organic Cotton Duvet Cover',
        image: 'p4.WEBP',
        price: 12300
    },
    {
        id: 5,
        name: 'Hand-Loomed Jute Rug',
        image: 'p5.WEBP',
        price: 32000
    },
    {
        id: 6,
        name: 'Memory Foam Pillow',
        image: 'p6.WEBP',
        price: 12000
    }
];
let sample = [
    {
        id: 7,
        name: 'MATTRES',
        image: 'p6.WEBP',
        price: 12000
    },
        
];

let listCards  = [];

function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
    sample.forEach((value, key) =>{
        let ct = document.createElement('div');
        ct.classList.add('crt');
        ct.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addTCard(${key})">Add To Card</button>`;
        btnopt.appendChild(ct);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));

        listCards[key].quantity = 1;
    }
    reloadCard();
}
function addTCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(sample[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}



function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}


function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
