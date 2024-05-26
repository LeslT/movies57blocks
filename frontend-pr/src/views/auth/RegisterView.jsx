import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/errorMessage";
import { Link } from "react-router-dom";

export default function RegisterView() {
  
  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const password = watch('password');

  const handleRegister = (formData) => {}

  return (
    <>
      <h1 className="text-5xl font-black text-white">Create account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Fill the form to {''}
        <span className=" text-fuchsia-500 font-bold"> create an account</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="register email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Register password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: 'The Password must be at least 8 characters'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Repeat password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat your password"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "confirmation password is required",
              validate: value => value === password || 'Passwords are not the same'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Register'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
          <Link to={'/login'} className="text-center text-gray-300 font-normal">
          do you already have an account? log in here
          </Link>
      </nav>
    </>
  )
}