/**
 * Created by harttle on 1/8/15.
 */


marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});