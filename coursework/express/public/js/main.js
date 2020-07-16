$(document).ready(() => {
  $(".delete-user").on("click", deleteUser);
});

deleteUser = () => {
  var confirmation = confirm("Are you sure?");

  if (confirmation) {
    console.log("hello there");
    $(this).css("background", "red");
    /*$.ajax({
      type: "DELETE",
      url: "users/delete/" + $(this).data("id"),
    }).done((response) => {
      window.location.replace("/");
    });*/
  } else {
    return false;
  }
};
