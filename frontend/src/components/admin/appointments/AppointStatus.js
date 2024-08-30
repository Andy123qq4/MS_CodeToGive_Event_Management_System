import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function AppointStatus(props) {
  const { status } = props;
  return (
    <div>
      {status === "pending" && (
        <div className="flex m-2 mb-0 text-orange-400">
          <AccessTimeIcon />
          <div className="ml-4">Status: Pending</div>
        </div>
      )}
      {status === "accept" && (
        <div className="flex m-2 mb-0 text-green-500">
          <AccessTimeIcon />
          <div className="ml-4">Status: Accepted</div>
        </div>
      )}
    </div>
  );
}
