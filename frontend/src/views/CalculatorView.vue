
<script setup>
import { ref, getCurrentInstance  } from 'vue'
import Calculator from '../core/Calculator'

const instance = getCurrentInstance()
const notify = instance?.appContext.config.globalProperties.$notify

const calculator = new Calculator()
const expression = ref('')

const memoryButtons = ['MC', 'MR', 'M+', 'M-', 'MS']

function update() {
  expression.value = calculator.expression
}

function appendSymbol(symbol) {
  if (symbol === '÷') calculator.appendBasicSymbols('/')
  else if (symbol === '×') calculator.appendBasicSymbols('*')
  else calculator.appendBasicSymbols(symbol)
  update()
}

function appendNumber(num) {
  calculator.appendNumber(num)
  update()
}

function appendComplex(op) {
  calculator.appendComplexOperations(op)
  update()
}

function onMemoryClick(op) {
  calculator.memoryOperations(op)
  update()
}

function clear() {
  calculator.clear()
  update()
}

function backspace() {
  calculator.backspace()
  update()
}

function calculate() {
  const res = calculator.calculate()
  if (res === null) {
    notify('Error: Incorrect expression', 'error')
  }
  update()
}

const numberPad = [
  [
    { label: '7', class: 'btn btn-secondary calc-button', action: () => appendNumber('7') },
    { label: '8', class: 'btn btn-secondary calc-button', action: () => appendNumber('8') },
    { label: '9', class: 'btn btn-secondary calc-button', action: () => appendNumber('9') },
    { label: '×', class: 'btn btn-dark calc-button', action: () => appendSymbol('*') }
  ],
  [
    { label: '4', class: 'btn btn-secondary calc-button', action: () => appendNumber('4') },
    { label: '5', class: 'btn btn-secondary calc-button', action: () => appendNumber('5') },
    { label: '6', class: 'btn btn-secondary calc-button', action: () => appendNumber('6') },
    { label: '-', class: 'btn btn-dark calc-button', action: () => appendSymbol('-') }
  ],
  [
    { label: '1', class: 'btn btn-secondary calc-button', action: () => appendNumber('1') },
    { label: '2', class: 'btn btn-secondary calc-button', action: () => appendNumber('2') },
    { label: '3', class: 'btn btn-secondary calc-button', action: () => appendNumber('3') },
    { label: '+', class: 'btn btn-dark calc-button', action: () => appendSymbol('+') }
  ],
  [
    { label: '±', class: 'btn btn-secondary calc-button', action: () => appendComplex('+-') },
    { label: '0', class: 'btn btn-secondary calc-button', action: () => appendNumber('0') },
    { label: '.', class: 'btn btn-secondary calc-button', action: () => appendNumber('.') },
    { label: '=', class: 'btn btn-success calc-button', action: calculate }
  ]
]
</script>

<template>
  <div>
    <div class="bg-light calculator text-center shadow">
      <input type="text" v-model="expression" id="result" class="form-control mb-3" disabled />

      <div class="d-flex gap-2 mb-2">
        <button v-for="op in memoryButtons" :key="op" class="btn btn-secondary calc-memory-button" @click="onMemoryClick(op)">{{ op }}</button>
      </div>

      <div class="d-flex gap-2 mb-2">
        <button class="btn btn-dark calc-button" @click="appendSymbol('(')">(</button>
        <button class="btn btn-dark calc-button" @click="appendSymbol(')')">)</button>
        <button class="btn btn-dark calc-button" @click="clear">C</button>
        <button class="btn btn-dark calc-button" @click="backspace"><i class="bi bi-backspace"></i></button>
      </div>

      <div class="d-flex gap-2 mb-2">
        <button class="btn btn-dark calc-button" @click="appendComplex('1/x')">1/x</button>
        <button class="btn btn-dark calc-button" @click="appendComplex('pow2')">x²</button>
        <button class="btn btn-dark calc-button" @click="appendComplex('sqrt')">√</button>
        <button class="btn btn-dark calc-button" @click="appendSymbol('/')">÷</button>
      </div>

      <div v-for="row in numberPad" :key="row.join('')" class="d-flex gap-2 mb-2">
        <button
          v-for="btn in row"
          :key="btn.label"
          :class="btn.class"
          @click="btn.action()"
        >{{ btn.label }}</button>
      </div>
    </div>
  </div>
</template>
