import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePricing } from '../pricing.mjs';

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9,
  `Expected ${actual} to be approximately ${expected}`);

test('target margin uses the selling price as denominator', () => {
  const r = calculatePricing({ cost: 100, targetMargin: 30, vatRate: 16, squareMetersPerBox: 1.64 });
  close(r.priceBeforeTax, 142.85714285714286);
  close(r.taxAmount, 22.85714285714286);
  close(r.finalPrice, 165.71428571428572);
  close(r.grossProfit, 42.85714285714286);
  close(r.achievedMargin, 30);
  close(r.pricePerSquareMeter, 101.04529616724738);
  close(r.markupPrice, 130);
  close(r.marginIfMarkupUsed, 23.076923076923077);
});

test('zero target margin and zero tax are valid', () => {
  const r = calculatePricing({ cost: 100, targetMargin: 0, vatRate: 0 });
  assert.equal(r.finalPrice, 100);
  assert.equal(r.grossProfit, 0);
  assert.equal(r.pricePerSquareMeter, null);
});

test('invalid inputs do not generate a misleading price', () => {
  for (const input of [
    { cost: 0, targetMargin: 30 },
    { cost: 100, targetMargin: 100 },
    { cost: 100, targetMargin: -1 },
    { cost: 100, targetMargin: 20, vatRate: 101 },
    { cost: 100, targetMargin: 20, squareMetersPerBox: 0 },
  ]) assert.throws(() => calculatePricing(input), RangeError);
});
