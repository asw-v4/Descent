function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#uploaded')
                .attr('src', e.target.result)
        };

        reader.readAsDataURL(input.files[0]);
        updateInfo("Identifying...")
        document.getElementsByClassName('loader')[0].style.opacity = 1;
    }
}

function updateInfo(content){
    document.getElementById('infodiv').innerHTML
     = content ;
}