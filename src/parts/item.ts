
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Func } from "../core/func";

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

  constructor(opt:any) {
    super(opt)

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
    this.radius = Math.min(sw, sh) * Util.instance.mix(0.1, 0.3, this.noise)

    Tween.instance.set(this.getEl(), {
      width: this.radius * 2,
      height: this.radius * 2,
      x:this.x - this.radius,
      y:this.y - this.radius,
    })
  }

}