const getSearchParams = (searchParams: URLSearchParams, params: string[]) => {
  return params.reduce((prev, param) => ({
    ...prev,
    [param]: searchParams.get(param),
  }), {} as Record<string, string | null>);
};

export default getSearchParams;