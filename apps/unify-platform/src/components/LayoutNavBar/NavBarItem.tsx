import { BellOutlined, GithubOutlined } from '@ant-design/icons'
import React, { MouseEventHandler, memo } from 'react'

import { Badge } from 'antd'

interface NavBarItemProps {
  onClick: MouseEventHandler<HTMLDivElement>
  className?: string
  icon: string
  count: number
  overflowCount?: number
}

function SwtichIcon({ icon }: { icon: string }) {
  if (icon === 'github') {
    return <GithubOutlined />
  }

  if (icon === 'bell') {
    return <BellOutlined />
  }

  return null
}

function NavBarItem({ className, onClick, icon, ...badge }: NavBarItemProps) {
  return (
    <div className={className} onClick={onClick}>
      <Badge {...badge} style={{ boxShadow: 'none' }}>
        <div style={{ padding: '5px', fontSize: '16px' }}>
          <SwtichIcon icon={icon} />
        </div>
      </Badge>
    </div>
  )
}

export default memo(NavBarItem)
