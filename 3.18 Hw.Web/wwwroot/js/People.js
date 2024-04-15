
$(() => {
    const modal = new bootstrap.Modal($("#add-modal")[0]);
    const modal2 = new bootstrap.Modal($("#edit-modal")[0]);

    function loadPeople() {
        $.get('/home/getpeople', function (people) {
            $("tbody tr").remove();
            people.forEach(function (person) {
                $("tbody").append(`
                <tr>
                    <td>${person.firstName}</td>
                    <td>${person.lastName}</td>
                    <td>${person.age}</td>
                    <td>
                        <button class='btn btn-secondary w-100'  data-person-id='${person.id}'>Edit</button>
                    </td>
                    <td>
                         <button class='btn btn-danger w-100' data-person-id='${person.id}'>Delete</button>
                    </td>
                </tr>`)
            });
        });
    }
    loadPeople();

    $("#show-add").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        modal.show();
    });
    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();
        const person = {
            firstName,
            lastName,
            age
        }

        $.post('/home/addperson', person, function () {
            modal.hide();
            loadPeople();
        });

    });
    $("tbody").on('click', '.btn-secondary', function () {

        const personId = $(this).data("person-id");
        $.get(`/home/getperson?id=${personId}`, function (person) {
            $("#editFirstName").val(person.firstName);
            $("#editLastName").val(person.lastName);
            $("#editAge").val(person.age)
            modal2.show();

        });
        $("#update-person").on('click', function () {
            const firstName = $("#editFirstName").val();
            const lastName = $("#editLastName").val();
            const age = $("#editAge").val();

            const person = {          
                id:personId,
                firstName,
                lastName,
                age
            }

            $.post('/home/editperson', person, function () {
                modal2.hide();
                loadPeople();
            });


        });

    });
    $("tbody").on('click', '.btn-danger', function () {
        const personId = $(this).data("person-id");
        $.post(`/home/deleteperson?id=${personId}`, function () {
            loadPeople();
        });

    });

   
});
  
  

  




