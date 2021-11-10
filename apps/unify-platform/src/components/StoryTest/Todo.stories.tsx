import React, { ComponentProps } from 'react'
import Todo from './Todo'
import { Story, Meta } from '@storybook/react'

export default {
  title: 'Todo',
  component: Todo,
} as Meta

const Template: Story<ComponentProps<typeof Todo>> = args => <Todo {...args} />

export const Default = Template.bind({})
Default.args = {
  content: 'default content',
}
