import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/Prismic/client';
import linkResolver from '../../lib/Prismic/linkResolver';

type Data =
    | {
          ref: string | string[];
      }
    | {
          message: string;
      };

const preview = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token: ref } = req.query;
    const api = await client();

    await api.enableAutoPreviewsFromReq(req);

    const redirectUrl = await api.resolvePreviewURL({
        defaultURL: '/',
        linkResolver
    });

    if (!redirectUrl) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    res.setPreviewData({ ref });

    res.write(
        `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${redirectUrl}" />
        <script>window.location.href = '${redirectUrl}'</script>
        </head>`
    );

    res.end();
};

export default preview;
