/**
 *
 * OpenWalletPage
 *
 */
import { TransitionRoute } from 'app/components/TransitionRoute'
import { Anchor, Box, Button, Heading, Text } from 'grommet'
import * as React from 'react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Switch } from 'react-router'
import { NavLink } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import { FromLedger } from './Features/FromLedger'

import { FromMnemonic } from './Features/FromMnemonic'
import { FromPrivateKey } from './Features/FromPrivateKey'

export function SelectOpenMethod() {
  const { t } = useTranslation()
  const [ledgerModal, showLedgerModal] = useState(false)

  return (
    <Box
      round="5px"
      border={{ color: 'background-front-border', size: '1px' }}
      background="background-front"
      margin="small"
      pad="medium"
    >
      <Heading level="3">{t('openWallet.header', 'How do you want to open your wallet?')}</Heading>

      <Box direction="row-responsive" justify="start" margin={{ top: 'medium' }} gap="medium">
        <NavLink to="/open-wallet/mnemonic">
          <Button
            type="submit"
            label={t('openWallet.method.mnemonic', 'Mnemonic')}
            style={{ borderRadius: '4px' }}
            primary
          />
        </NavLink>
        <NavLink to="/open-wallet/private-key">
          <Button
            type="submit"
            label={t('openWallet.method.privateKey', 'Private key')}
            style={{ borderRadius: '4px' }}
            primary
          />
        </NavLink>
        <Text>
          <Button
            type="submit"
            label={t('openWallet.method.ledger', 'Ledger')}
            style={{ borderRadius: '4px' }}
            onClick={() => {
              showLedgerModal(true)
            }}
            primary
          />
        </Text>

        {ledgerModal && (
          <FromLedger
            abort={() => {
              showLedgerModal(false)
            }}
          />
        )}
      </Box>

      <Box
        direction="row-responsive"
        justify="start"
        margin={{ top: 'medium' }}
        gap="medium"
        style={{ whiteSpace: 'pre-wrap', display: 'inline' }}
      >
        <Trans
          i18nKey="openWallet.bitpie.warning"
          t={t}
          defaults="❗ BitPie wallet users: You cannot import the mnemonic phrase directly from your BitPie wallet. <0>Check documentation for details.</0>"
          components={[<Anchor href="https://docs.oasis.dev/general/manage-tokens/faq" />]}
        />
      </Box>
    </Box>
  )
}

interface Props {}
export function OpenWalletPage(props: Props) {
  return (
    <TransitionGroup>
      <Switch>
        <TransitionRoute exact path="/open-wallet" component={SelectOpenMethod} />
        <TransitionRoute exact path="/open-wallet/mnemonic" component={FromMnemonic} />
        <TransitionRoute exact path="/open-wallet/private-key" component={FromPrivateKey} />
        <TransitionRoute exact path="/open-wallet/ledger" component={FromLedger} />
      </Switch>
    </TransitionGroup>
  )
}
