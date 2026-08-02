import notfound from "@/assets/404-not-found.svg";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center w-[80vw] md:w-[50vw] lg:w-[30vw]">
        <img src={notfound} alt="notfound" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default NotFoundPage;
