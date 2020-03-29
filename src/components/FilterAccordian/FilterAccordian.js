import React, { Component } from 'react';
import './FilterAccordian.css';
import { Accordion, Form, Menu } from 'semantic-ui-react'


const CatagoryForm = (
    <Form>
      <Form.Group grouped>
        <Form.Checkbox label='Catagory 1' name='catagory' value='Catagory 1' />
        <Form.Checkbox label='Catagory 2' name='catagory' value='Catagory 2' />
        <Form.Checkbox label='Catagory 3' name='catagory' value='Catagory 3' />
        <Form.Checkbox label='Catagory 4' name='catagory' value='Catagory 4' />
      </Form.Group>
    </Form>
)

const TypeForm = (
  <Form>
    <Form.Group grouped>
      <Form.Checkbox label='Type 1' name='type' value='Type 1' />
      <Form.Checkbox label='Type 2' name='type' value='Type 2' />
      <Form.Checkbox label='Type 3' name='type' value='Type 3' />
      <Form.Checkbox label='Type 4' name='type' value='Type 4' />
    </Form.Group>
  </Form>
)

class FilterAccordian extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
  
      this.setState({ activeIndex: newIndex })
    }
  
    render() {
      const { activeIndex } = this.state
  
      return (
        <Accordion as={Menu} vertical>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 0}
              content='Catagories'
              index={0}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 0} content={CatagoryForm} />
          </Menu.Item>
  
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 1}
              content='Types'
              index={1}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 1} content={TypeForm} />
          </Menu.Item>
        </Accordion>
      )
    }
};


export default FilterAccordian;