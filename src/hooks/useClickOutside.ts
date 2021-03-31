import React from 'react';

export const useClickOutside = (element: any, callback: Function) => {
    const handleClick = (event: any) => {
        if (element && !element.contains(event.target)) {
            callback();
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
};
