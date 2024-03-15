import {
  FlatList,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {Colors, phoneWidth, PixelPerfect} from '../../styles/stylesConstants';
import SearchInput from '../../components/inputs/SearchInput';
import {SharedStyles} from '../../styles/sharedStyles';
import {MapMarkerIcon} from '../../assets/svg/icons';
import MainTabs from '../../navigation/MainTabs';
import SafeView from '../../components/views/SafeView';
import {useAppSelector} from '../../store/hook';

interface Props {
  textInputOptions?: TextInputProps & {ref?: (ref: any) => void};
  onCancelPress: () => void;
  inputRef: any;
  onSearchPress: () => void;
  onSelectSuggest: (item: any) => void;
}

const SearchModalContent: FC<Props> = ({
  onCancelPress,
  inputRef,
  onSelectSuggest,
}) => {
  const {cities} = useAppSelector(s => s.homeSlice);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(cities);

  useEffect(() => {
    // Filter the data whenever the query changes
    const filtered = cities.filter(item => item?.text?.toLowerCase().includes(query.toLowerCase()));
    setFilteredData(filtered);
  }, [query, cities]);

   function handleChange(text:string) {
    setQuery(text);
  }

  return (
    <>
      <SafeView style={{...SharedStyles.paddingHorizontal, flex: 1}}>
        {/* <StatusBar /> */}
        <SearchInput
          onCancelPress={onCancelPress}
          inputRef={inputRef}
          options={{
            value: query,
            onChangeText: handleChange,
          }}
          hasCancel={true}
        />

      
        <FlatList
          data={filteredData}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{marginTop: PixelPerfect(30)}}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.suggestCont}
              onPress={() => {
                onSelectSuggest(item);
              }}>
              <MapMarkerIcon fill={Colors.blackText} />
              <Text style={styles.textSuggestForYou}>{item?.text}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeView>

      <View style={[styles.shadowView]}>
        <MainTabs active={'SearchScreen'} style={{width: '100%'}} />
      </View>
    </>
  );
};

export default SearchModalContent;

const styles = StyleSheet.create({
  shadowView: {
    width: phoneWidth,

    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: PixelPerfect(30),
    borderTopLeftRadius: PixelPerfect(30),
    backgroundColor: 'transparent',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  textsCont: {
    marginTop: PixelPerfect(20),
    marginBottom: PixelPerfect(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNearToYou: {
    ...SharedStyles.textBold14,
    color: Colors.mainColor,
    marginHorizontal: 5,
  },
  suggestCont: {
    marginBottom: PixelPerfect(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSuggestForYou: {
    ...SharedStyles.textBold14,
    marginHorizontal: 5,
  },
  textWeSuggest: {
    ...SharedStyles.textBold14,
    color: '#8F8F8F',
    marginBottom: 13,
    marginHorizontal: PixelPerfect(5),
    textAlign: 'left',
    marginVertical: PixelPerfect(10),
  },
});
