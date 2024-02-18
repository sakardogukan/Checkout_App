//? Selectors
const navbarList = document.querySelector(".nav__list")


//? Variables
const taxRate = 0.2
const shippingPrice = 25.99
const shippingFreePrice = 3000


//? Events
window.addEventListener("load", () => {
    localStorage.setItem("taxRate", taxRate)
    localStorage.setItem("shippingPrice", shippingPrice)
    localStorage.setItem("shippingFreePrice", shippingFreePrice)
})

navbarList.addEventListener("click",(e)=>{
    if(e.target.className=="nav__list--btn"){
        //alert("remove btn clicked...")
        //e.target.parentElement.firstElementChild.innerText = "My Chart"
        //e.target.previousElementSibling.innerText = "My Chart"
        e.currentTarget.firstElementChild.innerText = "My Chart"
    }
})



//? Functions


