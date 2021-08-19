import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: -6px;
    overflow: hidden;
`;

type QrCodeProps = {
    address?: string;
};

export const QrCode = (props: QrCodeProps) => {
    const { address } = props;

    const img = `https://chart.googleapis.com/chart?chs=160x160&cht=qr&chl=${address}&chld=L|0`;

    return (
        <Wrapper>
            <img alt={address} src={img} />
        </Wrapper>
    );
};

QrCode.propTypes = {
    address: PropTypes.string.isRequired
};
