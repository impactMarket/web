import { container } from '../theme/variables/container';
import { useEffect, useState } from 'react';

const sizes = {
    lg: container.md * 16,
    md: container.md * 16,
    sm: container.sm * 16
};

export const useDeviceSize = () => {
    const [device, setDevice] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            if (device?.name !== 'xs' && window.innerWidth < sizes.sm) {
                return setDevice({ name: 'xs', width: window.innerWidth });
            }

            if (device?.name !== 'sm' && window.innerWidth > sizes.sm - 1 && window.innerWidth < sizes.md) {
                return setDevice({ name: 'sm', width: window.innerWidth });
            }

            if (device?.name !== 'md' && window.innerWidth > sizes.md - 1 && window.innerWidth < sizes.lg) {
                return setDevice({ name: 'md', width: window.innerWidth });
            }

            if (device?.name !== 'lg' && window.innerWidth > sizes.lg - 1) {
                return setDevice({ name: 'lg', width: window.innerWidth });
            }

            return;
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [device]);

    return { sizes, ...device };
};
