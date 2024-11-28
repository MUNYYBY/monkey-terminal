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
    </div>
  );
};

export default FallbackSpinner;
