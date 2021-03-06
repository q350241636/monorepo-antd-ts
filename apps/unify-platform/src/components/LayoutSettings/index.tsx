import React, { memo, useState, useCallback } from 'react'
import { CheckOutlined, CloseOutlined, SettingOutlined } from '@ant-design/icons'
import { Drawer, Tooltip, Divider, List, Select, Switch } from 'antd'
import './index.less'
import { connect } from 'react-redux'
import { IStoreState } from '../../store/types'
import { Settings, updateLayoutSettings } from '../../store/module/settings'

interface SettingsBodyProps {
  children: React.ReactNode
  title: string
}

function SettingsBody({ title, children }: SettingsBodyProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 className="layout__settings__title">{title}</h3>
      {children}
    </div>
  )
}

interface SettingsCheckBoxProps {
  value: string
  onChange: (key: string) => void
  list: {
    title: string
    key: string
    url: string
  }[]
}

function SettingsCheckBox({ list, onChange, value }: SettingsCheckBoxProps) {
  return (
    <div className="layout__settings__checkbox" key={value}>
      {list.map(item => (
        <Tooltip title={item.title} key={item.key}>
          <div className="layout__settings__checkbox-item" onClick={() => onChange(item.key)}>
            <img src={item.url} alt={item.key} />
            <div
              className="layout__settings__checkbox--check"
              style={{
                display: value === item.key ? 'block' : 'none',
              }}
            >
              <CheckOutlined />
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  )
}

interface LayoutSettingsTypes {
  settings: Settings
  updateLayoutSettings: (settings: Settings) => void
}

function LayoutSettings(props: LayoutSettingsTypes) {
  const [visible, setVisible] = useState(false)

  const onVisibleClick = () => {
    setVisible(!visible)
  }

  const onChange = useCallback(
    (key: string, value: string | boolean) => {
      props.updateLayoutSettings({
        ...props.settings,
        [`${key}`]: value,
      })
    },
    [props.settings],
  )

  return (
    <Drawer
      placement="right"
      closable
      visible={visible}
      width={300}
      onClose={onVisibleClick}
      handler={
        <div
          className="layout__settings"
          style={{
            color: '#fff',
            fontSize: 20,
          }}
          onClick={onVisibleClick}
        >
          {visible ? <CloseOutlined /> : <SettingOutlined />}
        </div>
      }
    >
      <SettingsBody title="??????????????????">
        <SettingsCheckBox
          value={props.settings.theme}
          onChange={value => onChange('theme', value)}
          list={[
            {
              title: '??????????????????',
              key: 'dark',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
            },
            {
              title: '??????????????????',
              key: 'light',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg',
            },
          ]}
        />
      </SettingsBody>

      <Divider />

      <SettingsBody title="????????????">
        <SettingsCheckBox
          value={props.settings.layout}
          onChange={value => onChange('layout', value)}
          list={[
            {
              title: '??????????????????',
              key: 'side',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
            },
            {
              title: '??????????????????',
              key: 'top',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg',
            },
            {
              title: '??????????????????',
              key: 'mix',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg',
            },
          ]}
        />
      </SettingsBody>

      <List
        split={false}
        dataSource={[
          {
            title: '??????????????????',
            action: (
              <Select
                size="small"
                defaultValue={props.settings.contentWidth}
                onChange={(value: string) => onChange('contentWidth', value)}
              >
                {props.settings.layout === 'top' && <Select.Option value="fixed">??????</Select.Option>}
                <Select.Option value="fluid">??????</Select.Option>
              </Select>
            ),
          },
          {
            title: '??????Header',
            action: (
              <Switch
                size="small"
                defaultChecked={props.settings.fixedHeader}
                onChange={value => onChange('fixedHeader', value)}
              />
            ),
          },
        ]}
        renderItem={item => (
          <List.Item style={{ justifyContent: 'space-between' }} actions={[item.action]}>
            <span>{item.title}</span>
          </List.Item>
        )}
        style={{ fontSize: '14px' }}
      />

      <Divider />

      <SettingsBody title="????????????">
        <List
          split={false}
          renderItem={item => (
            <List.Item style={{ justifyContent: 'space-between' }} actions={[item.action]}>
              <span>{item.title}</span>
            </List.Item>
          )}
          dataSource={[
            {
              title: '????????????',
              action: (
                <Switch
                  size="small"
                  checked={props.settings.colorWeak}
                  onChange={value => onChange('colorWeak', value)}
                />
              ),
            },
          ]}
          style={{ fontSize: '14px' }}
        />
      </SettingsBody>
    </Drawer>
  )
}

export default connect(
  ({ settings }: IStoreState) => ({
    settings,
  }),
  {
    updateLayoutSettings,
  },
)(memo(LayoutSettings))
