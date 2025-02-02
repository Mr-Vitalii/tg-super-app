
import styles from "./Home.module.scss"
import { useState } from "react";

import home from '/assets/home.png';

import { useTelegram } from "@/hooks/useTelegram"
import { Button } from "@/components/Button/Button";

const data = {
  email: "222@gmail.com",
  password: "123456",
  firstName: "vitto2",
  lastName: "gugu2",
};

export const Home = () => {
  const { user, onToggleButton, tg } = useTelegram();
  

  //* Для пробной отправки запроса
    const [response, setResponse] = useState(null);
    const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);


  const onSend = async () => {
        console.log(data);
    try {
      const res = await fetch('XXXXXXXXXX', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.log("Error");
        // throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const responseData = await res.json(); 
      setResponse(responseData);
     

      const email = responseData.data?.email; 
       setEmail(email)

       console.log("Email:", email);
      
      console.log(response);
    } catch (err) {
      setError(err.message);
    }
  };


  
  return (
      <div>
      <div className="home">
        
        <p className={styles.greetings}>
        Приветсвуем Вас,{" "}
        <span className={styles.user_name}>{user?.username}</span> . Мы
        рады что вы выбрали наш сервис.
        </p>

         <div className={styles.img_container}>
          <img src={home} alt="man in glasses" />
        </div>
      
        <div>
            <Button onClick={onSend} variant="primary" size="large">Отправить данные</Button>
        </div>

        <br />
        <br />
        <br />

      {email && (
          <p>
            Email: <strong>{email}</strong>
          </p>
        )}

        {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}

      </div>
    </div>
  )
}
