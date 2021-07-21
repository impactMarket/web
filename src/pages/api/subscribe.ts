import axios from 'axios';
import config from '../../../config';
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line no-process-env
const secret = process.env.NEXT_RECAPTCHA_SECRET;

type HubspotType = {
    context: {
        pageName: string;
        pageUri: string;
    };
    fields: {
        name: string;
        valiue: string;
    }[];
    submittedAt: string;
};

const hubspotPost = async (data: HubspotType) => {
    const result = await axios.post(
        `https://api.hsforms.com/submissions/v3/integration/submit/${config.hubspotId}/${config.hubspotContactFormId}`,
        data
    );

    return result;
};

type Data = {
    success: boolean;
};

const subscribeHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { data, recaptchaToken } = req.body;

        const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`;

        const recaptchaResponse = await axios.post(captchaUrl);
        const { score, success } = recaptchaResponse?.data || {};

        if (!success && score < 0.5) {
            throw new Error('Probably not human');
        }

        const hubspotResponse = await hubspotPost(data);

        const fullSuccess = hubspotResponse.status === 200;

        res.status(200).json({ success: fullSuccess });
    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
};

export default subscribeHandler;
