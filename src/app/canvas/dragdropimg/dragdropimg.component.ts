import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dragdropimg',
  templateUrl: './dragdropimg.component.html',
  styleUrls: ['./dragdropimg.component.scss']
})
export class DragdropimgComponent implements OnInit {
  @ViewChild('backgroundCanvas', { static: true }) backgroundCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('candlesCanvas', { static: true }) candlesCanvas: ElementRef<HTMLCanvasElement>;

  bg;


  constructor(private renderer: Renderer2) { }
  animationInterval;
  containerWidth
  containerHeight

  ngOnInit(): void {

    const backgroundCtx = this.backgroundCanvas.nativeElement.getContext('2d');
    const candlesCtx = this.candlesCanvas.nativeElement.getContext('2d');

    // const canvasContainer = document.getElementById('canvasContainer');
    //  this.containerWidth = canvasContainer.offsetWidth;
    //  this.containerHeight = canvasContainer.offsetHeight;

    this.backgroundCanvas.nativeElement.ondrop = (ev) => this.drag(ev, backgroundCtx);

    // Implement drag and drop functionality
    this.backgroundCanvas.nativeElement.ondrop = (ev) => this.drop(ev, backgroundCtx);
    this.backgroundCanvas.nativeElement.ondragover = (ev) => this.allowDrop(ev);
    this.candlesCanvas.nativeElement.ondrop = (ev) => this.drop(ev, candlesCtx);
    this.candlesCanvas.nativeElement.ondragover = (ev) => this.allowDrop(ev);


  }

  drag(event, ctx) {

    event.dataTransfer.setData('text', event.target.id);
    this.bg = event.dataTransfer.getData('text');
  }

  allowDrop(ev: DragEvent): void {
    ev.preventDefault();
  }

  drop(ev: DragEvent, ctx: CanvasRenderingContext2D): void {
    ev.preventDefault();
    console.log(ev)
    const data = ev.dataTransfer.getData('text');
    const offsetX = ev.offsetX;
    const offsetY = ev.offsetY;
    const img = document.getElementById(data) as HTMLImageElement;

    if (data === 'backgroundImg') {
      if (img) {
        this.bg = img;
         ctx.drawImage(img, 0, 0, this.backgroundCanvas.nativeElement.width, this.backgroundCanvas.nativeElement.height);
         //// set bgimg width ,height to conatiner dimensions
        //ctx.drawImage(img, 0, 0, this.containerWidth, this.containerHeight);
      }

    } else if (data === 'candleImg') {
      if (img) {

        if (this.animationInterval) {
          clearInterval(this.animationInterval);
        }

        // Start a new animation loop
        this.animationInterval = setInterval(() => {
          // Clear the candles canvas
          ctx.clearRect(0, 0, this.candlesCanvas.nativeElement.width, this.candlesCanvas.nativeElement.height);

          // Redraw the background image, on every loop of ittraion of candel image the background image shoul be redraw
          ctx.drawImage(this.bg, 0, 0, this.backgroundCanvas.nativeElement.width, this.backgroundCanvas.nativeElement.height);

          // set bgimg width ,height to conatiner dimensions
      //  ctx.drawImage(this.bg, 0, 0, this.containerWidth, this.containerHeight);


          // Draw the candle image at random positions. and image to remain as 50px width ,heght 
          const x = Math.random() * (this.candlesCanvas.nativeElement.width - 50);
          const y = Math.random() * (this.candlesCanvas.nativeElement.height - 50);
          ctx.drawImage(img, x, y, 50, 50);
        }, 1000 / 2); //1000/2  tells that 2 frames per second   


      }
    }
  }
}




