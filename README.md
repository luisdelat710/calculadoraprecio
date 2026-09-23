# Pricing & Margin Decision Tool

**Business Analysis · Pricing Rules · Retail Operations · Validation · AI-Assisted Development**

[Open the interactive demo](https://luisdelat710.github.io/demand-capture-operations-case-study/pricing/)

## Business problem

In retail pricing, a percentage added to cost (**markup**) and a percentage of the selling price (**gross margin**) answer different questions. Treating them as interchangeable can produce a price below the intended gross margin. Products sold by the box also need a comparable price per square meter.

This case adapts a pricing calculator from an operating retail context into a public demonstration. The demo uses **illustrative inputs only**. It does not disclose actual supplier costs, transactions, customers, or business results.

## My contribution

I identified the pricing distinction that needed to be encoded, specified the inputs and outputs for the operating decision, and used AI-assisted development to implement and review the calculator. The portfolio version makes the formula, assumptions, and validation cases explicit. I do not present the code as evidence of independent software engineering or claim a measured profit increase.

## Business rules and acceptance criteria

| Input or rule | Expected behavior |
| --- | --- |
| Cost per box | Positive amount before tax. |
| Target gross margin | From 0% to below 100%, measured against selling price before tax. |
| Tax rate | Editable demo assumption, initially 16%. Tax is shown separately and is excluded from gross profit. |
| Square meters per box | Optional positive amount. When present, show final price and cost per m². |
| Invalid input | Show an error and no calculated prices. |
| Display rounding | Calculate with full precision, then display currency to two decimals. |

**Core formula:** `price before tax = cost / (1 - target margin / 100)`.

Then `gross profit = price before tax - cost`, `tax = price before tax × tax rate`, and `final price = price before tax + tax`. Here “gross profit” means revenue before tax minus the product cost entered; it excludes freight, overhead, discounts, other taxes and fees. The tool is a pricing aid, not a full profitability audit.

## Reproducible example

For an illustrative cost of **$100 per box**, target margin of **30%**, tax assumption of **16%**, and **1.64 m² per box**:

| Result | Value displayed |
| --- | ---: |
| Selling price before tax | $142.86 |
| Gross profit per box before tax | $42.86 |
| Tax | $22.86 |
| Final price per box | $165.71 |
| Final price per m² | $101.05 |

If someone instead adds 30% to the $100 cost, the before-tax selling price is **$130**, which yields only **23.08% gross margin** (`30 / 130`). The demo shows this comparison as a diagnostic, not as a report of actual historical losses.

## Validation

The calculation module has automated checks for the target margin formula, the markup comparison, unit pricing, zero margin or tax, and invalid input. Run them with `node --test tests/pricing.test.mjs`. The page uses the same module as the tests.

## Use the demo

Open the link above, choose **Load example**, and change cost, margin, tax assumption, or box area. The page computes in the browser. It sends no form values to a server and has no database connection.

## Scope and limitations

- All examples are illustrative. No real customer, employee, supplier, or transactional data is included in the current demo.
- The tax rate is an editable assumption, not tax advice or a claim about every product or jurisdiction.
- The model does not incorporate discounts, freight, commissions, or overhead. Those would need separately defined business rules and validated inputs.
- Earlier Git commits reflect the original operating prototype; this README describes the current portfolio version.

## What this demonstrates

Translation of an operating pricing problem into explicit business rules, validation of calculations, distinction between markup and margin, transparent assumptions, and AI-assisted implementation reviewed against the business requirement.
