import { GeneratedPropsTypes, IconType } from '../../Types';
import { generateProps } from 'styled-gen';
import React from 'react';
import icons from './ui';
import styled from 'styled-components';

const renderPaths = (icon: { paths: any }) =>
    icon.paths.map((path: any, index: number) => (
        <path {...path} fill="currentColor" key={`path-${index}`} style={undefined} />
    ));

type IconProps = {
    icon: IconType;
};

const IconSvg = styled.svg<GeneratedPropsTypes>`
    display: inline-block;
    fill: currentColor;
    flex-shrink: 0;
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
        <IconSvg role="img" style={undefined} viewBox={selectedIcon.viewbox} {...otherProps}>
            {renderPaths(selectedIcon)}
        </IconSvg>
    );
};
