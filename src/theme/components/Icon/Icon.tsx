import { GeneratedPropsTypes } from '../../Types';
import { generateProps } from 'styled-gen';
import React from 'react';
import icons from './ui';
import styled from 'styled-components';

const renderPaths = (icon: { paths: string[] }) =>
    icon.paths.map((path, index) => <path d={path} fill="currentColor" key={`path-${index}`} />);

type IconProps = {
    icon: keyof typeof icons;
};

const IconSvg = styled.svg<GeneratedPropsTypes>`
    fill: currentColor;
    height: ${({ sHeight }) => (!sHeight ? 'auto' : undefined)};
    vertical-align: middle;
    width: ${({ sWidth }) => (!sWidth ? 'auto' : undefined)};

    ${generateProps};
`;

export const Icon = (props: IconProps & GeneratedPropsTypes): any => {
    const { icon, ...otherProps } = props;
    const selectedIcon = icons[icon];

    if (!selectedIcon) {
        console.log(`Icon not found: ${icon}`);

        return null;
    }

    if (!selectedIcon.viewbox) {
        return console.log(`Viewbox issue with the icon: ${icon}`);
    }

    return (
        <IconSvg role="img" viewBox={selectedIcon.viewbox} {...otherProps}>
            {renderPaths(selectedIcon)}
        </IconSvg>
    );
};
