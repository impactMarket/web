import { GeneratedPropsTypes } from '../../theme/Types';
import { colors, fonts } from '../../theme';
import { ease, generateProps, transitions } from 'styled-gen';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const animationDuration = 500;

const TabButton = styled.button<{ isActive?: boolean }>`
    align-items: center;
    background-color: transparent;
    border: 0;
    display: flex;
    font-family: ${fonts.families.inter};
    height: 100%;
    justify-content: center;
    line-height: 1.5em;
    margin-bottom: 0.5rem;
    outline: 0;
    padding: 0.4rem 0;
    position: relative;
    width: 100%;
    font-size: 1rem;

    ${({ isActive }) =>
        isActive &&
        css`
            cursor: default !important;
            font-weight: ${fonts.weights.bold};
        `}

    ${({ isActive }) =>
        !isActive &&
        css`
            cursor: pointer;
        `}

    &:after {
        background-color: ${({ isActive }) => (isActive ? colors.brandPrimary : colors.backgroundSecondary)};
        content: '';
        height: 2px;
        position: absolute;
        width: 100%;
        bottom: -6px;
    }
`;

const TabButtons = styled.div`
    display: flex;
`;

const TabContent = styled.div<{ isActive?: boolean }>`
    ${transitions(['opacity', 'transform', 'visibility'], 500, ease.inOutCirc)};

    opacity: 0;
    padding-top: 2rem;
    position: absolute;
    transform: translateY(2rem);
    visibility: hidden;
    width: 100%;

    ${({ isActive }) =>
        isActive &&
        css`
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
        `}
`;

const TabContents = styled.div<{ elHeight?: number; isAnimating?: boolean }>`
    ${transitions('height', animationDuration, ease.inOutCirc)};

    height: ${({ elHeight }) => elHeight || 0}px;
    overflow: ${({ isAnimating }) => isAnimating && 'hidden'};
    position: relative;
`;

const TabsWrapper = styled.div`
    ${generateProps};
`;

type TabsProps = {
    children: any[];
    tabs: any[];
} & GeneratedPropsTypes;

export const Tabs = (props: TabsProps) => {
    const { children, tabs, ...forwardProps } = props;
    const [activeTab, setActiveTab] = useState(0);
    const [containerSize, setContainerSize] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const contentRefs = useRef<any>(children.map(() => React.createRef()));

    const handleTabClick = useCallback(index => {
        setActiveTab(index);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const currentEl = contentRefs?.current?.[activeTab];

            setIsAnimating(true);
            setContainerSize(currentEl?.current?.clientHeight);

            setTimeout(() => {
                setIsAnimating(false);
            }, animationDuration);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [activeTab]);

    useEffect(() => {
        const currentEl = contentRefs?.current?.[activeTab];

        setContainerSize(currentEl?.current?.clientHeight);
    }, [props]);

    return (
        <TabsWrapper {...forwardProps}>
            <TabButtons>
                {tabs.map((tab, index) => (
                    <TabButton isActive={activeTab === index} key={index} onClick={() => handleTabClick(index)}>
                        {tab}
                    </TabButton>
                ))}
            </TabButtons>
            <TabContents elHeight={containerSize} isAnimating={isAnimating}>
                {React.Children.map(children, (child, index) => (
                    <TabContent isActive={activeTab === index} key={index} ref={contentRefs?.current?.[index]}>
                        {child}
                    </TabContent>
                ))}
            </TabContents>
        </TabsWrapper>
    );
};
