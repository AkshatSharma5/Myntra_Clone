let bagItems = JSON.parse(localStorage.getItem('item-array')) || [];

onLoad();

function onLoad(){
    updateBagCount();
    displayHomePage();
}

function addToBag(itemid){
    localStorage.setItem('item-array',JSON.stringify(bagItems));
    bagItems.push(itemid);
    updateBagCount();
}

function updateBagCount(){
    let bagcountEle=document.querySelector('.bag-item-count');
    if(bagItems.length>0){
        bagcountEle.innerHTML = JSON.parse(localStorage.getItem('item-array')).length;
        bagcountEle.style.visibility = 'visible';}
    else{
        bagcountEle.style.visibility = 'hidden';}
}

function displayHomePage(){
    let itemsContainerElement = document.querySelector('.items-container')
    // from items.js we will get

    if(!itemsContainerElement) return; // to prevent error of unable to add innerHTML to non-existent object

    let INNERHTML=``;
    items.forEach(
        item => {
        
        INNERHTML += `<div class="item-container">
        <img class='item-img' src="${item.image}" alt="item img">
        <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
            <span class="current-price">Rs ${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div> 
        <button class="btn-add-bag" onclick='addToBag(${item.id})'>Add to Cart</button>
    </div> `}
    );
    
    
    itemsContainerElement.innerHTML = INNERHTML;
    
}

