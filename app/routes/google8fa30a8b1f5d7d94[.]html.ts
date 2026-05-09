export const loader = () => {
  return new Response("google-site-verification: google8fa30a8b1f5d7d94.html", {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
};
