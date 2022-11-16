function predict() {
    updateInfo("Identifying...")
    document.getElementsByClassName('loader')[0].style.opacity = 1;
    console.log('About to Predict')
    input = document.getElementById('uploaded').src
    // generate model input
    console.log('Predicting')
    input_data = new onnx.Tensor(_base64ToArrayBuffer(input), 'float32', [1, 3, 244, 244])
    const inferenceInputs = input_data;
    // execute the model
    myOnnxSession.run(inferenceInputs).then((output) => {
        // consume the output
        const outputTensor = output.values().next().value;
        console.log(`model output tensor: ${outputTensor.data}.`);
    });
};

function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function updateInfo(content) {
    document.getElementById('infodiv').innerHTML
        = content;
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#uploaded')
                .attr('src', e.target.result)
        };

        reader.readAsDataURL(input.files[0]);
    }
}


// create a session
const myOnnxSession = new onnx.InferenceSession();
// load the ONNX model file
myOnnxSession.loadModel("./model.onnx")
console.log('Model Loaded')
document.getElementById('upload-label').style.opacity = 1;
predictbtn = document.getElementById('predict-btn')
predictbtn.addEventListener('click', function(){
    predict();
});
