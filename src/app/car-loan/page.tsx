"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

function calculateMonthlyPayment(
  purchasePrice: number,
  downPayment: number,
  apr: number,
  term: number
): number {
  const loanAmount = purchasePrice - downPayment;
  const monthlyInterestRate = apr / 100 / 12;

  if (loanAmount <= 0) {
    return 0;
  }

  if (monthlyInterestRate > 0) {
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -term));
    return monthlyPayment;
  }

  const monthlyPayment = loanAmount / term;
  return monthlyPayment;
}

const formSchema = z.object({
  purchasePrice: z.number().int().positive(),
  downPayment: z.number().int().positive(),
  apr: z.number().positive(),
  term: z.number().int().positive(),
  yearlyIncome: z.number().int().positive(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchasePrice: 25000,
      downPayment: 5000,
      apr: 5.0,
      term: 48,
      yearlyIncome: 60000,
    },
  });

  const goodDownPayment =
    form.watch("downPayment") >= 0.2 * form.watch("purchasePrice");
  const goodLoanDuration = form.watch("term") <= 4 * 12;
  const goodMonthlyPayment =
    calculateMonthlyPayment(
      form.watch("purchasePrice"),
      form.watch("downPayment"),
      form.watch("apr"),
      form.watch("term")
    ) <=
    0.1 * (form.watch("yearlyIncome") / 12);

  return (
    <div>
      <main>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          car-loan
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">by err53</p>

        <p className="leading-7 [&:not(:first-child)]:mt-6 underline">
          <Link href="/">Home</Link>
        </p>

        <Form {...form}>
          <form className="space-y-8 pt-8">
            <FormField
              control={form.control}
              name="purchasePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price</FormLabel>
                  <FormControl>
                    <div>
                      <Input {...field} type="number" />
                      <Slider
                        defaultValue={[field.value]}
                        onChange={(value) => field.onChange(value)}
                        min={0}
                        max={100000}
                        step={1000}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The total price of the car before any down payment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="downPayment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Down Payment</FormLabel>
                  <FormControl>
                    <div>
                      <Input {...field} type="number" />
                      <Slider
                        defaultValue={[field.value]}
                        onChange={(value) => field.onChange(value)}
                        min={0}
                        max={20000}
                        step={100}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The amount of money you will pay upfront.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>APR</FormLabel>
                  <FormControl>
                    <div>
                      <Input {...field} type="number" suffix="%" />
                      <Slider
                        defaultValue={[field.value]}
                        onChange={(value) => {
                          console.log(value);
                          field.onChange(value);
                        }}
                        min={0}
                        max={10}
                        step={0.1}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The annual percentage rate of the loan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Term</FormLabel>
                  <FormControl>
                    <div>
                      <Input {...field} type="number" />
                      <Slider
                        defaultValue={[field.value]}
                        onChange={(value) => field.onChange(value)}
                        min={36}
                        max={96}
                        step={12}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The length of the loan in months.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yearly Income</FormLabel>
                  <FormControl>
                    <div>
                      <Input {...field} type="number" />
                      <Slider
                        defaultValue={[field.value]}
                        onChange={(value) => field.onChange(value)}
                        min={0}
                        max={200000}
                        step={1000}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Your yearly income before taxes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="pt-12">
          <p className={goodDownPayment ? "text-green-500" : "text-red-500"}>
            <strong>Good Down Payment:</strong> {goodDownPayment ? "Yes" : "No"}
          </p>
          <p className={goodLoanDuration ? "text-green-500" : "text-red-500"}>
            <strong>Good Loan Duration:</strong>{" "}
            {goodLoanDuration ? "Yes" : "No"}
          </p>
          <p className={goodMonthlyPayment ? "text-green-500" : "text-red-500"}>
            <strong>Good Monthly Payment:</strong>{" "}
            {goodMonthlyPayment ? "Yes" : "No"}
          </p>

          <p>
            <strong>Monthly Payment:</strong> $
            {calculateMonthlyPayment(
              form.watch("purchasePrice"),
              form.watch("downPayment"),
              form.watch("apr"),
              form.watch("term")
            ).toFixed(2)}
          </p>
        </div>
      </main>
    </div>
  );
}
