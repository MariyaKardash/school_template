/* Parent class */
function Builder(value) {
  this.value = value
}

Builder.prototype.get = function () {
  console.log(this.value)
  return this.value
}

Builder.prototype.plus = function (...args) {
  args.forEach((item) => { this.value += item })
  console.log(this.value)
  return this
}

/* Child class ES5 */

function IntBuilder(int = 0) {
  this.value = int
}

IntBuilder.prototype = Object.create(Builder.prototype)
IntBuilder.prototype.constructor = IntBuilder

IntBuilder.prototype.minus = function (...args) {
  args.forEach((item) => { this.value -= item })
  console.log(this.value)
  return this
}

IntBuilder.prototype.multiply = function (arg = 1) {
  this.value *= arg
  console.log(this.value)
  return this
}

IntBuilder.prototype.divide = function (arg = 1) {
  this.value = Math.trunc(this.value / arg)
  console.log(this.value)
  return this
}

IntBuilder.prototype.mod = function (arg = 1) {
  const mod = this.value % arg
  this.value = mod
  console.log(this.value)
  return this
}

/* Static method */

IntBuilder.random = function (from, to) {
  return Math.floor(from + Math.random() * (to + 1 - from))
}

console.log('Static method', IntBuilder.random(4, 10))

/* Example Es5 */
console.log('Example ES5')
const intBuilder = new IntBuilder(10)
intBuilder
  .plus(2, 3, 2)
  .minus(1, 2)
  .multiply(2)
  .divide(4)
  .mod(3)
  .get()

/* Child class ES6 */

class StringBuilder extends Builder {
  constructor(str = '') {
    super()
    this.value = str
  }

  minus(n) {
    this.value = this.value.slice(0, -n)
    console.log(this.value)
    return this
  }

  multiply(int) {
    this.value = this.value.repeat(int)
    console.log(this.value)
    return this
  }

  divide(n) {
    const k = Math.floor(this.value.length / n)
    this.value = this.value.slice(0, k)
    console.log(this.value)
    return this
  }

  remove(str) {
    while (this.value.includes(str)) {
      this.value = this.value.slice(0, this.value.indexOf(str))
      + this.value.slice(this.value.indexOf(str) + str.length)
    }
    console.log(this.value)
    return this
  }

  sub(from, n) {
    this.value = this.value.slice(from, from + n)
    console.log(this.value)
    return this
  }
}

/* Example ES6 */
console.log('Example ES6')
const strBuilder = new StringBuilder('Hello')
strBuilder.plus(' all', '!')
  .minus(4)
  .multiply(3)
  .divide(4)
  .remove('l')
  .sub(1, 1)
  .get()
