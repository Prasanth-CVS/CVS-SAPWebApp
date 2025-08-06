import Button from "@mui/material/Button";

function MyCustomButton({ action, onClick }) {
  return (
    <Button
      action={action}
      onClick={onClick}
      sx={{
        backgroundColor: "purple",
        color: "white",
      }}
    >
      Custom Button
    </Button>
  );
}

export default MyCustomButton;
