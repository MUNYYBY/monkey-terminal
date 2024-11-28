import Logo from "../Logo/Logo";
import Spinner from "./Spinner";

const FallbackSpinner = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Spinner size={"lg"} />
      <div className="mt-4">
        <Logo />
      </div>
    </div>
  );
};

export default FallbackSpinner;
