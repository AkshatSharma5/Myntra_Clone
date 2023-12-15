const convenienceFee=99;
let bagItemObjects;
onLoad();

function onLoad(){
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}
function totalPrice(bagItemObjects){
    let price=0;
    for(let i=0;i<bagItemObjects.length;i++){
        price+=bagItemObjects[i].original_price;
    }
    return price;
}
function finalPrice(){
    if(totalPrice(bagItemObjects)==0) return 0;
    else return (totalPrice(bagItemObjects)-totalDisc(bagItemObjects)+convenienceFee);
}
function totalDisc(bagItemObjects){
    let price=0;
    for(let i=0;i<bagItemObjects.length;i++){
        price+=(bagItemObjects[i].original_price-bagItemObjects[i].current_price);
    }
    return price;
}
function displayBagSummary(){
    let summary=document.querySelector('.bag-summary');
    summary.innerHTML=`
    <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${bagItemObjects.length} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs ${totalPrice(bagItemObjects)}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs ${totalDisc(bagItemObjects)}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs ${convenienceFee}</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount </span>
      <span class="price-item-value">Rs ${finalPrice()}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`;
}
function loadBagItemObjects(){
    bagItemObjects = bagItems.map(itemID => {
        for(let i=0;i<items.length;i++){
            if(itemID == items[i].id) 
                return items[i];
        }
    })
}
function displayBagItems(){

    let containerElement=document.querySelector('.bag-items-container');

    let innerhtml='';

    bagItemObjects.forEach((item)=>{
        innerhtml+= generateHTML(item);
    });

    containerElement.innerHTML=innerhtml;
}

function removeItem(itemID){
    for(let i=0;i<bagItems.length;i++){
        if(itemID == bagItems[i]){
            bagItems.splice(i,1);
            localStorage.setItem('item-array',JSON.stringify(bagItems));
            updateBagCount();
}
    }
    onLoad();
}
function generateHTML(item){
    let text=`
    <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeItem(${item.id})">X</div>
    </div>`;
    return text;
}



/*

*/