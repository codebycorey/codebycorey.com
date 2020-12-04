const Fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res: Response = await fetch(input, init);
  return await res.json();
};

export default Fetcher;
