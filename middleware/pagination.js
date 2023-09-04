const paginateResults = (limit) => {
  return (req, res, next) => {
    const currentPage = +req.query.page || 1;
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;

    req.pagination = {
      page: currentPage,
      startIndex,
      endIndex,
      limit,
    };
    next();
  };
};

export default paginateResults;
