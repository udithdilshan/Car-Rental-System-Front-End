function logIn() {

    var isOk = true;

    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (!testEmail.test($('#inputLogInEmail').val())) {
        $('#inputLogInEmail').addClass('is-invalid')
        isOk = false
        setTimeout(function () {
            $('#inputLogInEmail').removeClass('is-invalid')
        }, 2000)
    }

    if ($('#inputLogInPassword').val().length === 0) {
        $('#inputLogInPassword').addClass('is-invalid')
        isOk = false
        setTimeout(function () {
            $('#inputLogInPassword').removeClass('is-invalid')
        }, 2000)
    }

    if (isOk) {

        let email = $('#inputLogInEmail').val().toString().trim();
        let password = $('#inputLogInPassword').val().toString().trim();

        $.ajax({
            url: url()+'/logIn',
            type: 'GET',
            dataType: 'json',
            headers: {
                email: email,
                password: password
            },
            contentType: 'application/json',
            success: function (data) {
                if (data.message === "Success") {
                    console.log(data.data)
                    setUserDetails(data.data)
                    console.log(data.data.role)
                    $('.close').click()
                } else {
                    console.log(data)
                    $('#incorrect').css('display', 'block')
                    setTimeout(function () {
                        $('#incorrect').css('display', 'none')
                    }, 600)
                }
            },
        })
    }
}
