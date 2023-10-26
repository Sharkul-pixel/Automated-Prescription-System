import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  console.log(params);
  const response = await fetch(
    "http://localhost:3000/messages?include=patient",
  );
  const json = await response.json();
  return { messages: json };
}

export default function Messages() {
  const { messages } = useLoaderData();
  return (
    <div>
      {messages.map((message) => {
        return (
          <div key={message.id}>
            <div>{message.body}</div>
          </div>
        );
      })}
    </div>
  );
}
