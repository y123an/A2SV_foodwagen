export async function fetchApi(
  url: string,
  options: RequestInit,
  isClient = false,
  returnResponse = true,
  rawResponse = false
) {
  const endpoint = isClient ? `${process.env.NEXT_PUBLIC_URL}/${url}` : url;

  const response = await fetch(endpoint, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
