function readURL(input) {
    model()
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

// create a session
const myOnnxSession = new onnx.InferenceSession();

async function model() { 
// load the ONNX model file
console.time("Loading")
await myOnnxSession.loadModel('./model.onnx')
console.timeEnd("Loading")
console.log("Loaded")
}