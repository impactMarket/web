import { mq as baseMq } from 'styled-gen';
import { theme } from '../../theme';

export const mq = Object.keys(theme).reduce(
    // @ts-ignore
    (result, bp) => ({ ...result, [bp]: (style: any) => baseMq.bp(bp, style) }),
    {}
) as { [bp in keyof typeof theme]: Function };
