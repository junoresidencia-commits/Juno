import type { CkdStage, Sex } from '../types'

/**
 * CKD-EPI 2021 creatinine equation (race-free).
 * Creatinine in mg/dL. Returns eGFR in mL/min/1.73 m².
 * Inker et al., NEJM 2021.
 */
export function calculateCkdEpi2021(
  creatinineMgDl: number,
  age: number,
  sex: Sex,
): number {
  if (!Number.isFinite(creatinineMgDl) || creatinineMgDl <= 0) return NaN
  if (!Number.isFinite(age) || age < 18 || age > 120) return NaN

  const kappa = sex === 'F' ? 0.7 : 0.9
  const alpha = sex === 'F' ? -0.241 : -0.302
  const sexFactor = sex === 'F' ? 1.012 : 1

  const scrOverKappa = creatinineMgDl / kappa
  const egfr =
    142 *
    Math.pow(Math.min(scrOverKappa, 1), alpha) *
    Math.pow(Math.max(scrOverKappa, 1), -1.2) *
    Math.pow(0.9938, age) *
    sexFactor

  return Math.round(egfr * 10) / 10
}

export function stageFromEgfr(egfr: number): CkdStage {
  if (egfr >= 90) return 'G1'
  if (egfr >= 60) return 'G2'
  if (egfr >= 45) return 'G3a'
  if (egfr >= 30) return 'G3b'
  if (egfr >= 15) return 'G4'
  return 'G5'
}

/** CKD by eGFR criterion (<60). Albuminuria not captured in this MVP. */
export function hasCkdByEgfr(egfr: number): boolean {
  return Number.isFinite(egfr) && egfr < 60
}
