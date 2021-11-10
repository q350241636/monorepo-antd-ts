import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import AdminConfig from '../../config'
import './index.less'
import { Settings } from '../../store/module/settings'

interface LogoProps {
  opened: boolean
  layout: Settings['layout']
}

function Logo({ opened, layout }: LogoProps) {
  return (
    <div
      className={classnames('layout__side-bar-logo-wrap', {
        'layout__side-bar-logo-wrap--close': !opened,
      })}
    >
      <Link to="/" className="layout__side-bar-link">
        {AdminConfig.logo && <img src={AdminConfig.logo} className="layout__side-bar-logo" alt="logo" />}
        {(!opened || layout === 'top' || layout === 'mix') && (
          <h1 className="layout__side-bar-title">{AdminConfig.title}</h1>
        )}
      </Link>
    </div>
  )
}

export default memo(Logo)
