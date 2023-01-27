import config from '../config';

type Image = {
    filePath: string;
    width?: number;
    height?: number;
    fit?: string;
};

interface ImageReq {
    bucket: string;
    key: string;
    outputFormat: string;
    edits?: {
        resize: {
            fit: string;
            height: number;
            width: number;
        };
    };
}

export const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

export const getImage = (image: Image) => {
    if (image?.filePath) {
        let obj = {
            bucket: config.imagesBucket,
            key: image.filePath,
            outputFormat: 'jpg'
        } as ImageReq;

        if (image.width || image.height) {
            obj = {
                ...obj,
                edits: {
                    resize: {
                        fit: image.fit || 'cover',
                        height: image.height || 400,
                        width: image.width || 400
                    }
                }
            };
        }

        const path = Buffer.from(JSON.stringify(obj)).toString('base64');

        return `${config.imagesUrl}${path}`;
    }

    return null;
};
