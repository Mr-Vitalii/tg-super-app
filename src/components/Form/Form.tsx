import { useEffect, useState } from "react";

import styles from "./Form.module.scss";

import { useTelegram } from "@/hooks/useTelegram";
import { Modal } from "../Modal/Modal";

export const Form = () => {
  const { tg, user } = useTelegram();
  const [userData, setUserData] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    tg.ready();
    tg.MainButton.setText("Войти").show();


    const handleMainButtonClick = async () => {
      if (!user) return;

      const userData = {
        name: user?.username,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        hash: tg.initDataUnsafe.hash,
      };

       try {
        const response = await fetch("https://e076-188-163-81-109.ngrok-free.app/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
         setUserData(data.message || "Успех");
         tg.MainButton.setText("Войти").hide();
         setIsModalOpen(true)
      } catch (error:any) {
        setUserData("Ошибка при авторизации");
      }
    };


   tg.onEvent("mainButtonClicked", handleMainButtonClick);

    return () => {
      tg.offEvent("mainButtonClicked");
    };
  }, [tg, user]);

  return (
    <>
      <div className={styles.auth_container}>
      <h3>Авторизация через Telegram !!!</h3>
      <p>Нажмите кнопку "Войти" в Telegram</p>
      <p>Это ответ от бекенда: {userData}</p>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Поздравляем!</h2>
        <p>Вы успешно зарегистрированы</p>
      </Modal>
    </>
    
  );
};
