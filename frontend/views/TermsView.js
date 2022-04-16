import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export function TermsView({navigation}) {

  const terms = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis scelerisque venenatis. Praesent a feugiat erat, id gravida massa. Cras varius finibus ipsum, eget sodales mi laoreet at. Sed egestas, risus non ullamcorper feugiat, risus quam condimentum sem, non ullamcorper elit tortor ac sapien. Praesent sit amet sapien viverra, auctor magna ut, pulvinar tellus. Praesent velit lectus, egestas eu urna vel, suscipit luctus est. Morbi fringilla elementum scelerisque. Donec lacinia lorem ac viverra dictum.Nulla congue, elit ac maximus congue, dui lorem vehicula quam, et rutrum felis tellus id velit. Donec malesuada sit amet neque vel interdum. Morbi semper ullamcorper dui, quis ullamcorper arcu bibendum ac. Nunc et purus leo.\n\nAliquam venenatis orci sit amet condimentum venenatis. Morbi vehicula dignissim volutpat. Donec sed lectus ultricies tortor finibus vestibulum. In bibendum magna justo, et finibus sem ultricies vitae. Pellentesque condimentum consectetur tincidunt. Duis vel purus ante. Nulla mollis id diam et pellentesque. Praesent molestie gravida consectetur. Vivamus scelerisque auctor cursus. Etiam in molestie nisl. Sed id velit diam. Suspendisse scelerisque fringilla ex, vel aliquet justo scelerisque sit amet. Cras sodales lacinia mollis. Donec pellentesque et justo nec egestas. Nunc arcu odio, ullamcorper eu mattis eget, tempor id nibh. Nunc auctor rutrum massa. Aliquam volutpat suscipit purus non laoreet.\n\nNulla sodales nisl velit, eu convallis urna tempus ac. Nulla sodales molestie libero, id molestie libero. Aliquam erat volutpat. Donec sagittis quis dolor ac maximus. Nam bibendum, est nec iaculis vulputate, lectus elit blandit metus, ut porta erat augue at odio. Quisque ut ante sed elit malesuada sagittis sed eu turpis. Nullam a erat semper, iaculis nisl non, consectetur eros. Cras condimentum id justo elementum congue. Nam quis nulla eros. Praesent facilisis sem ac rhoncus lacinia. Ut vel enim vel purus tincidunt consequat ut a quam. Aliquam fringilla lacinia euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam placerat, metus id consequat rhoncus, erat metus maximus nibh, et porta lorem nisi in nulla. Cras quis enim magna. Pellentesque elementum lorem vel gravida ullamcorper."

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.terms}>
          <Text style={{color: 'black'}}>{terms}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  terms: {
    flex: 1,
    padding: 15,
  }
});
