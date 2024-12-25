import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20rem",
      }}
    >
      <RotatingLines
        strokeColor="#333"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}

export default Loader;
