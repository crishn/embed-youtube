# embed-youtube

Javascript to embed Youtube videos in HTML pages.

## Examples

Embed a Youtube (video id is `NzV69DaOucg`with default values in a HTML element with id `video-1`:  

    new io_github_crishn.YoutubeVideo("NzV69DaOucg")
      .defaults()
      .on("#video-1");

Embed a Youtube video with size `600x400` and serveral video parameters in a DOM element:


    var target = document.getElementById("#video-1");
    new io_github_crishn.YoutubeVideo("NzV69DaOucg")
      .size(600, 400)
      .videoParameters({"rel": 1, "autoplay": 1, "autohide": 1})
      .playOn(target);

## API

### YoutubeVideo(id)

Create a new `YoutubeVideo` instance with the given video `id`.

### width(width)

Sets a width for the video preview image and the video frame. The parameter width can be set as integer (e.g. `600`)
or string (e.g. `"600px"`).

Returns: `YoutubeVideo` instance.

### height(height)

Sets a height for the video preview image and the video frame.

### border(border)

Sets the border with or border style.
For `border` both integer and string values are allowed.

Returns: `YoutubeVideo` instance.

### size(width, height)

Same as 

    width(width).height(height);

Returns: `YoutubeVideo` instance.

### allowFullscreen(allowFullScreen)

Allow youtube fullscreen mode (`true`) or not (`false`).

Returns: `YoutubeVideo` instance.

### videoParameters(parameters)

Youtube iFrame API parameters in JSON notation. See https://developers.google.com/youtube/player_parameters#Parameters.

Returns: `YoutubeVideo` instance.

### defaults()

Same as
    size(560, 315)
      .border(0)
      .allowFullScreen(true)
      .videoParameters({"rel": 0, "autoplay": 1})

Returns: `YoutubeVideo` instance.

### on(id)

Embeds the `YoutubeVideo` instance in an element with the given selector `id`.

### playOn(target)

Embeds the `YoutubeVideo` instance in the DOM element `target`.

## Creating changes

If you want to adapt the script to your needs, don't modify the Javacript.
Best install [Typescript](http://www.typescriptlang.org/):

    $ npm install typescript

Feel free to change the file [embed-youtube.ts](embed-youtube.ts) and compile via

    $ tsc embed-youtube.ts
 
# License
[MIT](LICENSE)
