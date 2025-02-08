import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import styles from "./Form.module.scss";

import * as apiClient from "../../api-clients";
import { useTelegram } from "@/hooks/useTelegram";



export const Form = () => {

   const { tg, user } = useTelegram();

  const [userData, setUserData] = useState<{ username?: string; id?: number }>({});
  
  const mutation = useMutation(apiClient.register, {
    onSuccess: (data) => {
      console.log("Auth success:", data);
      /* localStorage.setItem("token", data.token); */
    },
    onError: (error: Error) => {
      console.error("Auth error:", error.message);
    },
  });

  useEffect(() => {
    tg.ready();
    tg.MainButton.setText("Войти").show();

    tg.onEvent("mainButtonClicked", () => {
      if (tg.initDataUnsafe?.user) {


        
        setUserData({ username: user.username, id: user.id });
        console.log(userData);
        

        mutation.mutate({
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          auth_date: tg.initDataUnsafe.auth_date,
          hash: tg.initDataUnsafe.hash,
        });
      }
    });

    return () => {
      tg.offEvent("mainButtonClicked");
    };
  }, []);

  return (
    <div className={styles.auth_container}>
      <h3>Авторизация через Telegram</h3>
      <p>Нажмите кнопку "Войти" в Telegram</p>
    </div>
  );
};