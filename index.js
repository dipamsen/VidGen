/// @ts-check
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

const Manim = {}

Manim.Object = class Object {
  constructor() {
    this.x = canvas.width / 2
    this.y = canvas.height / 2
  }
  /**
   * @param {number} frac
   */
  create(frac) { }
}

class Circle extends Manim.Object {
  /**
   * @param {number} frac
   */
  create(frac) {
    ctx.beginPath()
    ctx.ellipse(this.x, this.y, 20, 20, 0, 0, frac * Math.PI * 2)
    ctx.stroke()
  }
}
class Square extends Manim.Object {
  /**
   * @param {number} frac
   */
  create(frac) {
    const sec = frac < 0.25 ? 1 : frac < 0.5 ? 2 : frac < 0.75 ? 3 : 4
    ctx.beginPath()
    ctx.moveTo(this.x - 80, this.y - 80)
    const acf = frac == 1 ? 1 : frac % 0.25 * 4
    if (sec == 1) {
      ctx.lineTo(this.x - 80 + 160 * acf, this.y - 80)
    } else if (sec == 2) {
      ctx.lineTo(this.x + 80, this.y - 80)
      ctx.lineTo(this.x + 80, this.y - 80 + 160 * acf)
    } else if (sec == 3) {
      ctx.lineTo(this.x + 80, this.y - 80)
      ctx.lineTo(this.x + 80, this.y + 80)
      ctx.lineTo(this.x + 80 - 160 * acf, this.y + 80)
    } else {
      ctx.lineTo(this.x + 80, this.y - 80)
      ctx.lineTo(this.x + 80, this.y + 80)
      ctx.lineTo(this.x - 80, this.y + 80)
      ctx.lineTo(this.x - 80, this.y + 80 - 160 * acf)
    }
    ctx.stroke()
  }
}

Manim.Animation = class Animation {
  /**
   * @param {Manim.Object} obj
   */
  constructor(obj) {
    this.mobject = obj
    this.done = false
    this.duration = 60
    this.completedFrames = 0
  }
  nextFrame() {
    if (this.completedFrames < this.duration)
      this.completedFrames++
    else this.done = true
  }
  get frac() {
    return this.completedFrames / this.duration
  }
}

const o1 = new Square()
const a1 = new Manim.Animation(o1)

const animations = [
  a1
]
function animate() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  a1.nextFrame()
  a1.mobject.create(a1.frac)
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

// animations.forEach(x => x.draw())
export default {}