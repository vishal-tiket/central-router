import { getCommonHeaders } from "@tiket/react-common-utilities";
import { cookies as CookieStore } from "next/headers";

async function Page() {
  const cookies = CookieStore();
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    headers: getCommonHeaders({ ctx: { req: { cookies }, res: { cookies } } }),
  });
  const jsonData = await response.json();

  return (
    <div>
      {jsonData ? (
        <>
          <div>
            <h1>Server Side Api Call</h1>
            <h2>API Response</h2>
            <span>{JSON.stringify(jsonData)}</span>
          </div>
          <div>
            <h2>Headers Sent</h2>
            <span>
              <pre>
                {JSON.stringify(
                  getCommonHeaders({
                    ctx: { req: { cookies }, res: { cookies } },
                  }),
                  undefined,
                  2
                )}
              </pre>
            </span>
            <h2>Cookies available</h2>
            <span>
              <pre>{JSON.stringify(cookies.getAll(), undefined, 2)}</pre>
            </span>
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Page;
