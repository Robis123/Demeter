import React from 'react';
import { View, Button } from 'react-native';
import Pdf from 'react-native-pdf';

const PDFScreen = () => {
  const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/demeter-2a73f.appspot.com/o/94.946.4949949-44%2F757416.pdf?alt=media&token=2c3e2f8d-5b71-42fd-9757-058e63e00578';

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        source={{ uri: pdfUrl, cache: true }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Número de páginas: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Página atual: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
      />
      <Button
        title="Download PDF"
        onPress={() => {
          // Implemente a lógica para baixar o PDF aqui
          // Você pode usar bibliotecas como react-native-fs ou react-native-fetch-blob para baixar o arquivo.
        }}
      />
    </View>
  );
};

export default PDFScreen;