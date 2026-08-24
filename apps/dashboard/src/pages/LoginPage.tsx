import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

import bannerImg from "@/assets/bannerfix.webp";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { supabase } from "@/lib/supabase";
import useAuthStore from "@/store/useAuthStore";

const formSchema = z.object({
  email: z.email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchSession = useAuthStore((state) => state.fetchSession);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async (): Promise<void> => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      } else {
        fetchSession();
      }
    };
    checkSession();
  }, [navigate, fetchSession]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues): Promise<void> => {
    setIsSubmitting(true);

    const performLogin = async (): Promise<void> => {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw new Error(
          error.message === "Invalid login credentials"
            ? "Email atau password salah."
            : "Periksa koneksi internet kamu.",
        );
      }

      await fetchSession();
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

      navigate("/");
    } catch {
      // Error is already handled by toast
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-muted/40">
      {/* Outer Card Container */}
      <div className="w-full max-w-5xl bg-card rounded-md border border-border shadow-2xl p-4 sm:p-6 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* Left Column: Login Form */}
        <div className="flex flex-col justify-center px-4 py-6 sm:px-8 md:px-10 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
              Login Admin
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Content Management System Dashboard
            </p>
          </div>

          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
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
                        <InputGroupButton type="button">
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

            <div className="flex justify-end pt-1">
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button
                      variant="link"
                      type="button"
                      className="h-auto p-0 text-xs sm:text-sm text-muted-foreground hover:text-foreground font-normal"
                    >
                      Recovery Password
                    </Button>
                  }
                />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Hubungi Super Admin / Developer
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Aksi ini akan langsung mengarahkan anda untuk menghubungi
                      Super Admin / Developer 😉
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        window.open("https://wa.me/6285693415051", "_blank")
                      }
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <Button
              size="lg"
              type="submit"
              form="login-form"
              disabled={isSubmitting}
              className="w-full text-base font-medium mt-2"
            >
              {isSubmitting ? "Sedang masuk..." : "Sign In"}
            </Button>
          </form>
        </div>

        {/* Right Column: Visual Banner */}
        <div className="hidden lg:block relative lg:rounded-md overflow-hidden min-h-130">
          <img
            src={bannerImg}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
