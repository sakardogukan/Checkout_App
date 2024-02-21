//? Selectors
const navbarList = document.querySelector(".nav__list")
const productList = document.querySelector("div.main__product-painel")

//? Variables
// const taxRate = 0.2
// const shippingPrice = 25.99
// const shippingFreePrice = 3000

//? Events
window.addEventListener("load", () => {
    // localStorage.setItem("taxRate", taxRate)
    // localStorage.setItem("shippingPrice", shippingPrice)
    // localStorage.setItem("shippingFreePrice", shippingFreePrice)
    calculateCardPrice()
})

navbarList.addEventListener("click", (e) => {
    if (e.target.getAttribute("class") == "nav__list--btn" || e.target.getAttribute("class") == "fa-regular fa-trash-can") {
        //alert("remove btn clicked...")
        //e.target.parentElement.firstElementChild.innerText = "My Chart"
        //e.target.previousElementSibling.innerText = "My Chart"
        e.currentTarget.firstElementChild.innerText = "My Chart"
        productList.childNodes.forEach((product) => {
            product.remove()
        })
        productList.innerHTML = `<div style="text-indent:25px"><h2>No Product !</h2></div>`
        calculateCardPrice()
    }
})

productList.addEventListener("click", (e) => {
    //minus
    if (e.target.className == "fa-solid fa-minus") {
        //alert("minus")
        if (e.target.nextElementSibling.innerText > 1) {
            e.target.nextElementSibling.innerText--
            calculateProductPrice(e.target)
        }
        else {
            if (confirm(`${e.target.closest(".main__product-info").querySelector("h2").innerText} will be removed !`)) {
                e.target.closest(".main__product").remove()
                calculateCardPrice()
            }
        }
    }
    //plus
    else if (e.target.classList.contains("fa-plus")) {
        //alert("plus")
        e.target.previousElementSibling.innerText++
        calculateProductPrice(e.target)
    }
    //remove
    else if (e.target.id == "remove-product") {
        //alert("remove")
        if (confirm(`${e.target.closest(".main__product-info").querySelector("h2").innerText} will be removed !`)) {
            e.target.closest(".main__product").remove()
            calculateCardPrice()
        }
    }
    //other
    // else {
    //     alert("other")
    // }
})

//? Functions

const calculateProductPrice = (btn) => {
    //product line calculate
    const infoDiv = btn.closest(".main__product-info")
    // console.log(infoDiv);
    const price = infoDiv.querySelector(".main__product-price strong").innerText
    //console.log(price)
    const quantity = infoDiv.querySelector("#quantity").innerText
    //console.log(quantity);
    infoDiv.querySelector(".main__product-line-price").innerText = (price * quantity).toFixed(2)
    calculateCardPrice()
}

const calculateCardPrice = () => {
    // product card calculate
    const productPriceDivs = productList.querySelectorAll(".main__product-line-price")
    let subtotal = 0
    productPriceDivs.forEach(price => {
        subtotal += parseFloat(price.innerText)
    })
    //console.log(subtotal)
    const taxPrice = (parseFloat(subtotal * localStorage.getItem("taxRate"))).toFixed(2)
    //console.log(taxPrice)

    const shippingPrice = ((subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")) ? parseFloat(localStorage.getItem("shippingPrice")) : 0).toFixed(2)
    //console.log(shippingPrice)

    const totalPrice = (Number(subtotal) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
    //console.log(totalPrice);

    document.querySelector(".main__total h2").innerText = subtotal.toFixed(2)
    document.querySelector("#cart-shipping span:nth-child(2)").innerText = shippingPrice
    document.querySelector("#cart-tax span:nth-child(2)").innerText = taxPrice
    document.querySelector("#cart-total").lastElementChild.innerText = totalPrice

    if (productList.querySelectorAll(".main__product").length == 0) {
        productList.innerHTML = `<div style="text-indent:25px"><h2>No Product !</h2></div>`
        navbarList.firstElementChild.innerText = "My Chart"
    } else {
        navbarList.firstElementChild.innerText = `MyChart (${productList.querySelectorAll(".main__product").length} Products)`
    }

}