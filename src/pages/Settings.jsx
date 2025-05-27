import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useForm} from "react-hook-form";

export default function Settings() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      // Error is already handled in AuthContext
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 container flex flex-col items-start gap-1">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]">Settings</h1>
        <p className="text-base text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Update your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <from onSubmit={handleSubmit(onSubmit)}>

          </from>
        </CardContent>
      </Card>
    </div>
  )
}