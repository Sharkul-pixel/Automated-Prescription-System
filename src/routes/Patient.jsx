import { useNavigate } from "react-router-dom";

export default function Patient() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="border"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
      <div>patient component</div>
    </div>
  );
}
