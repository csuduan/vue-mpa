/**
 * Created by harttle on 1/7/15.
 */

function delPost(id) {
    $.ajax({
        url: '/admin/post/' + id,
        type: 'DELETE',
        success: function (result) {
            location.reload();
        }
    });
}