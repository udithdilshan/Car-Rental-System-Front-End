function saveUser() {

    var isOk=true
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if ($('#inputName').val().length===0){
        $('#inputName').addClass('is-invalid')
        isOk=false
        setTimeout(function(){ $('#inputName').removeClass('is-invalid') }, 2000)
    }
    if (!testEmail.test($('#inputEmail').val())){
        $('#inputEmail').addClass('is-invalid')
        isOk=false
        setTimeout(function(){ $('#inputEmail').removeClass('is-invalid') }, 2000)
    }
    if ($('#inputAddress').val().length===0){
        $('#inputAddress').addClass('is-invalid')
        isOk=false
        setTimeout(function(){ $('#inputAddress').removeClass('is-invalid') }, 2000)
    }
    if ($('#inputContact').val().length<9 ){
        $('#inputContact').addClass('is-invalid')
        isOk=false
        setTimeout(function(){ $('#inputContact').removeClass('is-invalid') }, 2000)
    }
    if ($('#inputPassword').val().length===0){
        $('#inputPassword').addClass('is-invalid')
        isOk=false
        setTimeout(function(){ $('#inputPassword').removeClass('is-invalid') }, 2000)
    }
    if ($('#inputPasswordConfirm').val().length===0){
        $('#inputPasswordConfirm').addClass('is-invalid')
        isOk=false
        setTimeout(function(){ $('#inputPasswordConfirm').removeClass('is-invalid') }, 2000)
    }


    if ($('#inputPassword').val().toString().trim()===$('#inputPasswordConfirm').val().toString().trim()) {
        if (isOk) {
            let date = new Date();
            let datetime = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds()

            const user = {
                name: $('#inputName').val().toString().trim(),
                email: $('#inputEmail').val().toString().trim(),
                password: $('#inputPassword').val().toString().trim(),
                address: $('#inputAddress').val().toString().trim(),
                contactNumber: $('#inputContact').val().toString().trim(),
                role: "CUSTOMER",
                createdDate: datetime
            }

            console.log(user)

            $.ajax({
                url:'http://localhost:8080/carrental/api/v1/user',
                type:'POST',
                dataType:'json',
                contentType:'application/json',
                success:function (data) {
                    if (data.message==="Success"){
                        $('#customerSaved').css('display','block')
                        setTimeout(function(){
                            $('#customerSaved').css('display','none')
                            $('#signInClose').click()
                        }, 800)

                    }if (data.message==="Error"){
                        $('#existEmail').css('display','block')
                        setTimeout(function(){ $('#existEmail').css('display','none') }, 1000)
                    }
                },
                data:JSON.stringify(user)
            })
        }
    }
    else{
        $('#inputPasswordConfirm').addClass('is-invalid')
        isOk=false
        setTimeout(function(){ $('#inputPasswordConfirm').removeClass('is-invalid') }, 2000)
    }




}