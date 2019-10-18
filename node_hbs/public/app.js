const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(price)
}


document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
})
let curency = document.querySelectorAll('.price')
// console.log(card.price)
const $card = document.querySelector('#card')
if ($card) {
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('js-delete')) {
            const id = event.target.dataset.id
            // console.log(id)

            fetch('/card/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
                .then(card => {
                   if (card.courses.length) {
                        const html = card.courses.map (c => {
                            return `
                            <tr>
                                <td><img class="basket__img" src="${c.img}" alt="${c.title}"></td>
                                <td>${c.title}</td>
                                <td>${c.count}</td>
                                <td><button class="btn btn-small js-delete" data-id="${c.id}">x</button></td>
                            </tr>
                            `
                        }).join('')
                        $card.querySelector('tbody').innerHTML = html
                        $card.querySelector('.price').textContent  = toCurrency(card.price)
                        // console.log(card.courses)
                   } else {
                       $card.innerHTML = "<p>Basket is empty</p>"
                   }
                })
        }
    })
}

