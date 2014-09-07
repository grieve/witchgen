function BufferLoader(context, resources, callback) {
  this.context = context;
  this.resources = resources;
  this.onload = callback;
  this.bufferList = {};
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(key, url) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[key] = buffer;
        if (++loader.loadCount == loader.resourceCount)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  var count = 0;
  for (var k in this.resources) {
      if (this.resources.hasOwnProperty(k)) {
         ++count;
      }
  }

  this.resourceCount = count;

  for (var k in this.resources) {
    this.loadBuffer(k, this.resources[k]);
  }
}

module.exports = BufferLoader;