import { BigNumber } from '@ethersproject/bignumber'
import { BaseProvider } from '@ethersproject/providers'
import { parseEther } from '@ethersproject/units'
import { chainIDToExplorer, shortenAddress, toSignificant, guessTitle } from '@rainbowkit/utils'
import React, { useEffect, useState, useMemo } from 'react'
import styles from '../../styles/Tx.module.css'
import { FAIL_ICON, PENDING_ICON, SUCCESS_ICON } from '../constants/images'

export interface TxProps {
  status?: 'pending' | 'success' | 'fail'
  title?: string
  hash?: string
  data?: string
  from?: string
  to?: string
  value?: BigNumber
  chainId?: number
  explorerUrl?: string
  provider?: BaseProvider
  classNames?: Partial<{
    container: string
    icon: string
  }>
}

export const Tx = ({
  status,
  title: initialTitle,
  classNames,
  chainId = 1,
  data,
  value,
  from,
  to,
  ...props
}: TxProps) => {
  const iconUrl = useMemo(() => {
    switch (status) {
      case 'pending':
        return PENDING_ICON
      case 'success':
        return SUCCESS_ICON
      case 'fail':
        return FAIL_ICON
    }
  }, [status])

  const [title, setTitle] = useState(initialTitle || '')
  const [link, setLink] = useState('')

  useEffect(() => {
    if (props.hash) {
      if (props.explorerUrl) setLink(`${props.explorerUrl}/tx/${props.hash}`)
      else if (chainId) {
        setLink(`${chainIDToExplorer(chainId)}/tx/${props.hash}`)
      }

      if (!initialTitle) {
        setTitle(guessTitle({ data, from, to, chainId, value }))
      }
    }
  }, [props.hash, props.explorerUrl, chainId])

  return (
    <div className={`${styles.container} ${classNames?.container}`}>
      <a href={link} title={title}>
        {title}
      </a>{' '}
      <img
        className={`${styles.icon} ${classNames?.icon}`}
        src={iconUrl}
        aria-label={status}
        alt={status}
        title={status}
      />
    </div>
  )
}
