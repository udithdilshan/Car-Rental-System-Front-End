function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/, function (m, key, value) {
        vars[key] = value;
    });
    return vars
}

console.log(getUrlVars())
var link = window.location.href.split(/[?]/)[0]
console.log(link)
window.history.replaceState({}, document.title, link);
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        },
        legend: {
            display: false,
        }
    }
});
loadCategory()
var categories;


/*=========== LOAD ALL CATEGORIES ==========*/
function loadCategory() {
    $.ajax({
        url: url() + '/category',
        type: 'GET',
        success: function (result) {
            if (result.message === 'Success') {
                categories = result.data;
                if (result.data === null) {
                    $('#category').append(`<h5>No Category Found!</h5>`)
                    $('#createCategory').show()
                } else {
                    $('#tblCategory').empty()
                    $('#modelCategory').empty()
                    let option1 = '<option>Select Category</option>'
                    $('#modelCategory').append(option1)
                    $.each(result.data, function (idx, elem) {
                        let row = '<tr>' +
                            '<td>' + elem.categoryName + '</td>' +
                            '<td>' + elem.lossDamageWaiverPayment + '</td>' +
                            '</tr>';
                        $('#tblCategory').append(row);
                        let option = `<option>${elem.categoryName}</option>`
                        $('#modelCategory').append(option)
                    })
                }
            } else {
                $('#category').append(`<h5>No Category Found!</h5>`)
            }
        }
    })
}

$('#categorySaved').hide()
$('#createCategory').hide()

/*============ ADD CATEGORY ============*/
function addCategory() {
    let isOk = true;
    if ($('#categoryName').val().length === 0) {
        isOk = false;
        $('#categoryName').addClass('is-invalid')
        setTimeout(function () {
            $('#categoryName').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#lossPayment').val() <= 0) {
        isOk = false
        $('#lossPayment').addClass('is-invalid')
        setTimeout(function () {
            $('#lossPayment').removeClass('is-invalid')
        }, 2000)

    }
    if (isOk) {

        let data = {
            categoryName: $('#categoryName').val().toString().trim(),
            lossDamageWaiverPayment: Number($('#lossPayment').val().toString().trim())
        }

        $.ajax({
            url: url() + '/category',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                if (data.message === 'Success') {
                    console.log(data)
                    $('#categorySaved').show()
                    $('#categoryName').val('')
                    $('#lossPayment').val('')
                    loadCategory()
                    setTimeout(function () {
                        $('#categorySaved').hide()
                    }, 800)
                } else {
                    $('#categorySaved').children().text(data.data)
                    $('#categorySaved').addClass('alert-danger')
                    $('#categorySaved').show()
                    setTimeout(function () {
                        $('#categorySaved').hide()
                        $('#categorySaved').removeClass('alert-danger')
                        $('#categorySaved').addClass('alert-success')
                        $('#categorySaved').children().text('Category Added Successful !')
                    }, 800)
                }
            }
        })

    }
}

function loadCars() {
    displayNone()
    $('#category_container').show()
    $('#category_tab').children().click()
    $('#category').css('opacity', '1')
    loadCategory()
    $('#model-container').show()
    $('#model_tab').children().click()
    $('#model').css('opacity', '1')
    loadModel()
    removeButtonActive()
    $('#cars').children().addClass('active')
    loadCarDetails()
    $('#car_container').show()
    $('#car_tab').children().click()
    $('#car').css('opacity', '1')
}

function removeButtonActive() {
    $('#dashboard').children().removeClass('active')
    $('#rent').children().removeClass('active')
    $('#customers').children().removeClass('active')
    $('#cars').children().removeClass('active')
    $('#drivers').children().removeClass('active')
}


function displayNone() {
    $('#main').hide()
    $('#category_container').hide()
    $('#model-container').hide()
    $('#car_container').hide()
}

$('#modelSaved').hide()

/*============ ADD MODEL ============*/
function addModel() {
    let isOk = true;
    if ($('#brandName').val().length === 0) {
        isOk = false;
        $('#brandName').addClass('is-invalid')
        setTimeout(function () {
            $('#brandName').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#type').val().length === 0) {
        isOk = false;
        $('#type').addClass('is-invalid')
        setTimeout(function () {
            $('#type').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#freeDay').val() <= 0) {
        isOk = false
        $('#freeDay').addClass('is-invalid')
        setTimeout(function () {
            $('#freeDay').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#freeMonth').val() <= 0) {
        isOk = false
        $('#freeMonth').addClass('is-invalid')
        setTimeout(function () {
            $('#freeMonth').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#dailyRate').val() <= 0) {
        isOk = false
        $('#dailyRate').addClass('is-invalid')
        setTimeout(function () {
            $('#dailyRate').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#monthlyRate').val() <= 0) {
        isOk = false
        $('#monthlyRate').addClass('is-invalid')
        setTimeout(function () {
            $('#monthlyRate').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#priceExtra').val() <= 0) {
        isOk = false
        $('#priceExtra').addClass('is-invalid')
        setTimeout(function () {
            $('#priceExtra').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#transmissionType').val() === 'Select Transmission Type') {
        isOk = false
        $('#transmissionType').addClass('is-invalid')
        setTimeout(function () {
            $('#transmissionType').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#fuelType').val() === 'Select Fuel Type') {
        isOk = false
        $('#fuelType').addClass('is-invalid')
        setTimeout(function () {
            $('#fuelType').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#noOfPassenger').val() === 'Select Fuel Type') {
        isOk = false
        $('#noOfPassenger').addClass('is-invalid')
        setTimeout(function () {
            $('#noOfPassenger').removeClass('is-invalid')
        }, 2000)
    }
    if (isOk) {
        let data = {
            modelId: $('#modelCategory').val().toString().trim(),
            type: $('#type').val().toString().trim(),
            brandName: $('#brandName').val().toString().trim(),
            noOfPassenger: Number($('#noOfPassenger').val().toString().trim()),
            transmissionType: $('#transmissionType').val().toString().trim(),
            fuelType: $('#fuelType').val().toString().trim(),
            dailyRate: Number($('#dailyRate').val().toString().trim()),
            monthlyRate: Number($('#monthlyRate').val().toString().trim()),
            freeKmForDay: Number($('#freeDay').val().toString().trim()),
            freeKmForMonth: Number($('#freeMonth').val().toString().trim()),
            pricePerKm: Number($('#priceExtra').val().toString().trim()),
        }

        $.ajax({
            url: url() + '/carmodel',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                if (data.message === 'Success') {
                    console.log(data)
                    $('#modelSaved').show()
                    $('#type').val('')
                    $('#brandName').val('')
                    $('#dailyRate').val('')
                    $('#monthlyRate').val('')
                    $('#freeDay').val('')
                    $('#freeMonth').val('')
                    $('#priceExtra').val('')
                    loadModel()
                    setTimeout(function () {
                        $('#modelSaved').hide()
                    }, 800)
                } else {
                    $('#modelSaved').children().text(data.data)
                    $('#modelSaved').addClass('alert-danger')
                    $('#modelSaved').show()
                    setTimeout(function () {
                        $('#modelSaved').hide()
                        $('#modelSaved').removeClass('alert-danger')
                        $('#modelSaved').addClass('alert-success')
                        $('#modelSaved').children().text('Model Added Successful !')
                    }, 800)
                }
            }
        })

    }
}

/*=========== LOAD ALL MODEL ==========*/
function loadModel() {
    $.ajax({
        url: url() + '/carmodel',
        type: 'GET',
        success: function (result) {
            if (result.message === 'Success') {
                console.log(result.data)
                if (result.data.length === 0) {
                    $('#tblModel').append(`<h5>No Model Found!</h5>`)
                } else {
                    $('#tblModel').empty()
                    // $('#modelCategory').empty()
                    // let option1 = '<option>Select Category</option>'
                    // $('#modelCategory').append(option1)
                    $.each(result.data, function (idx, elem) {
                        let row = '<tr>' +
                            '<td>' + elem.brandName + '</td>' +
                            '<td>' + elem.type + '</td>' +
                            '<td>' + elem.transmissionType + '</td>' +
                            '<td>' + elem.noOfPassenger + '</td>' +
                            '<td>' + elem.freeKmForDay + '</td>' +
                            '<td>' + elem.freeKmForMonth + '</td>' +
                            '<td>' + elem.fuelType + '</td>' +
                            '<td>' + elem.dailyRate + '</td>' +
                            '<td>' + elem.monthlyRate + '</td>' +
                            '<td>' + elem.pricePerKm + '</td>' +
                            '</tr>';
                        $('#tblModel').append(row);
                        // let option = `<option>${elem.categoryName}</option>`
                        // $('#modelCategory').append(option)
                    })
                }
            } else {
                $('#tblModel').append(`<h5>No Model Found!</h5>`)
            }
        }
    })
}

/*============ ADD Car ============*/

var allPicAdded = false
$('#carSaved').hide()
function addCar() {
    let isOk = true;
    if ($('#regNo').val().length === 0) {
        isOk = false;
        $('#regNo').addClass('is-invalid')
        setTimeout(function () {
            $('#regNo').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#mileage').val() <= 0) {
        isOk = false;
        $('#mileage').addClass('is-invalid')
        setTimeout(function () {
            $('#mileage').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#color').val().length === 0) {
        isOk = false
        $('#color').addClass('is-invalid')
        setTimeout(function () {
            $('#color').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#maintenKM').val() <= 0) {
        isOk = false
        $('#maintenKM').addClass('is-invalid')
        setTimeout(function () {
            $('#maintenKM').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#onMainten').val() === 'Select Maintenance') {
        isOk = false
        $('#onMainten').addClass('is-invalid')
        setTimeout(function () {
            $('#onMainten').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#available').val() === 'Select Available') {
        isOk = false
        $('#available').addClass('is-invalid')
        setTimeout(function () {
            $('#available').removeClass('is-invalid')
        }, 2000)
    }
    if ($('#carModel').val() === 'Select Model') {
        isOk = false
        $('#carModel').addClass('is-invalid')
        setTimeout(function () {
            $('#carModel').removeClass('is-invalid')
        }, 2000)
    }
    let ava = false;
    if ($('#available').val().toString().trim() === 'Yes') {
        ava = true;
    }

    if (isOk && allPicAdded) {
        let car = {
            carId: $('#carModel').val().toString().trim(),
            registrationNo: $('#regNo').val().toString().trim(),
            mileage: Number($('#mileage').val().toString().trim()),
            color: $('#color').val().toString().trim(),
            maintenance_Km: Number($('#maintenKM').val().toString().trim()),
            onMaintenance: $('#onMainten').val().toString().trim(),
            available: ava
        }

        let front = $('#frontPic')[0].files[0]
        let back = $('#backPic')[0].files[0]
        let interior = $('#interiorPic')[0].files[0]
        let side = $('#sidePic')[0].files[0]

        var formData = new FormData();
        formData.append('front', front, front.name)
        formData.append('back', back, back.name)
        formData.append('interior', interior, interior.name)
        formData.append('side', side, side.name)
        formData.append('carDetailDTO', JSON.stringify(car))

        $.ajax({
            url: url() + '/cardetail',
            type: 'PUT',
            timeout: 0,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: formData,
            success: function (result) {
                result = JSON.parse(result)
                if (result.message === 'Success') {
                    console.log(result)
                    $('#carSaved').show()
                    $('#regNo').val('')
                    $('#mileage').val('')
                    $('#color').val('')
                    $('#maintenKM').val('')
                    loadCarDetails()
                    setTimeout(function () {
                        $('#carSaved').hide()
                    }, 800)
                } else {
                    $('#carSaved').children().text(data.data)
                    $('#carSaved').addClass('alert-danger')
                    $('#carSaved').show()
                    setTimeout(function () {
                        $('#carSaved').hide()
                        $('#carSaved').removeClass('alert-danger')
                        $('#carSaved').addClass('alert-success')
                        $('#carSaved').children().text('Car Added Successful !')
                    }, 800)
                }
            }
        })

    }
}

$('#frontPic').on('change', function () {
    const Pic = this.files[0];
    if (Pic) {
        if (Pic.type === "image/jpeg" || Pic.type === "image/png" || Pic.type === "image/jpg") {
            isOK = true
            $('#in_frontPic').hide()
        } else {
            isOK = false
            $('#in_frontPic').show()
        }
    } else {
        $('#in_frontPic').show()
    }
})

$('#backPic').on('change', function () {
    const Pic = this.files[0];
    if (Pic) {
        if (Pic.type === "image/jpeg" || Pic.type === "image/png" || Pic.type === "image/jpg") {
            isOK = true
            $('#in_backPic').hide()
        } else {
            isOK = false
            $('#in_backPic').show()
        }
    } else {
        $('#in_backPic').show()
    }
})

$('#interiorPic').on('change', function () {
    const Pic = this.files[0];
    if (Pic) {
        if (Pic.type === "image/jpeg" || Pic.type === "image/png" || Pic.type === "image/jpg") {
            isOK = true
            $('#in_interiorPic').hide()
        } else {
            isOK = false
            $('#in_interiorPic').show()
        }
    } else {
        $('#in_interiorPic').show()
    }
})

$('#sidePic').on('change', function () {
    const Pic = this.files[0];
    if (Pic) {
        if (Pic.type === "image/jpeg" || Pic.type === "image/png" || Pic.type === "image/jpg") {
            isOK = true
            $('#in_sidePic').hide()
        } else {
            isOK = false
            $('#in_sidePic').show()
        }
    } else {
        $('#in_sidePic').show()
    }
})

function loadCarDetails() {

}