function url() {
    return 'http://localhost:8080/carrental/api/v1'
}

$('#existEmail').css('display', 'none')
$('#customerSaved').css('display', 'none')

$('#incorrect').css('display', 'none')
$('#btnSignOut').css('display', 'none')
$('#profile').css('display', 'none')

var userDetails;

function setUserDetails(user) {
    userDetails = user;
    console.log(userDetails.id)
    console.log(userDetails)
    setLogin()

}

function setLogin() {
    if (userDetails != null) {
        if (userDetails.role === "CUSTOMER") {
            customerProfile()
        }
        if (userDetails.role === 'DRIVER') {

        }
        if (userDetails.role === 'ADMIN') {
            setDashboard()
        }

    }
}

function customerProfile() {
    $('#btnRegistration').remove()
    $('#btnAccount').children('a').attr({'data-toggle': 'none', 'onclick': 'loadCustomerProfile()'})
    $('#btnAccount').children('a').text('Profile')
    $('#btnSignOut').css('display', 'block')
    if (userDetails.verified){
        $('#btnVerify').remove();
    }
}

function loadCustomerProfile() {
    $('#main').css('display', 'none')
    $('#profile').css('display', 'block')
    $('#all_tab').children().click()
    $('#userName').text('User Name : '+userDetails.name)
}

function loadMain() {
    $('#profile').css('display', 'none')
    $('#main').css('display', 'block')
}

function setDashboard() {
    $('#btnRegistration').remove()
    $('#btnAccount').children('a').text('Dashboard')
    $('#btnAccount').children('a').attr({'data-toggle': 'none','onclick':'setAdmin()'})
    // $('#btnAccount').children('a').attr('href','dashboard.html')
}

function setAdmin(){
    console.log(userDetails.id)
    window.location.replace('dashboard.html?id='+userDetails.userId)
}