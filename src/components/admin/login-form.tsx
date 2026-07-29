"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/schemas/auth-schema";
import { loginAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function LoginForm(): React.JSX.Element {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await loginAction(data);
      if (result && !result.success) {
        toast.error(result.error || "Invalid credentials");
        setIsLoading(false);
      }
    } catch {
      // Server redirect will occur on success
    }
  };

  return (
    <Card className="w-full max-w-md shadow-card border-border bg-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-heading font-bold text-center">
          Jay Shree Ram Bike Point
        </CardTitle>
        <CardDescription className="text-center">
          Enter your admin credentials to login
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@jsrbikepoint.com"
              disabled={isLoading}
              className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login to Dashboard"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
