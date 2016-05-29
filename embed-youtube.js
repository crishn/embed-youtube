/*
Copyright (c) 2016 Christian Graiger

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var io_github_crishn;
(function (io_github_crishn) {
    var YoutubeVideo = (function () {
        function YoutubeVideo(id) {
            this.parameters = {};
            this.id = id;
            this.previewLink = this.createPreviewLink();
            this.videoFrame = this.createVideoFrame();
        }
        YoutubeVideo.prototype.width = function (width) {
            var widthInPx = this.getUnitInPx(width);
            this.getPreviewImage().style.width = widthInPx;
            this.videoFrame.style.width = widthInPx;
            return this;
        };
        YoutubeVideo.prototype.height = function (height) {
            var heightInPx = this.getUnitInPx(height);
            this.getPreviewImage().style.height = heightInPx;
            this.videoFrame.style.height = heightInPx;
            return this;
        };
        YoutubeVideo.prototype.size = function (width, height) {
            return this.width(width)
                .height(height);
        };
        YoutubeVideo.prototype.border = function (border) {
            var _border = this.getUnitInPx(border);
            this.getPreviewImage().style.border = _border;
            this.videoFrame.style.border = _border;
            return this;
        };
        YoutubeVideo.prototype.allowFullScreen = function (allowFullScreen) {
            this.videoFrame.allowFullscreen = allowFullScreen;
            return this;
        };
        /**
         * Youtube iFrame API parameters.
         * See https://developers.google.com/youtube/player_parameters#Parameters
         */
        YoutubeVideo.prototype.videoParameters = function (parametersAsJSON) {
            if (typeof parametersAsJSON === "string") {
                this.parameters = JSON.parse(parametersAsJSON);
            }
            else {
                this.parameters = parametersAsJSON;
            }
            return this;
        };
        YoutubeVideo.prototype.defaults = function () {
            return this.size(560, 315)
                .border(0)
                .allowFullScreen(true)
                .videoParameters({ "rel": 0, "autoplay": 1 });
        };
        YoutubeVideo.prototype.on = function (id) {
            var target = document.querySelector(id);
            if (target != null) {
                this.playOn(target);
            }
        };
        YoutubeVideo.prototype.playOn = function (target) {
            this.videoFrame.src = this.prepareVideoUrl();
            target.appendChild(this.previewLink);
            var self = this;
            this.previewLink.addEventListener('click', function (event) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
                target.removeChild(self.previewLink);
                target.appendChild(self.videoFrame);
            });
        };
        YoutubeVideo.prototype.getUnitInPx = function (unit) {
            var unitInPx;
            if (typeof unit === "string") {
                return unit;
            }
            if (typeof unit === "number") {
                return unit + "px";
            }
            throw new Error("Expected string or number as unit, got \"" + unit + "\".");
        };
        YoutubeVideo.prototype.createPreviewLink = function () {
            var anchor = document.createElement("a");
            anchor.href = this.getVideoUrl();
            var image = document.createElement("img");
            image.src = this.getPreviewUrl();
            anchor.appendChild(image);
            return anchor;
        };
        YoutubeVideo.prototype.createVideoFrame = function () {
            var frame = document.createElement("iframe");
            frame.frameBorder = "0";
            frame.src = this.getVideoUrl();
            return frame;
        };
        YoutubeVideo.prototype.getPreviewUrl = function () {
            return "https://img.youtube.com/vi/" + this.id + "/0.jpg";
        };
        YoutubeVideo.prototype.getVideoUrl = function () {
            return "https://www.youtube-nocookie.com/embed/" + this.id;
        };
        YoutubeVideo.prototype.prepareVideoUrl = function () {
            var videoUrl = this.getVideoUrl();
            var urlParameters = this.getVideoParameters();
            if (urlParameters != null && urlParameters.length > 0) {
                return videoUrl + "?" + urlParameters;
            }
            return videoUrl;
        };
        YoutubeVideo.prototype.getPreviewImage = function () {
            return this.previewLink.firstChild;
        };
        YoutubeVideo.prototype.getVideoParameters = function () {
            var parameters = [];
            for (var name_1 in this.parameters) {
                var value = this.parameters[name_1];
                parameters.push(name_1 + "=" + value);
            }
            return parameters.join("&");
        };
        return YoutubeVideo;
    }());
    io_github_crishn.YoutubeVideo = YoutubeVideo;
})(io_github_crishn || (io_github_crishn = {}));
