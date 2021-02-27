import { Request, Response, NextFunction } from 'express';

const MAX_PAGE_SIZE = 50;

const pagination = (defaultPageSize = 10) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const { page, pageSize } = req.query;

    const castedPage = Math.floor(Number(page));
    const _page = isNaN(castedPage) ? 1 : Math.max(1, castedPage);

    let _pageSize = defaultPageSize;
    const castedPageSize = Math.floor(Number(pageSize));

    if (!isNaN(castedPageSize)) {
      if (castedPageSize < 1) {
        _pageSize = defaultPageSize;
      } else if (castedPageSize > MAX_PAGE_SIZE) {
        _pageSize = MAX_PAGE_SIZE;
      } else {
        _pageSize = castedPageSize;
      }
    }

    req.pagination = {
      page: _page,
      pageSize: _pageSize,
    };
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default pagination;
