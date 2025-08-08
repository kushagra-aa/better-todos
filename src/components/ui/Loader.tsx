import { ClipLoader } from "react-spinners";

const sizes = {
  xs: 25,
  sm: 50,
  md: 100,
  lg: 150,
  xl: 200,
};
export default function Loader({ size = "md" }: { size?: keyof typeof sizes }) {
  return (
    <div className="flex justify-center items-center">
      <ClipLoader
        color={"#07ff88"}
        loading={true}
        size={sizes[size]}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
