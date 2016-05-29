# embed-youtube

Javascript to embed Youtube videos in HTML pages.

## Examples

Embed a Youtube (video id is `NzV69DaOucg`with default values in a HTML element with id `video-1`:  

    new io_github_crishn.YoutubeVideo("NzV69DaOucg")
      .defaults()
      .embedOnId("#video-1");

Embed a Youtube video with size `600x400` and serveral video parameters in a DOM element:


    var target = document.getElementById("#video-1");
    new io_github_crishn.YoutubeVideo("NzV69DaOucg")
      .size(600, 400)
      .videoParameters({"rel": 1, "autoplay": 1, "autohide": 1})
      .playOn(target);

## API

### `YoutubeVideo(id)`

Create a new `YoutubeVideo` instance with the given video `id`.

### `width(width)`

Sets a width for the video preview image and the video frame.   

### `height(height)`

Sets a height for the video preview image and the video frame.

### `size(width, height)`

Same as 

---
width(width).height(height);
---   

# License
[MIT](LICENSE)
