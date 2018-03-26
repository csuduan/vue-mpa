/**
 * Created by harttle on 1/8/15.
 */

$(function(){
    if($('body#post').length === 0) return;

    $('.post-content').each(function(i, ele){
        var $ele = $(ele);
        $ele.html(marked($ele.find('#content').html()));
    });
});

function comment(){
    var content = $('#new-comment').val();
    if(content.trim() === ''){
        return $('.alert').html('评论不能为空').show();
    }
    $('#new-comment').val('');

    $.post('', {content: content})
        .done(function(){
            location.reload();
        })
        .fail(function(data){
            return $('.alert').html('评论失败：'+data).show();
        });
}