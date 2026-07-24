import { calculateCkdEpi2021, stageFromEgfr } from '../src/lib/ckd-epi'

function assertClose(actual: number, expected: number, tol = 0.2) {
  if (Math.abs(actual - expected) > tol) {
    throw new Error(`Expected ~${expected}, got ${actual}`)
  }
}

assertClose(calculateCkdEpi2021(1.0, 50, 'F'), 68.6)
assertClose(calculateCkdEpi2021(1.0, 50, 'M'), 91.7)
assertClose(calculateCkdEpi2021(1.4, 62, 'F'), 42.5)

if (stageFromEgfr(95) !== 'G1') throw new Error('G1')
if (stageFromEgfr(70) !== 'G2') throw new Error('G2')
if (stageFromEgfr(50) !== 'G3a') throw new Error('G3a')
if (stageFromEgfr(35) !== 'G3b') throw new Error('G3b')
if (stageFromEgfr(20) !== 'G4') throw new Error('G4')
if (stageFromEgfr(10) !== 'G5') throw new Error('G5')

console.log('ckd-epi checks passed')
