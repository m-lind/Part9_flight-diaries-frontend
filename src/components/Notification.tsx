interface Props {
  message: string;
}

const Notification = ({ message }: Props) => {
  if (!message) {
    return;
  }

  const style = {
    color: "red",
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
