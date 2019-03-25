import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  Container,
  CardItem,
  Body,
  Content,
  List,
} from 'native-base';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class ChargeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    function ShowDetails(props) {
      const detailsShown = props.details;
      if (!detailsShown) {
        return (
          <Content>
            <CardItem>
              <Body>
                <Text style={{ fontWeight: 'bold' }}>collected ({props.charge.members.collected.length})</Text>
                <List
                  dataArray={props.charge.members.collected}
                  renderRow={data => (
                    <Text>{data.user_name}: ${data.amount}</Text>
                  )}
                />
                <Text style={{ fontWeight: 'bold' }}>uncollected ({props.charge.members.uncollected.length})</Text>
                <List
                  dataArray={props.charge.members.uncollected}
                  renderRow={data => (
                    <Text>{data.user_name}: ${data.amount}</Text>
                  )}
                />
              </Body>
            </CardItem>
          </Content>
        );
      }
      return (<Text />);
    }

    return (
      <Container>
        <Content>
          <ShowDetails charge={data} details={deets} />
          <ShowDetails details={this.state.detailsShown} />
        </Content>
      </Container>
    );
  }
}
