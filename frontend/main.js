const path = "http://localhost:4000"
$(document).ready(() => {
  $('#myTable').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": `${path}/api/v1/get`,
    "columns": [{
        data: 'name'
      },
      {
        data: 'age'
      },
      {
        data: 'location'
      }
    ]
  });


  // $.get(`${path}/api/v1/get`, (response) => {
  //   console.log(response);
  // })






  // submit form
  $("#submit").on("click", (e) => {
    e.preventDefault();
    var name = $("#name").val();
    var age = $("#age").val();
    var location = $("#location").val()

    console.log(name, age, location);

    // POST
    $.post(`${path}/api/v1/save`, {
      name,
      age,
      location
    }, (response) => {
      console.log(response);
    }, "json");
  });


})