type Props = {
  result: {
    data?: {
      message?: string;
    };
    serverAction?: string | null;
    validationError?: Record<string, string[] | undefined>;
  };
};

const MessageBox = ({
  type,
  content,
}: {
  type: "success" | "error";
  content: React.ReactNode;
}) => {
  return (
    <div
      className={`border bg-accent my-2 px-4 py-2 rounded-lg ${
        type === "success"
          ? "bg-green-100 border-green-500 text-green-700"
          : "bg-red-100 border-red-500 text-red-700"
      }`}
    >
      {type === "success" ? "🎉" : "🚨"} {content}
    </div>
  );
};

export function DisplayServerActionResponse({ result }: Props) {
  const { data, serverAction, validationError } = result;

  return (
    <div>
      {data?.message && (
        <MessageBox type="success" content={`Success: ${data.message}`} />
      )}
      {serverAction && (
        <MessageBox type="error" content={`Server Error: ${serverAction}`} />
      )}
      {validationError && (
        <MessageBox
          type="error"
          content={Object.keys(validationError).map((key) => (
            <p key={key}>{`${key}: ${
              validationError[key as keyof typeof validationError]
            }`}</p>
          ))}
        />
      )}
    </div>
  );
}
