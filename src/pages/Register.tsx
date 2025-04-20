
import { useState, FormEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "../hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AuthContext from '../contexts/AuthContext';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  birthDay: z.string().min(1, "Day is required"),
  birthMonth: z.string().min(1, "Month is required"),
  birthYear: z.string().min(1, "Year is required"),
  gender: z.string().min(1, "Gender is required"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      gender: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        phone: values.phone,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            phone: values.phone,
            birth_date: `${values.birthYear}-${values.birthMonth}-${values.birthDay}`,
            gender: values.gender,
          },
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        });
        return;
      }

      if (data.user) {
        const userData = {
          id: data.user.id,
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));

        toast({
          title: "Account created",
          description: "You have successfully registered and logged in.",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate day options
  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Month options
  const monthOptions = [
    { value: '1', label: 'Jan' },
    { value: '2', label: 'Feb' },
    { value: '3', label: 'Mar' },
    { value: '4', label: 'Apr' },
    { value: '5', label: 'May' },
    { value: '6', label: 'Jun' },
    { value: '7', label: 'Jul' },
    { value: '8', label: 'Aug' },
    { value: '9', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' },
  ];
  
  // Year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <img src="/neplink-logo.svg" alt="NepLink" className="h-14 w-14 mx-auto" />
          <h1 className="text-neplink-blue text-4xl font-bold mt-2">neplink</h1>
        </div>
        
        <div className="bg-white rounded-lg neplink-shadow p-6">
          <h2 className="text-2xl font-bold mb-1 text-center">Create a new account</h2>
          <p className="text-gray-600 mb-4 text-center">It's quick and easy.</p>
          
          <div className="border-t border-gray-300 mb-4"></div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="First name" {...field} className="input-field" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Surname" {...field} className="input-field" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email address" type="email" {...field} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Phone number" type="tel" {...field} className="input-field" />
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
                    <FormControl>
                      <Input placeholder="New password" type="password" {...field} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-1">
                <FormLabel className="text-sm text-gray-600">Date of birth</FormLabel>
                <div className="grid grid-cols-3 gap-3">
                  <FormField
                    control={form.control}
                    name="birthDay"
                    render={({ field }) => (
                      <FormItem>
                        <select 
                          {...field}
                          className="input-field"
                        >
                          <option value="">Day</option>
                          {dayOptions.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="birthMonth"
                    render={({ field }) => (
                      <FormItem>
                        <select 
                          {...field}
                          className="input-field"
                        >
                          <option value="">Month</option>
                          {monthOptions.map(month => (
                            <option key={month.value} value={month.value}>{month.label}</option>
                          ))}
                        </select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="birthYear"
                    render={({ field }) => (
                      <FormItem>
                        <select 
                          {...field}
                          className="input-field"
                        >
                          <option value="">Year</option>
                          {yearOptions.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <FormLabel className="text-sm text-gray-600">Gender</FormLabel>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2">
                    <label htmlFor="female">Female</label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={form.watch("gender") === "female"}
                      onChange={() => form.setValue("gender", "female")}
                      className="h-4 w-4"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2">
                    <label htmlFor="male">Male</label>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={form.watch("gender") === "male"}
                      onChange={() => form.setValue("gender", "male")}
                      className="h-4 w-4"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2">
                    <label htmlFor="custom">Custom</label>
                    <input
                      type="radio"
                      id="custom"
                      name="gender"
                      value="custom"
                      checked={form.watch("gender") === "custom"}
                      onChange={() => form.setValue("gender", "custom")}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
                <FormMessage>{form.formState.errors.gender?.message}</FormMessage>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
                You may receive SMS notifications from us and can opt out at any time.
              </p>
              
              <div className="flex justify-center pt-2">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-neplink-green text-white text-lg font-semibold py-2 px-16 rounded-lg hover:brightness-110"
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </Button>
              </div>
              
              <div className="text-center mt-4">
                <Link to="/login" className="text-neplink-blue hover:underline">
                  Already have an account?
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
