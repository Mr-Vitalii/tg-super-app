
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { RegisterFormData } from "@/common/types/auth";
import styles from "./Form.module.scss";
import clsx from "clsx";

import { Button } from "../Button/Button";
import * as apiClient from "../../api-clients";


export const Form = () => {
 
   const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();


    const mutation = useMutation(apiClient.register, {
            onSuccess: async () => {
                console.log("registration OK");
        },
            onError: (error: Error) => {
                    console.log(error.message);
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

   return (
    <>
        <div className={styles.form_container}>
            <form onSubmit={onSubmit}  className={styles.form}>
                <div  className={clsx(styles.form_input_container, styles.col_2)}>
                    <label  className={styles.form_label}>
                        First Name
                        <input
                        className={styles.form_input}
                            {...register("firstName", { required: "This field is required" })} >
                        </input>
                        {errors.firstName && (
                        <span className={styles.form_input_error}>{errors.firstName.message}</span>
                        )}
                    </label>
                    <label className={styles.form_label}>
                        Last Name
                        <input
                        className={styles.form_input}
                            {...register("lastName", { required: "This field is required" })} >
                           </input>
                            {errors.lastName && (
                            <span className={styles.form_input_error}>{errors.lastName.message}</span>
                        )}
                    </label>
                </div>
                    <label className={styles.form_label}>
                        Email
                        <input
                        type="email"
                        className={styles.form_input}
                            {...register("email", { required: "This field is required" })} >
                        </input>
                        {errors.email && (
                            <span className={styles.form_input_error}>{errors.email.message}</span>
                        )}
                    </label>
                    <label className={styles.form_label}>
                        Password
                        <input
                        type="password"
                        className={styles.form_input}
                            {...register("password", {
                                required: "This field is required",
                                    minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                    },
                                })} >
                        </input>
                        {errors.password && (
                        <span className={styles.form_input_error}>{errors.password.message}</span>
                        )}
                    </label>
                    <label className={styles.form_label}>
                        Confirm Password
                        <input
                        type="password"
                        className={styles.form_input}
                            {...register("confirmPassword", { 
                                    validate: (val) => {
                                    if (!val) {
                                    return "This field is required";
                                    } else if (watch("password") !== val) {
                                    return "Your password do not match";
                                    }
                                },
                                })} >
                        </input>
                        {errors.confirmPassword && (
                            <span className={styles.form_input_error}>
                            {errors.confirmPassword.message}
                            </span>
                        )}
                    </label>
                     <div className={styles.form_btn}>
                        <Button type="submit" variant="reg_btn" size="large">Создать аккаунт</Button>
                    </div>
            </form>
        </div>
    </>
    );
};
