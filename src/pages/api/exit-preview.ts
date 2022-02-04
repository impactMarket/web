import { NextApiRequest, NextApiResponse } from 'next';
import url from 'url';

const exitHandler = (req: NextApiRequest, res: NextApiResponse) => {
    res.clearPreviewData();

    const queryObject = url.parse(req.url, true).query;
    const redirectUrl = queryObject && queryObject.currentUrl ? queryObject.currentUrl : '/';

    res.writeHead(307, { Location: redirectUrl });
    res.end();
};

export default exitHandler;
