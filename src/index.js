class VerticalSlider {
  constructor(props) {
    this.opts = {
      el: '',
      scrollSpeed: 1100,
      onInit: function () {}
    }

    this.onAnimate = false
    this.index = 0
    this.wheelState = ''
    this.height = window.innerHeight

    this.set(props)
    this.init()
    this.runEvents()
  }

  init() {
    let $section = document.querySelectorAll('.section')
    let $wrapper = document.querySelector(this.opts.el)
    this.sectionLength = $section.length -1
    $wrapper.style.transition = `all ${this.scrollSpeed}ms ease`

    /**
     * FIX ME
     * rebuild after refresh page
     */
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 5000)
    this.opts.onInit()
  }

  set(props) {
    this.opts = {
      ...this.opts,
      ...props
    }
  }

  get() {
    return this.opts
  }

  runEvents() {
    window.addEventListener('wheel', evt => {
      const delta = Math.sign(evt.deltaY)
      if (!this.onAnimate) {
        if (delta == 1) {
          this.gotoSection('down')
        } else {
          this.gotoSection('up')
        }
      }
    })

    window.addEventListener('resize', () => {
      this.height = window.innerHeight
    })
  }

  gotoSection(dir) {
    if (dir == 'down') {
      if (this.index !== this.sectionLength) {
        this.index++ 
        this.wheelState = 'down'
        this.animateSection(this.index)
      }
    } else if (dir == 'up') {
      if (this.index !== 0) {
        this.index--
        this.wheelState = 'up'
        this.animateSection(this.index)
      }
    }
  }

  goTo(pos) {
    if (pos) {
      this.index = pos -1
      this.animateSection(this.index)  
    }
  }

  animateSection(index) {
    if (!this.onAnimate) {
      this.onAnimate = true
      let pos = this.height * index 
      this.transformSection(pos)
    }
  }

  transformSection(pos) {
    let $wrapper = document.querySelector(this.opts.el)
    $wrapper.style.transition = `all ${this.opts.scrollSpeed}ms ease`
    $wrapper.style.transform = `translate3d(0px, -${pos}px, 0px)`
    setTimeout(() => {
      this.onAnimate = false
    }, this.opts.scrollSpeed)
  }
}

let slide = new VerticalSlider({
  el: '#wrapper',
  scrollSpeed: 1500,
  onInit() {
    console.log('on init', this)
  }
})

document.querySelector('.btn').addEventListener('click', () => {
  slide.goTo(5)
})

document.querySelector('.btn-5').addEventListener('click', () => {
  slide.goTo(1)
})