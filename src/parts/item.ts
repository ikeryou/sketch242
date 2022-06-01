
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Func } from "../core/func";
import { Update } from "../libs/update";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  public noise:number = 1;
  public radius:number = 1;
  public vx:number = 0;
  public vy:number = 0;
  public mass:number = 0;

  public x:number = 0;
  public y:number = 0;

  private _el:Array<HTMLInputElement> = [];
  private _elNum:number = Util.instance.randomInt(5, 10);

  constructor(opt:any) {
    super(opt)

    for(let i = 0; i < this._elNum; i++) {
      const e = document.createElement('input');
      e.setAttribute('type', 'range');
      e.setAttribute('min', '0');
      e.setAttribute('max', '100');
      e.setAttribute('step', '1');
      this.getEl().append(e);
      this._el.push(e);
    }

    this.noise = Util.instance.random(0, 1);
    this.mass = 1;

    this.vx = Util.instance.range(5);
    this.vy = Util.instance.range(5);

    this._update()

    this.x = Util.instance.random(0, Func.instance.sw() - this.radius);
    this.y = Util.instance.random(0, Func.instance.sh() - this.radius);

    this._update();
  }


  protected _update(): void {
    super._update();

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();
    this.radius = Math.min(sw, sh) * Util.instance.mix(0.05, 0.15, this.noise)

    Tween.instance.set(this.getEl(), {
      width: this.radius * 2,
      height: this.radius * 2,
      x:this.x - this.radius,
      y:this.y - this.radius,
    })

    if(Update.instance.cnt % 2 == 0) {
      // 円形に配置
      const dist = this.radius * 2 * Math.PI;
      const elSize = (dist / this._elNum);

      const centerX = 0;
      const centerY = 0;

      this._el.forEach((val,i) => {
        const rad = Util.instance.radian(this._c + (360 / this._elNum) * i)
        const x = centerX + Math.sin(rad) * this.radius
        const y = centerY + Math.cos(rad) * this.radius
        const ang = Util.instance.degree(Math.atan2(y, x)) + 90

        Tween.instance.set(val, {
          x:x,
          y:y,
          width:elSize,
          rotationZ:ang
        })

        val.value = String(Util.instance.map(Math.sin(i * 0.5 + this._c * 0.1), 0, 100, -1, 1));
      })
    }
  }

}