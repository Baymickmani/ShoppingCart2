var productsList = new Array();
var newObj;

class Product {
    constructor(Item)
    {
        this.Id = Item.Id;
        this.Title = Item.Title;
        this.Description = Item.Description;
        this.Image = Item.Image;
        this.Ratings = Item.Ratings;
        this.Price = Item.Price;
        this.InStock = Item["In-Stock"];
        this.Quantity = Item.Quantity;
    }
}

$(function() {
    $.getJSON("datafiles/menu.json", function(data) {
        menuData = data
        for (let x = 0; x < menuData.length; x++) {
            newObj = new Product(
                menuData[x]
            );
            productsList.push(newObj);
        }
        var container = "";
        localStorage.setItem("menuData", JSON.stringify(data));
        if(!localStorage.getItem("cartData"))
        {
            localStorage.setItem("cartData", JSON.stringify([]));
        }
        $.each(data, function(index, value) {
            if(index % 2 == 0)
                styleClass = "flex-item-left"
            else
                styleClass = "flex-item-right"
            var newDiv = `<div class='card ${styleClass}'>
                                <img src = '${value.Image}' style="width:60%">
                                <h1>${value.Title}</h1>
                                <p>${value.Description}</p>
                                <p>Rating: ${value.Ratings}</p>
                                <p class="price">Price: ${value.Price} CAD</p>
                                <p style="color:red;display:none" id = "${value.Id}Stock">Item Out of Stock</p>
                                <button type="button" onClick="saveData(${value.Id}) ">
                                    Add to cart
                                </button>
                          </div>`
            container += newDiv;
        })
        $("#flex-container").html(container);
    });
});

function saveData(ID)
{
    var menuItems = JSON.parse(localStorage.getItem("menuData"));
    var cartData = JSON.parse(localStorage.getItem("cartData"));
    var flag = 0
    for(var i = 0; i < cartData.length; i++)
    {
        if(cartData[i].Id == ID)
        {
            if(cartData[i]["In-Stock"])
            {
                cartData[i].Quantity += 1                
                flag = 1;
                break;
            }
        }
    }
    if(flag == 0)
    {
        var x = menuItems[ID-1]
        if(x["In-Stock"])
        {
            x.Quantity = 1
            cartData.push(x)
        }    
        else {
            document.getElementById(ID + "Stock").style.display = "block";
        }
    }
    localStorage.setItem("cartData", JSON.stringify(cartData));
}