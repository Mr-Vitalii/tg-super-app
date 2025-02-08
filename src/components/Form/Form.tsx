import { useCallback, useEffect, useState } from "react";
import styles from "./Form.module.scss";
import { useTelegram } from "../../hooks/useTelegram";

/* import * as apiClient from "../../api-clients";
import { useMutation } from "react-query"; */

export const Form = () => {
  const { tg, user } = useTelegram();

  const [userData, setUserData] = useState({});

/*     const mutation = useMutation(apiClient.register, {
    onSuccess: (data) => {
      console.log("Auth success:", data);
      localStorage.setItem("token", data.token);
    },
    onError: (error: Error) => {
      console.error("Auth error:", error.message);
    },
    }); */
  
  
  const onSendData = useCallback(() => {

    if (user) {

        setUserData({ username: user.username, id: user.id });
        console.log({ username: user.username, id: user.id });
        console.log(userData);

      const data = {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          auth_date: tg.initDataUnsafe.auth_date,
          hash: tg.initDataUnsafe.hash,
      };

      tg.sendData(JSON.stringify(data));
    }
  
    
  }, []);

  useEffect(() => {
    tg.ready();
    tg.MainButton.setText("Войти").show();


    tg.onEvent("mainButtonClicked", onSendData);

/*     tg.onEvent("mainButtonClicked", () => {
      if (user) {
        setUserData({ username: user.username, id: user.id });

        console.log({ username: user.username, id: user.id });
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
    }); */

    return () => {
      tg.offEvent("mainButtonClicked");
    };
  }, [onSendData]);

  return (
    <div className={styles.auth_container}>
      <h3>Авторизация через Telegram</h3>
          <p>Нажмите кнопку &quot;Войти&quot; в Telegram</p>
    </div>
  );
};
