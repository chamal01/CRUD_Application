$(document).ready(function() {
    function fetchUsers() {
        $.ajax({
            url: 'backend.php',
            method: 'GET',
            dataType: 'json',
            data: {
                action: 'fetch'
            },
            success: function(data) {
                let tableRows = '';
                data.forEach(function(user) {
                    tableRows += `
                        <tr>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.age}</td>
                            <td>
                                <button type="button" class="btn btn-sm btn-primary editUser" data-id="${user.id}">Edit</button>
                                <button type="button" class="btn btn-sm btn-danger deleteUser" data-id="${user.id}">Delete</button>
                            </td>
                        </tr>
                    `;
                });
                $('#userTableBody').html(tableRows);
            }
        });
    }

    fetchUsers();

    $('#userForm').submit(function(e) {
        e.preventDefault();
        const formData = $(this).serialize();
        $.ajax({
            url: 'backend.php',
            method: 'POST',
            data: formData,
            success: function() {
                fetchUsers();
                $('#userForm')[0].reset();
            }
        });
    });

    $(document).on('click', '.editUser', function() {
        const userId = $(this).data('id');
        $.ajax({
            url: 'backend.php',
            method: 'GET',
            dataType: 'json',
            data: {
                action: 'get',
                id: userId
            },
            success: function(user) {
                $('input[name="id"]').val(user.id);
                $('input[name="name"]').val(user.name);
                $('input[name="email"]').val(user.email);
                $('input[name="age"]').val(user.age);
            }
        });
    });

    $(document).on('click', '.deleteUser', function() {
        if (confirm('Are you sure you want to delete this user?')) {
            const userId = $(this).data('id');
            $.ajax({
                url: 'backend.php',
                method: 'GET',
                data: {
                    action: 'delete',
                    id: userId
                },
                success: function() {
                    fetchUsers();
                }
            });
        }
    });
});