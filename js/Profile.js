$('#customerUpdated').css('display', 'none')




function setUserDetail() {
    $('#updateName').val(userDetails.name)
    $('#updateEmail').val(userDetails.email)
    $('#updateAddress').val(userDetails.address)
    $('#updateContact').val(userDetails.contactNumber)
}


var isOK = true

$('#nicPic1').on('change', function () {
    const nic1 = this.files[0];
    if (nic1) {
        if (nic1.type === "image/jpeg" || nic1.type === "image/png" || nic1.type === "image/jpg") {
            isOK = true
            $('#in-nic1').hide()
        } else {
            isOK = false
            $('#in-nic1').show()
        }
    } else {
        $('#in-nic1').show()
    }
})

$('#nicPic2').on('change', function () {
    const nic2 = this.files[0];
    if (nic2) {
        if (nic2.type === "image/jpeg" || nic2.type === "image/png" || nic2.type === "image/jpg") {
            isOK = true
            $('#in-nic2').hide()
        } else {
            isOK = false
            $('#in-nic2').show()
        }
    } else {
        $('#in-nic2').show()
    }
})

$('#drivingLicencePic1').on('change', function () {
    const Licence1 = this.files[0];
    if (Licence1) {
        if (Licence1.type === "image/jpeg" || Licence1.type === "image/png" || Licence1.type === "image/jpg") {
            isOK = true
            $('#in-drivingLicencePic1').hide()
        } else {
            isOK = false
            $('#in-drivingLicencePic1').show()
        }
    } else {
        $('#in-drivingLicencePic1').show()
    }
})

$('#drivingLicencePic2').on('change', function () {
    const Licence2 = this.files[0];
    if (Licence2) {
        if (Licence2.type === "image/jpeg" || Licence2.type === "image/png" || Licence2.type === "image/jpg") {
            isOK = true
            $('#in-drivingLicencePic2').hide()

        } else {
            isOK = false
            $('#in-drivingLicencePic2').show()
        }
    } else {
        $('#in-drivingLicencePic2').show()
    }
})

function updateCustomerDetails() {

    if ($('#updateLicence').val().length === 0) {
        $('#updateLicence').addClass('is-invalid')
        isOk = false
        setTimeout(function () {
            $('#updateLicence').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#updateNIC').val().length === 0) {
        $('#updateNIC').addClass('is-invalid')
        isOk = false
        setTimeout(function () {
            $('#updateNIC').removeClass('is-invalid')
        }, 2000)
    }

    if (isOK) {
        let nic1 = $('#nicPic1')[0].files[0];
        let nic2 = $('#nicPic2')[0].files[0];
        let licence1 = $('#drivingLicencePic1')[0].files[0]
        let licence2 = $('#drivingLicencePic2')[0].files[0]


        let nic =$('#updateNIC').val().toString().trim()
        let drivingLicenseNumber=$('#updateLicence').val().toString().trim()
        const customer = {
            customerId: userDetails.userId,
            nic: nic,
            drivingLicenseNumber: drivingLicenseNumber
        }
        var formData = new FormData();
        formData.append('nic1',nic1,nic1.name)
        formData.append('nic2',nic2,nic2.name)
        formData.append('licence1',licence1,licence1.name)
        formData.append('licence2',licence2,licence2.name)
        formData.append('customerDTO', JSON.stringify(customer))

        $.ajax({
            url: url() + "/customer",
            method : 'PUT',
            timeout: 0,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: formData,
            success: function (result) {
                result=JSON.parse(result)
                if (result.message === "Success") {
                    $('#customerUpdated').css('display', 'block')
                    setTimeout(function () {
                        $('#customerUpdated').css('display', 'none')
                        $('#btnClose').click()
                        $('#btnVerify').remove()
                    },600)
                } else {
                    $('#customerUpdated').children().text('Verification Failed !')
                    $('#customerUpdated').css('display', 'block')
                    setTimeout(function () {
                        $('#customerUpdated').css('display', 'none')
                    },600)
                }
            }
        })
    }
}

