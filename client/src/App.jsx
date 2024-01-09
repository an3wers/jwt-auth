import "@radix-ui/themes/styles.css";
import AuthContainer from "./components/Auth/AuthContainer";

function App() {
  return (
    <div>
      {/* 
        Все на одно странице
        Авторизация или регистрация компонент
        Если авторизован, то email пользователя и logout
      */}
      <AuthContainer />
    </div>
  );
}

export default App;
