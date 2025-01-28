// Home Page
import Footer from "../components/Sections/Footer";
import Header from "../components/Sections/Header";
import Main from "../components/Sections/Main";



export default function Home() {
  return (
    <div className={`bg-color-two flex flex-col`}>
      <Header />
       <Main />
      <Footer />
    </div>
  );
}
