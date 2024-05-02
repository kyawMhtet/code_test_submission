
document.getElementById('itemImage').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const selectedImage = document.getElementById('selectedImage');

    const reader = new FileReader();
    reader.onload = function (e) {
        selectedImage.src = e.target.result;
        selectedImage.style.display = 'block';
    };
    reader.readAsDataURL(file);
});


let items = [];

const addToCheckOut = () => {
    // console.log('bbb');
    const itemName = document.querySelector('#itemName').value;
    const itemImageInput = document.querySelector('#itemImage');
    const itemImage = itemImageInput.files[0];
    const quantity = parseInt(document.querySelector('#itemQty').value);

    console.log(itemImage);

    if (quantity > 0 && Number.isInteger(quantity)) {
        // const item = { image: itemImage, name: itemName, quantity: quantity };`
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageSrc = e.target.result;
            // items.push();
            items.push({ name: itemName, image: imageSrc, quantity: quantity });
            displayOrderDetail();
            displayOrderSummary();
        };
        reader.readAsDataURL(itemImage);

        // Clear the form fields
        document.getElementById('itemName').value = '';
        itemImageInput.value = '';
        document.getElementById('itemQty').value = '';
        document.getElementById('selectedImage').style.display = 'none';
        document.querySelector('.nameError').style.display = 'none';


    } else if (itemName == '' || itemName == null) {
        document.querySelector('.nameError').style.display = 'block';
    } else if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
        alert('Please enter a valid positive integer quantity!');
    }

}




const displayOrderDetail = () => {
    const itemDetails = document.getElementById('orderDetails');
    itemDetails.innerHTML = '';

    items.forEach(item => {
        const itemDetail = document.createElement('div');
        itemDetail.classList.add('details');
        itemDetail.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
            <span>${item.name}</span>
            <p>Quantity - ${item.quantity}</p>
        </div>
        `;
        itemDetails.appendChild(itemDetail);
    });
}


// const displayOrderSummary = () => {
//     const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
//     const totalPrice = items.reduce((acc, item) => acc + (item.quantity * 10), 0);

//     const summary = document.getElementById('orderSummary');
//     summary.innerHTML = '';

//     summary.innerHTML = `
//     <!-- <h3>Order Summary</h3>

//     <span>
//         Items
//     </span>

//     <div class="total">
//         <h3>
//             Total Quantity - ${totalQuantity}
//         </h3>

//         <h4>${totalPrice}</h4>
//     </div>

//     <hr>
//     `
// }

const displayOrderSummary = () => {
    const totalQuantity = items.reduce((prev, item) => prev + item.quantity, 0);
    const totalPrice = items.reduce((prev, item) => prev + (item.quantity * 10), 0);

    document.getElementById('totalQuantity').innerText = totalQuantity;
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
}

