 class ImageLoader {
    constructor(imageWidth, imageHeight) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = imageWidth;
      this.canvas.height = imageHeight;
      this.ctx = this.canvas.getContext('2d');
    }
    async getImageData(url) {
      await this.loadImageAsync(url);
      const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      return imageData;
    }
    loadImageAsync(url) {
      return new Promise((resolve, reject) => {
        this.loadImageCb(url, () => {
          resolve();
        });
      });
    }
    loadImageCb(url, cb) {
      loadImage(
        url,
        img => {
          if (img.type === 'error') {
            throw `Could not load image: ${url}`;
          } else {
            // load image data onto input canvas
            this.ctx.drawImage(img, 0, 0)
            //console.log(`image was loaded`);
            window.setTimeout(() => { cb(); }, 0);
          }
        },
        {
          maxWidth: this.canvas.width,
          maxHeight: this.canvas.height,
          cover: true,
          crop: true,
          canvas: true,
          crossOrigin: 'Anonymous'
        }
      );
    }
  }
  
async function predict() {
    // Create an ONNX inference session with WebGL backend.
    const session = new onnx.InferenceSession({ backendHint: 'webgl' });
  
    // Load an ONNX model. This model is Resnet50 that takes a 1*3*224*224 image and classifies it.
    await session.loadModel("./model.onnx");
    console.log('Model Loaded')
    // Load image.
    const imageLoader = new ImageLoader(imageSize, imageSize);
    const imageData = await imageLoader.getImageData(document.getElementById('uploaded').src);
    const imageSize = 224;
    // Preprocess the image data to match input dimension requirement, which is 1*3*224*224.
    const width = imageSize;
    const height = imageSize;
    const preprocessedData = preprocess(imageData.data, width, height);
  
    const inputTensor = new onnx.Tensor(preprocessedData, 'float32', [1, 3, width, height]);
    // Run model with Tensor inputs and get the result.
    const outputMap = await session.run([inputTensor]);
    const outputData = outputMap.values().next().value.data;
  
    // Render the output result in html.
    printMatches(outputData);
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


predictbtn = document.getElementById('predict-btn')
predictbtn.addEventListener('click', function(){
    predict();
});
