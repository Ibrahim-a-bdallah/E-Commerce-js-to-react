import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AuthContext from "@/store/Auth/AuthContext";

const Login = () => {
  const { _, setData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const data = JSON.parse(localStorage.getItem("data"));

  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address." })
      .refine((val) => data && val === data.email, {
        message: "Email not found, please register first",
      }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    const data = JSON.parse(localStorage.getItem("data"));

    if (values.email === data.email && values.password === data.password) {
      const updatedData = { ...data, status: "loggedin" }; // نسخة جديدة
      localStorage.setItem("data", JSON.stringify(updatedData));
      setData(updatedData); // تحديث بالنسخة الجديدة
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login User
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="pr-10"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="mt-2 text-sm">
                    <a
                      href="/forgot-password"
                      className="text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700"
            >
              Submit
            </Button>
          </form>
        </Form>
        {/* Register Link */}
        <p className="text-center text-gray-600 mt-3">
          Sign up Now?
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
