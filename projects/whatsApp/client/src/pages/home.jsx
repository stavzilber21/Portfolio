import React, { useState, useEffect } from "react";
import LeftMenu from '../components/LeftMenu'
import ChatDetail from '../components/ChatDetail'
import styles from '../UI/home.module.css'
import LoadingScreen from "../components/LoadingScreen";

export const Home = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      if (progress >= 100) setLoading(false);
      else {
        const increment = Math.floor(Math.random() * (10 + 1)) + 7;
        setProgress(progress + increment);
      }
    }, 300);

    return () => clearTimeout(id);
  }, [progress]);

  return (
    <>
     {loading ? (
        <LoadingScreen progress={progress} />
      ) : (
        <div className={styles.container}>
        <div className={styles.sidebar}>
          <LeftMenu />
        </div>
        <div className={styles["chat-window"]}>
          <ChatDetail />
        </div>
      </div>
      )}
    </>
    
  )
}
export default Home
