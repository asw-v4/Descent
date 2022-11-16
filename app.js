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
        predict(input.files[0].target.result)
    }
}

function updateInfo(content){
    document.getElementById('infodiv').innerHTML
     = content ;
}

function predict(input) {
    // generate model input
    console.log('Predicting..')
    console.log(input)
    const inferenceInputs = input;
    // execute the model
    myOnnxSession.run(inferenceInputs).then((output) => {
      // consume the output
      const outputTensor = output.values().next().value;
      console.log(`model output tensor: ${outputTensor.data}.`);
    });
  };

// create a session
const myOnnxSession = new onnx.InferenceSession();
// load the ONNX model file
myOnnxSession.loadModel("./model.onnx")
console.log('Model Loaded')

