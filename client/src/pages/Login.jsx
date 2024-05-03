import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../redux/slices/authSlice";
import Loading from "../components/Loader";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();

      dispatch(setCredentials(result))
      navigate("/")
      console.log(result)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#181818]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* Левая сторона,  left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-white'>
              Контролируйте все свои задачи в одном месте!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-[#FFA500]'>
              <span>Облачный планировщик задач </span>
              <span>TaskM</span>
            </p>
            {/* Анимация птицы Bird animation*/}
            <div class="birds">
              <div class="birds__hatdove">
                <div class="birds__hatdove-shadow"></div>
                <div class="birds__hatdove-head">
                  <div class="birds__hatdove-hat"></div>
                  <div class="birds__hatdove-forehead"></div>
                  <div class="birds__hatdove-eye"></div>
                  <div class="birds__hatdove-eye"></div>
                  <div class="birds__hatdove-beak"></div>
                </div>
                <div class="birds__hatdove-backwing"></div>
                <div class="birds__circles-1"></div>
                <div class="birds__hatdove-backleg">
                  <div class="birds__curly"></div>
                </div>
                <div class="birds__hatdove-body"></div>
                <div class="birds__hatdove-frontleg">
                  <div class="birds__curly"></div>
                </div>
                <div class="birds__hatdove-frontwing"></div>
                <div class="birds__circles-2"></div>
                <div class="birds__hatdove-frontwing-finger"></div>
                <div class="birds__hatdove-frontwing-finger"></div>
                <div class="birds__hatdove-frontwing-finger"></div>
              </div>
              <div class="birds__table">
                <div class="birds__table-shadow"></div>
              </div>
              <div class="birds__laptop"></div>
              <div class="birds__laptop">
                <div class="birds__monitor">
                  <div class="birds__code"></div>
                </div>
              </div>
              <div class="birds__coffee"></div>
              <div class="birds__feather"></div>
              <div class="birds__feather"></div>
              <div class="birds__rundove-shadow"></div>
              <div class="birds__rundove">
                <div class="birds__rundove-backwing">
                  <div class="birds__finger"></div>
                  <div class="birds__finger"></div>
                  <div class="birds__finger"></div>
                  <div class="birds__circles"></div>
                </div>
                <div class="birds__rundove-head">
                  <div class="birds__rundove-eye"></div>
                  <div class="birds__rundove-eye"></div>
                  <div class="birds__rundove-beak"></div>
                </div>
                <div class="birds__rundove-backleg">
                  <div class="birds__curly"></div>
                </div>
                <div class="birds__rundove-body"></div>
                <div class="birds__rundove-frontleg">
                  <div class="birds__curly"></div>
                </div>
                <div class="birds__rundove-frontwing">
                  <div class="birds__finger"></div>
                  <div class="birds__finger"></div>
                  <div class="birds__finger"></div>
                  <div class="birds__circles"></div>
                </div>
              </div>
            </div>
            {/* Конец анимации птицы Bird animation end*/}
            {/* <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div> */}
          </div>
        </div>

        {/* Правая сторона , right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-[#212121] px-10 pt-14 pb-14'
          >
            <div className=''>
              <p className='text-[#FFA500] text-3xl font-bold text-center'>
                Добро пожаловать!
              </p>
              <p className='text-center text-base text-white '>
                Сохраните свои учетные данные!
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='Электронная почта'
                className='w-full rounded-full'
                register={register("email", {
                  required: "Адрес электронной почты обязателен!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='Ваш пароль'
                type='password'
                name='password'
                label='Пароль'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Необходим пароль!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <span className='text-sm text-gray-500 hover:text-black hover:underline cursor-pointer'>
               
              </span>

              {isLoading ? (<Loading />
              ) : (
                <Button
                  type='submit'
                  label='Войти'
                  className='w-full h-10 bg-[#FFA500] text-white rounded-full'
                />)}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
