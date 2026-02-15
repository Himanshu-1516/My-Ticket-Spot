
function searchNow() {
  window.location.href = "events.html";
}

function loginUser() {
  alert("Login successful (demo)");
  window.location.href = "events.html";
}

function goToBooking(eventName) {
  localStorage.setItem("event", eventName);
  window.location.href = "booking.html";
}

function confirmBooking() {
  alert("Booking Confirmed 🎉");
}

function confirmBooking() {
  window.location.href = "payment.html";
}

function makePayment() {
  alert("Payment Successful (Demo)");
  window.location.href = "success.html";
}

function goProfile() {
  window.location.href = "profile.html";
}

function addEvent(){
  alert("Event Added (Admin Demo)");
}

