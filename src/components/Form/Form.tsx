import { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import { useTelegram } from "../../hooks/useTelegram";

export const Form = () => {
  const { tg, user } = useTelegram();

  const [userData, setUserData] = useState({});

  /*   const mutation = useMutation(apiClient.authWithTelegram, {
    onSuccess: (data) => {
      console.log("Auth success:", data);
      localStorage.setItem("token", data.token);
    },
    onError: (error: Error) => {
      console.error("Auth error:", error.message);
    },
  }); */

  useEffect(() => {
    tg.ready();
    tg.MainButton.setText("Войти").show();

    tg.onEvent("mainButtonClicked", () => {
      if (user) {
        setUserData({ username: user.username, id: user.id });

        console.log({ username: user.username, id: user.id });
        console.log(userData);
      }
    });

    return () => {
      tg.offEvent("mainButtonClicked");
    };
  }, []);

  return (
    <div className={styles.auth_container}>
      <h3>Авторизация через Telegram</h3>
          <p>Нажмите кнопку &quot;Войти&quot; в Telegram</p>
    </div>
  );
};
