import { Button } from "antd";
import { useLocation, useNavigate } from "react-router";

const GoBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    const fromPath = location.state?.from;

    const isInternalNavigation =
      (window.history.state && window.history.state.idx > 0) ||
      (document.referrer && document.referrer.includes(window.location.origin));

    if (fromPath) {
      navigate(fromPath);
    } else if (isInternalNavigation) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Button
      onClick={handleGoBack}
      style={{ width: "fit-content", margin: "10px 0 0 16px" }}
    >
      Назад
    </Button>
  );
};

export default GoBackButton;
