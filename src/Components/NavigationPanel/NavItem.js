import React from "react";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";

export default class NavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        backgroundColor: "transparent",
        borderRadius: 50
      }
    };

    this.isSelected = false;
  }
  selectItem() {}
  componentDidMount() {
    if (this.isSelected) {
      this.setState({
        styles: {
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          borderRadius: 5
        }
      });
    }
  }
  render() {
    this.isSelected = this.props.selected;

    return (
      <TouchableOpacity
        style={this.state.styles}
        onPress={() => {
          this.props.navigate(this.props.target);
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image source={this.props.src} />
          <Text>{this.props.target}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
