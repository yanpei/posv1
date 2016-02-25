//TODO: Please write code in this file.
function    printInventory(inputs){
    itemAmount = countAmount(inputs);
    allItems = loadAllItems();
  //  console.log(allItems.length);
  //  console.log(allItems[0].barcode);
    cart = getCart(allItems,itemAmount);
    giftsList = getGifts(cart);
    cartList = getcartList(cart,giftsList);
    total = getTotal(cartList);
    savePrice = getSavePrice(cartList,total);
    outputResult(cartList,giftsList,total,savePrice);

}

    function countAmount(items){
        var  itemAmount = new Array();

        var itemBarcode;
        var n=0;
        for(var i=0;i<items.length;i++){
                 var num=0;
                var  itemArray = new Array();
                  if(items[i].indexOf('-')!==-1){
                      itemArray = items[i].split('-');
                      itemBarcode= itemArray[0];
                      num=parseInt(itemArray[1]);
                  }else{
                     itemBarcode =items[i];
                     num =1;
                  }
                  if(itemAmount.length==0){
                      var  itemObj = new Object();
                      itemObj.barcode=itemBarcode;
                      itemObj.amount = num;
                      itemAmount.push(itemObj);
                //      debugger;
                    }else{
                    var  j=0;
                    while(j<itemAmount.length){
                          if(itemBarcode==itemAmount[j].barcode){
                                  itemAmount[j].amount +=num;
                                  break;
                                }else{
                                    j++;
                                }
                      }
                     if(j==itemAmount.length){
                           var itemObj = new Object();
                           itemObj.barcode = itemBarcode;
                           itemObj.amount = num;
                           itemAmount.push(itemObj);
                    }
                }
            }
        console.log(JSON.stringify(itemAmount));
        return itemAmount;
    }
    function  getCart(allItems,itemAmo){
          var cart = new Array();
          for(var i=0;i<itemAmo.length;i++){
            for(var j=0;j<allItems.length;j++){

                   if(itemAmo[i].barcode==allItems[j].barcode){
          /*            var itemMessage = new Object();
                      itemMessage.barcode = allItems[j].barcode;
                      itemMessage.name = allItems[j].name;
                      itemMessage.unit = allItems[j].unit;
                      itemMessage.price = allItems[j].price;
                      itemMessage.amount = itemAmo[i].amount;
                      console.log(itemMessage.barcode);
                */
                      var itemMessage = {barcode:allItems[j].barcode,name:allItems[j].name,unit:allItems[j].unit,price:allItems[j].price,amount:itemAmo[i].amount};
            //            console.log(itemMessage);
                        cart.push(itemMessage);
                    }
              }

          }
          console.log(JSON.stringify(cart));
          return  cart;
    }

    function getGifts(cart){
          var giftsList = new Array();
          promotions = loadPromotions();
          btfo_items = promotions[0].barcodes;
          for(var i =0;i<cart.length;i++){
              for(var j=0;j<btfo_items.length;j++){
                    if(cart[i].barcode==btfo_items[j]){
                          var num =Math.floor(cart[i].amount/3);
                    //      console.log(num);
                          if(num!==0){
                                var giftObj = {giftName:cart[i].name,giftNumber:num,giftUnit:cart[i].unit};
                                giftsList.push(giftObj);
                        }
                    }
              }
          }
          console.log(JSON.stringify(giftsList));
          return giftsList;
    }
    function　getcartList(cart,giftsList){
          var cartList = new Array();
          var  itemsubtotal;
          var hasgift = false;
          for(var i =0;i<cart.length;i++){
              for(var j=0;j<giftsList.length;j++){
                    if(cart[i].name ===giftsList[j].giftName){
                        itemsubtotal = (cart[i].amount-giftsList[j].giftNumber)*cart[i].price;
                        hasgift = true;
                      console.log('subtotal:'+itemsubtotal);
                    }
            }
             if(hasgift==false){
                 itemsubtotal = cart[i].amount*cart[i].price;
                   console.log('subtotal:'+itemsubtotal);
             }
             var cartlistObj = {name:cart[i].name,amount:cart[i].amount,unit:cart[i].unit,price:cart[i].price,subtotal:itemsubtotal};
             cartList.push(cartlistObj);
          }
        console.log(JSON.stringify(cartList));
        return cartList;
    }

    function getTotal(cartList){
          var total=0;
          for(var i = 0; i<cartList.length;i++){
              total += cartList[i].subtotal;
          }
          console.log(total);
          return total;
    }

    function getSavePrice(cartList,total){
        var derservePrice = 0;
        var savePrice;
        for(var i=0;i<cartList.length;i++){
              derservePrice += cartList[i].amount*cartList[i].price;
        }
        savePrice = derservePrice-total;
        console.log(savePrice);
        return savePrice;
    }

    function outputResult(cartList,giftsList,total,savePrice){
        str1 =   '***<没钱赚商店>购物清单***\n' ;

       for(var i=0;i<cartList.length;i++){
        // console.log(cartList[i].price.toFixed(2));
            str =  '名称：'+cartList[i].name+'，数量：'+cartList[i].amount+cartList[i].unit+'，单价：'+cartList[i].price.toFixed(2)+'(元)，小计：'+cartList[i].subtotal.toFixed(2)+'(元)\n';
            str1 = str1+str;
       }
       str1=str1+ '----------------------\n' ;
       str2= '挥泪赠送商品：\n';
       for(var i=0;i<giftsList.length;i++){
          str = '名称：'+giftsList[i].giftName+'，数量：'+giftsList[i].giftNumber+giftsList[i].giftUnit+'\n';
          str2+=str;
       }
       str2+=  '----------------------\n' ;
       str3=      '总计：'+total.toFixed(2)+'(元)\n' + '节省：'+savePrice.toFixed(2)+'(元)\n' + '**********************';
       outputResult = str1+str2+str3;
       console.log(outputResult);
       return outputResult;
    }
