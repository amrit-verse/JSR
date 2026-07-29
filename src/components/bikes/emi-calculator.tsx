"use client";

import * as React from "react";
import { Calculator, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

interface EmiCalculatorProps {
  bikePrice: number;
  bikeModel?: string;
}

export function EmiCalculator({
  bikePrice,
  bikeModel = "this bike",
}: EmiCalculatorProps): React.JSX.Element {
  // Default values
  const defaultDownPayment = Math.round(bikePrice * 0.2); // 20% down payment
  const [downPayment, setDownPayment] = React.useState<number>(defaultDownPayment);
  const [tenureMonths, setTenureMonths] = React.useState<number>(24);
  const [annualInterestRate, setAnnualInterestRate] = React.useState<number>(9.5);
  const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false);

  // EMI Calculation Math: E = P * r * (1+r)^n / ((1+r)^n - 1)
  const principal = Math.max(0, bikePrice - downPayment);
  const monthlyRate = annualInterestRate / 12 / 100;

  const monthlyEmi = React.useMemo(() => {
    if (principal <= 0 || tenureMonths <= 0) {return 0;}
    if (monthlyRate === 0) {return Math.round(principal / tenureMonths);}

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return Math.round(emi);
  }, [principal, monthlyRate, tenureMonths]);

  const totalAmountPayable = monthlyEmi * tenureMonths;
  const totalInterestPayable = Math.max(0, totalAmountPayable - principal);

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {setDownPayment(0);}
    else {setDownPayment(Math.min(bikePrice, Math.max(0, val)));}
  };

  return (
    <Card className="rounded-2xl border-border bg-card shadow-card overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-saffron-500/10 text-saffron-600 flex items-center justify-center">
            <Calculator className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-foreground">
              Instant EMI Calculator
            </h3>
            <p className="text-xs text-muted-foreground">
              Estimate monthly installments for {bikeModel}
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Simple Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Down Payment & Tenure */}
          <div className="space-y-5">
            {/* Down Payment Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <label htmlFor="down-payment-input" className="text-foreground">
                  Down Payment
                </label>
                <span className="text-saffron-600 font-bold">{formatPrice(downPayment)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="down-payment-input"
                  type="number"
                  min={0}
                  max={bikePrice}
                  step={1000}
                  value={downPayment}
                  onChange={handleDownPaymentChange}
                  className="h-10 text-sm font-bold"
                />
              </div>
              <input
                type="range"
                min={0}
                max={bikePrice}
                step={1000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-saffron-500"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Min: ₹0</span>
                <span>Max: {formatPrice(bikePrice)}</span>
              </div>
            </div>

            {/* Loan Tenure Quick Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                Loan Tenure (Months)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[12, 24, 36, 48].map((m) => (
                  <Button
                    key={m}
                    type="button"
                    variant={tenureMonths === m ? "default" : "outline"}
                    onClick={() => setTenureMonths(m)}
                    className={`h-9 text-xs font-bold rounded-lg cursor-pointer ${
                      tenureMonths === m
                        ? "bg-saffron-500 hover:bg-saffron-600 text-white"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {m} Months
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: EMI Result Highlight Card */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-saffron-950/30 text-white border border-charcoal-800 flex flex-col justify-between space-y-4 shadow-lg">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-saffron-400">
                Estimated Monthly EMI
              </span>
              <p className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-1">
                {formatPrice(monthlyEmi)}
                <span className="text-xs font-normal text-charcoal-400"> / month</span>
              </p>
            </div>

            <div className="space-y-2 text-xs border-t border-charcoal-800 pt-3 text-charcoal-300">
              <div className="flex justify-between">
                <span>Principal Loan Amount:</span>
                <span className="font-bold text-white">{formatPrice(principal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Loan Tenure:</span>
                <span className="font-bold text-white">{tenureMonths} Months</span>
              </div>
              <div className="flex justify-between">
                <span>Interest Rate (p.a.):</span>
                <span className="font-bold text-saffron-400">{annualInterestRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deferred Advanced Options Toggle */}
        <div className="border-t border-border pt-3">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs font-semibold text-saffron-600 hover:text-saffron-700 transition-colors cursor-pointer"
          >
            <span>{showAdvanced ? "Hide Advanced Calculation Options" : "Customize Interest Rate & Breakdowns"}</span>
            {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {showAdvanced && (
            <div className="mt-4 p-4 rounded-xl bg-muted/40 border border-border space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <label htmlFor="interest-rate-slider">Annual Interest Rate (%)</label>
                  <span className="text-saffron-600 font-bold">{annualInterestRate}%</span>
                </div>
                <input
                  id="interest-rate-slider"
                  type="range"
                  min={6}
                  max={18}
                  step={0.5}
                  value={annualInterestRate}
                  onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-saffron-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-border">
                <div>
                  <span className="text-muted-foreground">Total Interest Payable:</span>
                  <p className="font-bold text-foreground mt-0.5">{formatPrice(totalInterestPayable)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Amount Payable:</span>
                  <p className="font-bold text-foreground mt-0.5">{formatPrice(totalAmountPayable)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/30 p-2.5 rounded-lg border border-border/50">
          <Info className="h-3.5 w-3.5 text-saffron-500 shrink-0" />
          <span>
            * EMI estimates are for reference only. Final loan terms are subject to bank/NBFC partner approval at Jay Shree Ram Bike Point.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
