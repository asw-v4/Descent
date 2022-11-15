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

// create a session
const myOnnxSession = new onnx.InferenceSession();
// load the ONNX model file

myOnnxSession.loadModel("./my-model.onnx").then(() => {
    // generate model input
    console.log("Loaded")
    const inferenceInputs = getInputs();
    // execute the model
    myOnnxSession.run(inferenceInputs).then((output) => {
      // consume the output
      const outputTensor = output.values().next().value;
      console.log(`model output tensor: ${outputTensor.data}.`);
    });
  });

