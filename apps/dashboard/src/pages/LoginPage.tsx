import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import useAuthStore from "@/store/useAuthStore";
import { toast } from "@/components/ui/toast";

const formSchema = z.object({
  email: z.email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchSession = useAuthStore((state) => state.fetchSession);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const performLogin = async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw new Error(
          error.message === "Invalid login credentials"
            ? "Email atau password salah."
            : error.message,
        );
      }

      await fetchSession();
      return data;
    };

    try {
      await toast.promise(performLogin(), {
        loading: { title: "Sedang memproses...", type: "loading" },
        success: { title: "Login Berhasil!", type: "success" },
        error: (err: Error) => ({
          title: "Login Gagal!",
          description: err.message,
          type: "error",
        }),
      });
    } catch {
      // Error is already handled by toast
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center px-5 bg-accent">
      <Card className="w-full sm:max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Content Management System Dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="ex: admin_ganteng@gmail.com"
                      autoComplete="email"
                      type="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Masukkan Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                      />
                      <InputGroupAddon
                        align="inline-end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <InputGroupButton>
                          {showPassword ? <Eye /> : <EyeOff />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="responsive">
            <Button type="submit" form="login-form" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Login"}
            </Button>
            <Button variant="link" type="button">
              Forgot Password?
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
