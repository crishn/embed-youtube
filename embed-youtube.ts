/*
Copyright (c) 2016 Christian Graiger

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
namespace io_github_crishn {

    export class YoutubeVideo {

        private id: string;
        private previewLink: HTMLAnchorElement;
        private videoFrame: HTMLIFrameElement;
        private parameters = {};

        constructor(id: string) {
            this.id = id;
            this.previewLink = this.createPreviewLink();
            this.videoFrame = this.createVideoFrame();
        }

        width(width: number | string): YoutubeVideo {
            let widthInPx: string = this.getUnitInPx(width);
            this.getPreviewImage().style.width = widthInPx;
            this.videoFrame.style.width = widthInPx;
            return this;
        }

        height(height: number | string): YoutubeVideo {
            let heightInPx = this.getUnitInPx(height);
            this.getPreviewImage().style.height = heightInPx;
            this.videoFrame.style.height = heightInPx;
            return this;
        }

        size(width: number, height: number): YoutubeVideo {
            return this.width(width)
                .height(height);
        }

        border(border: number | string): YoutubeVideo {
            let _border = this.getUnitInPx(border);
            this.getPreviewImage().style.border = _border;
            this.videoFrame.style.border = _border;
            return this;
        }

        allowFullScreen(allowFullScreen: boolean): YoutubeVideo {
            this.videoFrame.allowFullscreen = allowFullScreen;
            return this;
        }

        /**
         * Youtube iFrame API parameters.
         * See https://developers.google.com/youtube/player_parameters#Parameters
         */
        videoParameters(parametersAsJSON: string | any): YoutubeVideo {
            if (typeof parametersAsJSON === "string") {
                this.parameters = JSON.parse(parametersAsJSON);
            } else {
                this.parameters = parametersAsJSON;
            }
            return this;
        }

        defaults(): YoutubeVideo {
            return this.size(560, 315)
                .border(0)
                .allowFullScreen(true)
                .videoParameters({ "rel": 0, "autoplay": 1 });
        }


        embedOnId(id: string) {
            let target = <HTMLElement>document.querySelector(id);
            if (target != null) {
                this.playOn(target);
            }
        }

        playOn(target: HTMLElement): void {
            this.videoFrame.src = this.prepareVideoUrl();
            target.appendChild(this.previewLink);
            let self = this;
            this.previewLink.addEventListener('click', function (event: MouseEvent) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
                target.removeChild(self.previewLink);
                target.appendChild(self.videoFrame);
            });
        }

        private getUnitInPx(unit: number | string): string {
            let unitInPx: string;
            if (typeof unit === "string") {
                return unit;
            }
            if (typeof unit === "number") {
                return `${unit}px`;
            }
            throw new Error(`Expected string or number as unit, got "${unit}".`);
        }

        private createPreviewLink(): HTMLAnchorElement {
            let anchor = <HTMLAnchorElement>document.createElement("a");
            anchor.href = this.getVideoUrl();
            let image = <HTMLImageElement>document.createElement("img");
            image.src = this.getPreviewUrl();
            anchor.appendChild(image);
            return anchor;
        }

        private createVideoFrame(): HTMLIFrameElement {
            let frame = <HTMLIFrameElement>document.createElement("iframe");
            frame.frameBorder = "0";
            frame.src = this.getVideoUrl();
            return frame;
        }

        private getPreviewUrl(): string {
            return `https://img.youtube.com/vi/${this.id}/0.jpg`;
        }

        private getVideoUrl(): string {
            return `https://www.youtube-nocookie.com/embed/${this.id}`;
        }

        private prepareVideoUrl(): string {
            let videoUrl = this.getVideoUrl();
            let urlParameters = this.getVideoParameters();
            if (urlParameters != null && urlParameters.length > 0) {
                return `${videoUrl}?${urlParameters}`;
            }
            return videoUrl;
        }
        
        private getPreviewImage() : HTMLImageElement {
            return <HTMLImageElement> this.previewLink.firstChild;
        }

        private getVideoParameters(): string {
            let parameters : Array<string> = [];
            for (let name in this.parameters) {
                let value = this.parameters[name];
                parameters.push(`${name}=${value}`);
            }
            return parameters.join("&");
        }
    }

}