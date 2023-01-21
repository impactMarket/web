import { Card, CardContent, Text, TextLink } from '../../../theme/components';
import { Deposit } from './Deposit';
import { String } from '../../../components/String/String';
import { Summary } from './Summary';
import { Thanks } from './Thanks';
import { Withdraw } from './Withdraw';
import { WrongNetwork } from '../../../components/WrongNetwork/WrongNetwork';
import { useCUSDBalance } from '@impact-market/utils';
import { useDepositRedirect } from '@impact-market/utils/useDepositRedirect';
import { useWallet } from '../../../hooks/useWallet';
import React, { useEffect, useState } from 'react';
import config from '../../../../config';

const token = config.depositToken;

export const DepositWrapper = ({ translations }: any) => {
    const { depositWalletNotConnected } = translations;

    const cUsdBalance = useCUSDBalance();
    const { address, connect, wrongNetwork } = useWallet();
    const { userDeposits } = useDepositRedirect();
    const [openDeposit, setOpenDeposit] = useState(false);
    const [openWithdraw, setOpenWithdraw] = useState(false);
    const [openThanksComponent, setOpenThanksComponent] = useState(false);

    const [funds, setFunds] = useState({
        availableInterest: '0' as string,
        cUsdBalance: 0 as number,
        deposited: 0 as number,
        totalInterest: '0' as string
    });

    useEffect(() => {
        setFunds({
            availableInterest: userDeposits[0]?.availableInterest,
            cUsdBalance,
            deposited: parseFloat(userDeposits[0]?.deposited),
            totalInterest: userDeposits[0]?.interest
        });
    }, [userDeposits, cUsdBalance, address]);

    return (
        <Card>
            <CardContent>
                {!address && (
                    <Text brandSecondary center small>
                        <TextLink brandPrimary onClick={connect} regular>
                            <String id="connectToYourWallet" />
                        </TextLink>
                        &nbsp;
                        {depositWalletNotConnected}
                    </Text>
                )}
                {!!address && wrongNetwork && <WrongNetwork />}
                {!!address && !wrongNetwork && (
                    <>
                        <Summary
                            funds={funds}
                            openDeposit={openDeposit}
                            openThanksComponent={openThanksComponent}
                            openWithdraw={openWithdraw}
                            setFunds={setFunds}
                            setOpenDeposit={setOpenDeposit}
                            setOpenThanksComponent={setOpenThanksComponent}
                            setOpenWithdraw={setOpenWithdraw}
                            token={token}
                            translations={translations}
                        />

                        {openDeposit && (
                            <Deposit
                                funds={funds}
                                setFunds={setFunds}
                                setOpenDeposit={setOpenDeposit}
                                token={token}
                                translations={translations}
                            />
                        )}

                        {openWithdraw && (
                            <Withdraw
                                funds={funds}
                                setFunds={setFunds}
                                setOpenWithdraw={setOpenWithdraw}
                                token={token}
                                translations={translations}
                            />
                        )}

                        {openThanksComponent && (
                            <Thanks
                                funds={funds}
                                setFunds={setFunds}
                                setOpenThanksComponent={setOpenThanksComponent}
                                translations={translations}
                            />
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};
