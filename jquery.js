$('.subir').click(function (e){
    e.preventDefault()
    $('html, body').animate({
        scrollTop: 0
    }, 500)
    return false
})
