import { useNavigate } from "react-router-dom";

export default function EditPatientForm() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="m-1 bg-slate-500 px-2 text-white"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
      <form action="">EditPatientForm</form>
    </>
  );
}
